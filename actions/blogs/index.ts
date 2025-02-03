'use server'

import type { Post } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(data: FormData) {
	const { title, body } = Object.fromEntries(data) as Omit<Post, 'id'>

	const post = await prisma.post.create({
		data: {
			title,
			body,
		},
	})

	redirect(`/dev/blog/with-an-prisma/${post.id}`)
}

export async function updatePost(data: FormData) {
	const { title, body, id } = Object.fromEntries(data) as Post

	const post = await prisma.post.update({
		where: {
			id,
		},
		data: {
			title,
			body,
		},
	})

	revalidatePath(`/dev/blog/with-an-prisma/${post.id}`)
	redirect(`/dev/blog/with-an-prisma/${post.id}`)
}

export async function removePost(id: string) {
	await prisma.post.delete({
		where: {
			id,
		},
	})

	revalidatePath('/dev/blog/with-an-prisma')
	redirect('/dev/blog/with-an-prisma')
}
