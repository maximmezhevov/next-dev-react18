import { prisma } from '@/lib/prisma'

// with an prisma

export function getAllPostsWithPrisma() {
	return prisma.post.findMany()
}

// with an fetch next api

// export async function getAllPostsWithFetchNextAPI() {}
