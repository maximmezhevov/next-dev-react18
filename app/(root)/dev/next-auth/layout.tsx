import type { Path } from '@/@types'

import Link from 'next/link'
import { Button } from '@/components/shadcn'

const ROUTES: Path[] = [
	{ href: '/dev/next-auth/routes', label: 'routes' },

	{ href: '/dev/next-auth', label: 'next-auth (server)' },
	// { href: '/dev/next-auth/client', label: 'client' },
	// { href: '/dev/next-auth/server', label: 'server' },
	// { href: '/dev/next-auth/admin', label: 'admin' },
]

export default function NextAuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='space-y-12 p-6'>
			<header>
				<nav className='space-y-6 *:flex *:gap-1'>
					<ul>
						<Routes route={ROUTES.slice(0, 1)} />
					</ul>
					<ul>
						<Routes route={ROUTES.slice(1, ROUTES.length)} />
					</ul>
				</nav>
			</header>
			{children}
		</div>
	)
}

const Routes: React.FC<{ route: Path[] }> = ({ route }) => {
	return route.map((path) => (
		<li key={path.href}>
			<Button variant='secondary' size='32'>
				<Link href={path.href}>{path.label}</Link>
			</Button>
		</li>
	))
}
