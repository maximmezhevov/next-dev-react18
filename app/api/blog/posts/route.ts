'use server'

import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const getAllPosts = await prisma.post.findMany()
		if (!getAllPosts) {
			return NextResponse.json({ message: 'Посты не найдены' })
		}

		return NextResponse.json(getAllPosts)
	} catch (error) {
		console.log('Не удалось получить посты', error)
		return NextResponse.json({
			message: 'Не удалось получить посты',
		})
	}
}
