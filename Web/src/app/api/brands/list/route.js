import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const brands = await sql`
      SELECT id, name, total_reward, created_at, updated_at 
      FROM brands 
      ORDER BY name ASC
    `;
    return Response.json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    return Response.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}
