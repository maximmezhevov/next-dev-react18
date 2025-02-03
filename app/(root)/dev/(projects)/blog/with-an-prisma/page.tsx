import type { Metadata } from 'next'

import Link from 'next/link'
import { Post } from '@prisma/client'
import { getAllPosts_WithAnPrisma } from '@/services/blog'
import { Button } from '@/components/shadcn/button'

export const metadata: Metadata = {
	title: 'blog',
}

// export const revalidate = 10

export default async function BlogWithAnPrisma() {
	const posts = await getAllPosts_WithAnPrisma()

	return (
		<main>
			<div className='sticky top-[6rem] flex h-[3rem] items-center'>
				<Button asChild size='size_32' className='w-full'>
					<Link href='/dev/blog/with-an-prisma/new'>Добавить новый пост</Link>
				</Button>
			</div>
			<ul className='space-y-1'>
				{posts.reverse().map((post: Post) => (
					<li key={post.id} className='rounded-md border p-2 *:break-normal'>
						<Link href={`/dev/blog/with-an-prisma/${post.id}`}>
							{post.title}
						</Link>
						<p>{post.body}</p>
					</li>
				))}
			</ul>
		</main>
	)
}
