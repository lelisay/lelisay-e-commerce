import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log(email);

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: user.role });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user role', error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
