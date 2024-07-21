// import { NextResponse } from "next/server";
// import pool from "@/app/libs/mysql";

// export async function PUT(request) {
//   console.log("PUT request received");
//   try {
//     const { id, name, email } = await request.json();
//     console.log("Request data:", { id, name, email });

//     // Validate id
//     if (!id) {
//       console.error("Missing required field: id");
//       return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
//     }

//     // Construct dynamic query based on available fields
//     let query = "UPDATE customer SET ";
//     const params = [];

//     if (name) {
//       query += "name = ?, ";
//       params.push(name);
//     }

//     if (email) {
//       query += "email = ?, ";
//       params.push(email);
//     }

//     // Remove trailing comma and space
//     query = query.slice(0, -2);
//     query += " WHERE id = ?";
//     params.push(id);

//     const db = await pool.getConnection();
//     const [result] = await db.execute(query, params);
//     db.release();

//     if (result.affectedRows === 0) {
//       console.error("Customer not found");
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import prisma from '../../libs/prisma';
export async function PUT(request) {
  console.log("PUT request received");

  try {
    const { id, code, name, address, city, country, email } = await request.json();
    console.log("Request data:", {
      id,
      code,
      name,
      address,
      city,
      country,
      email,
    });

    // Validate id
    if (!id) {
      console.error("Missing required field: id");
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    // Construct dynamic update object based on available fields
    const updateData = {};
    if (code) updateData.code = code;
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (country) updateData.country = country;
    if (email) updateData.mail = email;

    // Check if there are any fields to update
    if (Object.keys(updateData).length === 0) {
      console.error("No fields to update");
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    // Execute the update query
    const updatedClient = await prisma.client.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json({ success: true, updatedClient });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
