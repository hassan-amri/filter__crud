import { NextResponse } from "next/server";
import prisma from '../../libs/prisma';

export async function POST(request) {
  try {
    const { r__name, r__email, r__type, r__message } = await request.json(); // Assuming the data is sent as JSON

    // Additional validation/sanitization of input values
    if (r__name &&  r__email && r__type && r__message) {
      await prisma.reports.create({
        data: {
          name : r__name,
          mail : r__email,
          type : r__type,
          message:r__message
        },
      });
    } else {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
