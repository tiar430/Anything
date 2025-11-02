import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return Response.json(
        { error: "Brand name is required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO brands (name, total_reward) 
      VALUES (${name.toUpperCase()}, 0) 
      RETURNING id, name, total_reward, created_at, updated_at
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error("Error creating brand:", error);
    if (error.message.includes("unique constraint")) {
      return Response.json({ error: "Brand already exists" }, { status: 409 });
    }
    return Response.json({ error: "Failed to create brand" }, { status: 500 });
  }
}
