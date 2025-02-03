import { prisma } from '@/lib/prisma'

// with an prisma

export function getAllPosts_WithAnPrisma() {
	return prisma.post.findMany()
}

export function getPostById_WithAsPrisma(id: string) {
	return prisma.post.findUnique({
		where: {
			id,
		},
	})
}
