import { NextResponse } from "next/server";
import prisma from "../../libs/prisma";

export async function GET() {
  try {
    // Fetch all rows from the 'Client' table using Prisma
    const clients = await prisma.client.findMany();

    // Return the fetched rows as a JSON response
    return NextResponse.json(clients);
  } catch (error) {
    // Return an error response in case of an exception
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
