import { NextResponse } from "next/server";
import prisma from "../../libs/prisma";



export async function GET() {

    
  try {
    const clients = await prisma.client.findMany({
      where: {
        city: {
          contains: "ll",
        },
      },
    });

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
