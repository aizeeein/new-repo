import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json()
    const {
        nik,
        nama,
        cabang,
        email,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password,12)

    const user = await prisma.data_staff.create({
        data: {
            nik,
            nama,
            cabang,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}