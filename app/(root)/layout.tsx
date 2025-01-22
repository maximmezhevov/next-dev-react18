import { ThemeModeToggleDropdown } from '@/components/theme'
import { LinkActive } from '@/components/ui'
import { Path } from '@/types'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex'>
			<Aside />
			{children}
		</div>
	)
}

const Aside: React.FC = () => {
	return (
		<div className='w-fit shrink-0'>
			<div className='sticky top-0 flex h-svh w-[inherit] flex-col justify-between border-r p-2'>
				<Nav />
				<ThemeModeToggleDropdown />
			</div>
		</div>
	)
}

const ROUTES: Path[] = [
	{ href: '/', label: 'ndr18' },
	{ href: '/dev', label: 'dev' },
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
