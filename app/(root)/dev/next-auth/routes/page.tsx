import type { Path } from '@/@types'
import { AddCallbackUrlButton } from '@/components/ui'

type RouteGroup = {
	group: string
	paths: Path[]
}

// prettier-ignore
const ROUTE: RouteGroup[] = [
	{ group: 'no-verif', paths: [
		{ href: '/auth/login', label: 'login' },
		{ href: '/auth/register', label: 'register' },
		{ href: '/auth/password-reset-no-verif', label: 'password-reset-no-verif' }
	]},
	{ group: 'verif', paths: [
		{ href: '/auth/login-verif', label: 'login-verif' },
		{ href: '/auth/register-verif', label: 'register-verif' },
		{ href: '/auth/verification', label: 'verification' },
		{ href: '/auth/reset', label: 'reset' },
		{ href: '/auth/password-reset', label: 'password-reset' }
	]},
	{ group: 'other', paths: [
		{ href: '/auth/error', label: 'error' }
	]},
]

export default function NextAuthRoutesPage() {
	return (
		<main className='space-y-4'>
			{ROUTE.map((group) => (
				<nav key={group.group} className='space-y-2'>
					<h2>{group.group}</h2>
					<div className='flex items-center gap-1'>
						<span>/auth/</span>
						<ul className='flex gap-1'>
							{group.paths.map((path) => (
								<li key={path.href}>
									<AddCallbackUrlButton
										href={path.href}
										label={path.label}
										variant='secondary'
										size='32'
									/>
								</li>
							))}
						</ul>
					</div>
				</nav>
			))}
		</main>
	)
}
