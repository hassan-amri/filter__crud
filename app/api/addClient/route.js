import { NextResponse } from "next/server";
import prisma from '../../libs/prisma';

export async function POST(request) {
  try {
    const { code, name, address, city, country, email, toggle } = await request.json(); // Assuming the data is sent as JSON

    // Additional validation/sanitization of input values
    if (code && name && address && city && country && email) {
      await prisma.client.create({
        data: {
          code,
          name,
          address,
          city,
          country,
          mail: email,
          active:toggle, // Assuming you want to set 'active' to true by default
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
