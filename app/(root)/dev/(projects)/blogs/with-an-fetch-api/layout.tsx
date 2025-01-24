import Link from 'next/link'

export default function BlogWithAnFetchApiLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='w-full space-y-4 p-4'>
			<header className='flex items-center gap-1'>
				<h1>
					<Link href='/dev/blog/with-an-fetch-api'>Блог</Link>
				</h1>
			</header>
			{children}
		</div>
	)
}
