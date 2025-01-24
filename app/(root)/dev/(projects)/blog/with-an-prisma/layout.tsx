import Link from 'next/link'

export default function BlogWithAnPrismaLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='w-full space-y-4 p-4'>
			<header className='flex items-center gap-1'>
				<h1>
					<Link href='/dev/blog/with-an-prisma'>Блог</Link>
				</h1>
			</header>
			{children}
		</div>
	)
}
