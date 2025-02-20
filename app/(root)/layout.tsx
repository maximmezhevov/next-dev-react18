import type { User } from '@prisma/client'
import type { Path } from '@/@types'

import { ThemeModeToggleDropdown } from '@/components/theme'
// import { UserDropdown } from '@/components/auth'
import { LinkActive } from '@/components/ui'

const ROUTES: Path[] = [
	{ href: '/', label: 'ndr18' },
	{ href: '/dev', label: 'dev' },
	{ href: '/me', label: 'me' },
]

const USER: User = {
	name: 'name',
	email: 'example@email.com',
	image: '',
	id: '1',
	password: null,
	role: 'USER',
	emailVerified: null,
	twoFactor: false,
	createdAt: new Date(),
	updatedAt: new Date(),
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<RootHeader routes={ROUTES} user={USER} />
			{children}
		</>
	)
}

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<aside className='sticky top-0 z-20 h-[3rem] bg-background/50 backdrop-blur-sm'>
			<div className='flex h-full flex-col'>
				<div className='mx-auto w-full max-w-screen-xl shrink-0 grow'>
					{children}
				</div>
				<div className='h-[1px] w-full shrink-0 bg-border' />
			</div>
		</aside>
	)
}

const RootHeader: React.FC<{ routes: Path[]; user: User }> = ({
	routes,
	// user,
}) => {
	return (
		<Header>
			<div className='flex h-full items-center justify-between px-2'>
				<nav>
					<NavList routes={routes} />
				</nav>
				<div className='inline-flex items-center'>
					<ThemeModeToggleDropdown />
					{/* <UserDropdown user={user} /> */}
				</div>
			</div>
		</Header>
	)
}

const NavList: React.FC<{ routes: Path[] }> = ({ routes }) => {
	return (
		<ul className='space-x-0.5 *:inline-block'>
			{routes.map((path) => (
				<li key={path.href}>
					<LinkActive variant='secondary' size='32-sm' path={path} />
				</li>
			))}
		</ul>
	)
}
