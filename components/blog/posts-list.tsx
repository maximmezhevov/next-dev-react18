import { Post } from '@prisma/client'

export const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => {
	return (
		<ul className='space-y-1'>
			{posts.map((post) => (
				<li key={post.id} className='rounded-md border p-2'>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</li>
			))}
		</ul>
	)
}
