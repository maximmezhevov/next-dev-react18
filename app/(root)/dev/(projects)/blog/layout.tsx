import type { Path } from '@/types'
import { LinkActive } from '@/components/ui'

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex w-full'>
			<div className='w-fit shrink-0'>
				<div className='sticky top-0 h-svh w-[inherit] border-r p-2'>
					<Nav />
				</div>
			</div>
			<div className='w-full space-y-4 p-2'>
				<header>Блог</header>
				{children}
			</div>
		</div>
	)
}

const ROUTES: Path[] = [
	{ href: '/dev/blog/with-an-prisma', label: 'prisma' },
	{
		href: '/dev/blog/with-an-fetch-next-api',
		label: 'fetch-next-api ',
	},
	{ href: '/dev/blog/with-an-fetch-api', label: 'fetch-api' },
]
const Nav: React.FC = () => {
	return (
		<nav>
			<ul className='space-y-0.5'>
				{ROUTES.map((item) => (
					<li key={item.href} className='w-full'>
						<LinkActive
							path={item}
							variant='secondary'
							size='sm_32'
							className='w-full'
						/>
					</li>
				))}
			</ul>
		</nav>
	)
}
