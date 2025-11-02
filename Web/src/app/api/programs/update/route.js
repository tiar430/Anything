import sql from "@/app/api/utils/sql";

function calculateTimePeriodPercent(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const totalDays = (end - start) / (1000 * 60 * 60 * 24);
  const elapsedDays = (now - start) / (1000 * 60 * 60 * 24);

  if (totalDays <= 0) return 0;
  const percent = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
  return Math.round(percent);
}

export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return Response.json(
        { error: "Program ID is required" },
        { status: 400 },
      );
    }

    // Get current program data
    const currentProgram = await sql`SELECT * FROM programs WHERE id = ${id}`;
    if (currentProgram.length === 0) {
      return Response.json({ error: "Program not found" }, { status: 404 });
    }

    const program = currentProgram[0];

    // Calculate new values if needed
    let estimatedReward = updates.estimated_reward ?? program.estimated_reward;
    let remainingTarget = updates.remaining_target ?? program.remaining_target;
    let timePeriodPercent =
      updates.time_gone_percent ?? program.time_gone_percent;

    const achievementValue =
      updates.achievement_value ?? program.achievement_value;
    const targetValue = updates.target_value ?? program.target_value;
    const rewardValue = updates.reward_value ?? program.reward_value;
    const rewardType = updates.reward_type ?? program.reward_type;
    const startDate = updates.start_date ?? program.start_date;
    const endDate = updates.end_date ?? program.end_date;

    // Recalculate values
    if (rewardType === "percentage") {
      estimatedReward = Math.round((achievementValue * rewardValue) / 100);
    } else {
      estimatedReward = achievementValue * rewardValue;
    }

    remainingTarget = Math.max(0, targetValue - achievementValue);
    timePeriodPercent = calculateTimePeriodPercent(startDate, endDate);

    // Build update query
    const setClause = [];
    const values = [];
    let paramCount = 1;

    const fields = [
      "program_type",
      "description",
      "start_date",
      "end_date",
      "target_value",
      "achievement_value",
      "reward_value",
      "reward_type",
      "program_status",
      "reward_status",
    ];

    fields.forEach((field) => {
      if (field in updates) {
        setClause.push(`${field} = $${paramCount}`);
        values.push(updates[field]);
        paramCount++;
      }
    });

    // Add calculated fields
    setClause.push(`estimated_reward = $${paramCount}`);
    values.push(estimatedReward);
    paramCount++;

    setClause.push(`remaining_target = $${paramCount}`);
    values.push(remainingTarget);
    paramCount++;

    setClause.push(`time_gone_percent = $${paramCount}`);
    values.push(timePeriodPercent);
    paramCount++;

    setClause.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);

    const query = `
      UPDATE programs 
      SET ${setClause.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await sql(query, values);
    return Response.json(result[0]);
  } catch (error) {
    console.error("Error updating program:", error);
    return Response.json(
      { error: "Failed to update program" },
      { status: 500 },
    );
  }
}
