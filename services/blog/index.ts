// import type { Post } from '@prisma/client'
import { prisma } from '@/lib/prisma'

// with an prisma

export function getAllPostsWithPrisma() {
	return prisma.post.findMany()
}

// // with an fetch api

// export async function getAllPostsWithFetchAPI(): Promise<Post[]> {
// 	const data = await fetch(`${process.env.API_URL}/blog/posts`)
// 	const posts = await data.json()
// 	return posts
// }
