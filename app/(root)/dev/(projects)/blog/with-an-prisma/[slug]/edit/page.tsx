import { updatePost } from '@/actions/blogs'
import { getPostById_WithAsPrisma } from '@/services/blog'
import { Button } from '@/components/shadcn/button'

type Props = { params: Promise<{ slug: string }> }

export default async function BlogWithAnPrismaLayoutEdit({ params }: Props) {
	const id = (await params).slug
	const post = await getPostById_WithAsPrisma(id)

	if (!post) {
		return <div>Post not found</div>
	}

	return (
		<main>
			<form
				className='flex h-[calc(100svh-9rem)] flex-col justify-between gap-2 py-2'
				action={updatePost}
			>
				<label className='text-sm'>Редактирование поста</label>
				<input
					type='text'
					placeholder='Заголовок'
					required
					name='title'
					className='rounded-md border px-2 py-1'
					defaultValue={post.title}
				/>
				<textarea
					placeholder='Основной текст'
					required
					name='body'
					className='shrink grow rounded-md border px-2 py-1'
					defaultValue={post.body || ''}
				/>
				<input type='hidden' name='id' value={post.id} />

				<div className='inline-flex h-fit min-h-8 gap-1 *:basis-1/2'>
					<Button
						type='button'
						variant='secondary'
						size='32'
						className='h-full w-full whitespace-normal py-2'
					>
						Отменить изменения
					</Button>
					{/* <input type='submit' value='Add post' /> */}
					<Button
						type='submit'
						size='32'
						className='h-full w-full whitespace-normal py-2'
					>
						Применить изменения
					</Button>
				</div>
			</form>
		</main>
	)
}
