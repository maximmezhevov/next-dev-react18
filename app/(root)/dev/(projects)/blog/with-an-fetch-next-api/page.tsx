// import { Post } from '@prisma/client'

import Link from 'next/link'

// import { PostsList } from '@/components/blog/posts-list'

const API_URL = `${process.env.API_URL}/blog/posts`
// const API_URL = 'http://localhost:3000/api/blog/posts'

export default async function BlogFetch() {
	// const data = await fetch(API_URL)
	// const posts = (await data.json()) as Post[]

	// const getAllPosts = async (): Promise<Post[]> => {
	// 	const data = await fetch(`${process.env.API_URL}/blog/posts`)
	// 	const posts = await data.json()
	// 	return posts
	// }
	// const posts = await getAllPosts()

	// const posts = await getAllPostsWithFetchAPI()

	return (
		<main className='space-y-4'>
			<div>
				API:&nbsp;<Link href={API_URL}>{API_URL}</Link>
			</div>
			{/* <PostsList posts={posts} /> */}

			<div className='space-y-2'>
				<h2>dev работает. build ошибка:,</h2>
				<code className='block whitespace-pre-line text-sm'>
					{`Error occurred prerendering page "/dev/blog/with-an-fetch-api". Read more: https://nextjs.org/docs/messages/prerender-error
					TypeError: fetch failed
						at node:internal/deps/undici/undici:13484:13
						at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
						at async s (/Users/m/DEV/JS/next-dev-react18/.next/server/app/(root)/dev/(projects)/blog/with-an-fetch-api/page.js:1:4495)
					Export encountered an error on /(root)/dev/(projects)/blog/with-an-fetch-api/page: /dev/blog/with-an-fetch-api, exiting the build.
					⨯ Static worker exited with code: 1 and signal: null`}
				</code>
			</div>
		</main>
	)
}
