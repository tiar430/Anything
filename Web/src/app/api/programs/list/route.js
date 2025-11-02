import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const rewardStatus = searchParams.get("rewardStatus");
    const search = searchParams.get("search");

    let query = sql`
      SELECT 
        p.id, p.program_id, p.brand_id, b.name as brand_name, 
        p.program_type, p.description, p.start_date, p.end_date,
        p.target_value, p.achievement_value, p.reward_value, p.reward_type,
        p.estimated_reward, p.remaining_target, p.time_gone_percent,
        p.program_status, p.reward_status, p.created_at, p.updated_at
      FROM programs p
      JOIN brands b ON p.brand_id = b.id
      WHERE 1=1
    `;

    const conditions = [];
    const values = [];

    if (brandId) {
      conditions.push(`p.brand_id = $${conditions.length + 1}`);
      values.push(parseInt(brandId));
    }

    if (rewardStatus) {
      conditions.push(`p.reward_status = $${conditions.length + 1}`);
      values.push(rewardStatus);
    }

    if (search) {
      conditions.push(
        `(LOWER(p.description) LIKE LOWER($${conditions.length + 1}) OR LOWER(p.program_id) LIKE LOWER($${conditions.length + 1}))`,
      );
      values.push(`%${search}%`);
      values.push(`%${search}%`);
    }

    let finalQuery = `
      SELECT 
        p.id, p.program_id, p.brand_id, b.name as brand_name, 
        p.program_type, p.description, p.start_date, p.end_date,
        p.target_value, p.achievement_value, p.reward_value, p.reward_type,
        p.estimated_reward, p.remaining_target, p.time_gone_percent,
        p.program_status, p.reward_status, p.created_at, p.updated_at
      FROM programs p
      JOIN brands b ON p.brand_id = b.id
      WHERE 1=1
    `;

    if (conditions.length > 0) {
      finalQuery += " AND " + conditions.join(" AND ");
    }

    finalQuery += " ORDER BY p.created_at DESC";

    const programs = await sql(finalQuery, values);
    return Response.json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return Response.json(
      { error: "Failed to fetch programs" },
      { status: 500 },
    );
  }
}
