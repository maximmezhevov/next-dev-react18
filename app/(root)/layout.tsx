import type { Path, User } from '@/types'
import { DevLayoutVariantToggleDropdown } from '@/components/dev'
import { ThemeModeToggleDropdown } from '@/components/theme'
import { UserDropdown } from '@/components/auth'
import { LinkActive } from '@/components/ui'

const ROUTES: Path[] = [
	{ href: '/', label: 'ndr18' },
	{ href: '/dev', label: 'dev' },
	{ href: '/me', label: 'me' },
]

const USER: User = { name: 'name', email: 'example@email.io', avatar: '' }

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col-reverse'>
			{children}
			<RootHeader routes={ROUTES} user={USER} />
		</div>
	)
}

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<aside className='sticky top-0 h-[3rem] bg-background/50 backdrop-blur-sm'>
			<div className='flex h-full flex-col'>
				<div className='mx-auto w-full max-w-screen-xl shrink-0 grow px-2 xl:px-0'>
					{children}
				</div>
				<div className='h-[1px] w-full shrink-0 bg-border' />
			</div>
		</aside>
	)
}

const RootHeader: React.FC<{ routes: Path[]; user: User }> = ({
	routes,
	user,
}) => {
	return (
		<Header>
			<div className='flex h-full items-center justify-between'>
				<nav>
					<NavList routes={routes} />
				</nav>
				<div className='inline-flex items-center'>
					<DevLayoutVariantToggleDropdown triggerVariant='icon' />
					<ThemeModeToggleDropdown />
					<div className='mx-2 h-4 w-[1px] shrink-0 bg-border' />
					<UserDropdown user={user} />
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
					<LinkActive variant='secondary' size='sm_32' path={path} />
				</li>
			))}
		</ul>
	)
}
