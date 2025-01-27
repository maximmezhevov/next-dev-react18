// import { prisma } from '@/lib/prisma'
import { getAllPostsWithPrisma } from '@/services/blog'

import { PostsList } from '@/components/blog/posts-list'

export default async function BlogWithAnPrisma() {
	// const posts = await prisma.post.findMany()

	const posts = await getAllPostsWithPrisma()

	return (
		<main className='mx-auto max-w-screen-md'>
			<PostsList posts={posts} />
		</main>
	)
}
