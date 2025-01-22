// import { prisma } from '@/lib/prisma'
import { getAllPostsWithPrisma } from '@/services/blog'

import { PostsList } from '@/components/blog/posts-list'

export default async function BlogWithAnPrisma() {
	// const posts = await prisma.post.findMany()

	const posts = await getAllPostsWithPrisma()

	return (
		<main>
			<PostsList posts={posts} />
		</main>
	)
}
