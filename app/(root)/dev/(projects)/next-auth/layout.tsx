import type { Path } from '@/@types'

import { Button, Separator } from '@/components/shadcn'
import Link from 'next/link'

// prettier-ignore
const ROUTES: Path[]= [
	{ href: '/dev/next-auth', label: 'next-auth' },
	{ href: '/dev/next-auth/routes', label: 'routes' },
	{ href: '/dev/next-auth/dev-log', label: 'dev-log' },
	{ href: '/dev/next-auth/client', label: 'client' },
	{ href: '/dev/next-auth/server', label: 'server' },
	{ href: '/dev/next-auth/admin', label: 'admin' }
]

export default function NextAuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='space-y-[1rem] p-[1rem]'>
			<header>
				<nav className='flex items-center gap-1'>
					{ROUTES.slice(0, 1).map((path) => (
						<PathItem key={path.href} path={path} />
					))}
					<Separator orientation='vertical' className='h-8' />
					{ROUTES.slice(1, 3).map((path) => (
						<PathItem key={path.href} path={path} />
					))}
					<Separator orientation='vertical' className='h-8' />
					{ROUTES.slice(3, ROUTES.length).map((path) => (
						<PathItem key={path.href} path={path} disabled={true} />
					))}
				</nav>
			</header>
			{children}
		</div>
	)
}

const PathItem: React.FC<{
	path: Path
	disabled?: boolean
}> = ({ path, disabled, ...props }) => {
	return (
		<Button variant='secondary' size='32' disabled={disabled} {...props}>
			<Link href={path.href}>{path.label}</Link>
		</Button>
	)
}
