import Link from 'next/link'

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex w-full'>
			<div className='w-fit shrink-0'>
				<div className='sticky top-0 h-svh w-[inherit] border-r p-4'>
					<Nav />
				</div>
			</div>
			<div className='w-full space-y-4 p-4'>
				<header>blog</header>
				{children}
			</div>
		</div>
	)
}

const ROUTES_BLOG = [
	{ href: '/blog' /* /blogwith-an-prima */, label: 'prisma' },
	{
		href: '/blog/with-an-fetch-next-api',
		label: 'fetch next api ',
	},
	{ href: '/blog/with-an-fetch-api', label: 'fetch api' },
]
const Nav: React.FC = () => {
	return (
		<nav>
			<ul>
				{ROUTES_BLOG.map((item) => (
					<li key={item.href}>
						<Link href={`/dev${item.href}`}>{item.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

// https://nextjs.org/docs/app/getting-started/data-fetching-and-streaming
