import Link from 'next/link'

type Post = {
	id: number
	title: string
	content: string
	author: string
	date: string
	category: string
}

const API_URL = 'https://api.vercel.app/blog'

export default async function BlogWithAnFetch() {
	// const res = await fetch(API_URL)
	// const posts = (await res.json()) as Post[]

	const getAllPosts = async (): Promise<Post[]> => {
		const res = await fetch(API_URL)
		const data = await res.json()
		return data
	}
	const posts = await getAllPosts()

	return (
		<main className='space-y-4'>
			<div className='font-mono text-xs'>
				api:&nbsp;
				<Link target='_blank' href={API_URL} className='hover:underline'>
					{API_URL}
				</Link>
			</div>
			<ul className='space-y-2'>
				{posts.map((post) => (
					<li key={post.id}>
						<code className='block text-xs'>{JSON.stringify(post)}</code>
					</li>
				))}
			</ul>
		</main>
	)
}
