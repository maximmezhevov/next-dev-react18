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
	const res = await fetch(API_URL)
	const posts = (await res.json()) as Post[]
	return (
		<main className='space-y-4'>
			<div>
				API:&nbsp;
				<Link target='_blank' href={API_URL}>
					{API_URL}
				</Link>
			</div>
			<ul className='space-y-1'>
				{posts.map((post) => (
					<li key={post.id} className='rounded-md border p-2'>
						<h2>{post.title}</h2>
						<p>{post.content}</p>
					</li>
				))}
			</ul>
		</main>
	)
}
