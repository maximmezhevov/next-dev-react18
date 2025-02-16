import { createPost } from '@/actions/blogs'
import { Button } from '@/components/shadcn/button'

export default function BlogWithAnPrismaLayoutNew() {
	return (
		<main>
			<form
				className='flex h-[calc(100svh-9rem)] flex-col justify-between gap-2 py-2'
				action={createPost}
			>
				<label className='text-sm'>Добавить новый пост</label>
				<input
					type='text'
					placeholder='Заголовок'
					required
					name='title'
					className='rounded-md border px-2 py-1'
				/>
				<textarea
					placeholder='Основной текст'
					required
					name='body'
					className='shrink grow rounded-md border px-2 py-1'
				/>
				<Button type='submit' size='32' className='w-full'>
					Добавить новый пост
				</Button>
			</form>
		</main>
	)
}
