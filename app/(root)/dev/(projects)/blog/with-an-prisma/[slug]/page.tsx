import type { Metadata } from 'next'

import Link from 'next/link'
import { removePost } from '@/actions/blogs'
import { getPostById_WithAsPrisma } from '@/services/blog'
import { Button } from '@/components/shadcn/button'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = (await params).slug
	const post = await getPostById_WithAsPrisma(id)
	return {
		title: `blog/with-an-prisma/${post?.title ?? ''}`,
	}
}

export default async function BlogWithAnPrismaLayoutPost({ params }: Props) {
	const id = (await params).slug
	const post = await getPostById_WithAsPrisma(id)

	if (!post) {
		return <h1>Post not found</h1>
	}

	return (
		<main>
			<div className='sticky top-[6rem] flex h-[3rem] items-center gap-0.5 *:basis-1/2'>
				<form action={removePost.bind(null, id)} className='w-full'>
					<Button
						type='submit'
						variant='secondary'
						size='size_32'
						className='w-[inherit]'
					>
						Удалить
					</Button>
				</form>
				<Button asChild variant='secondary' size='size_32' className='w-full'>
					<Link href={`/dev/blog/with-an-prisma/${id}/edit`}>
						Редактировать
					</Link>
				</Button>
			</div>
			<div>
				<h1 className='text-xl font-medium'>{post.title}</h1>
				<p>{post.body}</p>
			</div>
		</main>
	)
}
