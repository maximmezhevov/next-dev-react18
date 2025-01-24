import type { Path } from '@/types'

import { ThemeModeToggleDropdown } from '@/components/theme'
import { SettingsDropdown } from '@/components/settings'
import { UserDropdown } from '@/components/auth'

import { LinkActive } from '@/components/ui'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Aside />
			{children}
		</>
	)
}

const Aside: React.FC = () => {
	return (
		<div className='sticky top-0 h-[3rem] border-b bg-background/50 backdrop-blur-sm'>
			<div className='mx-auto h-[inherit] max-w-screen-lg'>
				<aside className='flex h-[inherit] items-center gap-0.5 px-2'>
					<nav className='flex-1'>
						<NavList />
					</nav>
					<ThemeModeToggleDropdown />
					<SettingsDropdown />
					<UserDropdown />
				</aside>
			</div>
		</div>
	)
}

const ROUTES: Path[] = [
	{ href: '/', label: 'next-dev-react18' },
	{ href: '/dev', label: 'dev' },
]
const NavList: React.FC = () => {
	return (
		<ul className='space-x-0.5'>
			{ROUTES.map((path) => (
				<li key={path.href} className='inline-block'>
					<LinkActive variant='secondary' size='sm_32' path={path} />
				</li>
			))}
		</ul>
	)
}
