import { NextResponse } from "next/server";
import prisma from '../../libs/prisma';

export async function DELETE(request) {
  try {
    const { id } = await request.json(); // Assuming the ID is sent as JSON

    // Additional validation/sanitization of input values
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Delete the client with the specified ID using Prisma
    await prisma.client.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
