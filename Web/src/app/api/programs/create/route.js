import sql from "@/app/api/utils/sql";

function generateProgramId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PRG-${timestamp}${random}`;
}

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

export async function POST(request) {
  try {
    const {
      brandId,
      programType,
      description,
      startDate,
      endDate,
      targetValue,
      achievementValue,
      rewardValue,
      rewardType,
      programStatus,
      rewardStatus,
    } = await request.json();

    // Validate required fields
    if (
      !brandId ||
      !programType ||
      !startDate ||
      !endDate ||
      !targetValue ||
      !rewardValue
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const programId = generateProgramId();
    const timePeriodPercent = calculateTimePeriodPercent(startDate, endDate);

    // Calculate estimated reward
    let estimatedReward = 0;
    if (rewardType === "percentage") {
      estimatedReward = Math.round((achievementValue * rewardValue) / 100);
    } else {
      estimatedReward = achievementValue * rewardValue;
    }

    const remainingTarget = Math.max(0, targetValue - achievementValue);

    const result = await sql`
      INSERT INTO programs (
        program_id, brand_id, program_type, description, 
        start_date, end_date, target_value, achievement_value,
        reward_value, reward_type, estimated_reward, remaining_target,
        time_gone_percent, program_status, reward_status
      )
      VALUES (
        ${programId}, ${brandId}, ${programType}, ${description || null},
        ${startDate}, ${endDate}, ${targetValue}, ${achievementValue || 0},
        ${rewardValue}, ${rewardType}, ${estimatedReward}, ${remainingTarget},
        ${timePeriodPercent}, ${programStatus || "Active"}, ${rewardStatus || "Unpaid"}
      )
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error("Error creating program:", error);
    return Response.json(
      { error: "Failed to create program" },
      { status: 500 },
    );
  }
}
