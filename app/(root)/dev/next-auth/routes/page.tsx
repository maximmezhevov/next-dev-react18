import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/shadcn'

type Route = { id: string; title?: string; paths: string[] }

const ROUTES: Route[] = [
	{
		id: 'no-verif',
		title: '(no-verif) Aвторизация без email верификацией',
		paths: [
			'/auth/login-no-verif',
			'/auth/register-no-verif',
			'/auth/verification',
			'/auth/reset',
			'/auth/password-reset-no-verif',
		],
	},
	{
		id: 'verif',
		title: '(verif) Aвторизация с email верификацией',
		paths: ['/auth/login-verif', '/auth/register-verif', '/auth/reset-verif'],
	},
	{
		id: 'other-auth-routes',
		paths: ['/auth/error'],
	},
]

export default function NextAuthRoutesPage() {
	return (
		<main className='space-y-6'>
			<nav className='space-y-4'>
				<Routes routes={ROUTES.slice(0, 2)} />
				<Routes routes={ROUTES.slice(2, 3)} />
				<Routes routes={ROUTES.slice(3, ROUTES.length)} />
			</nav>
		</main>
	)
}

const Routes: React.FC<{ routes: Route[] }> = ({ routes }) => {
	return routes.map((group) => (
		<div key={group.id} className='space-y-2'>
			<h2>{group.title || group.id}</h2>
			<ul className='flex flex-wrap gap-1'>
				{group.paths.map((path) => (
					<li key={path}>
						<Button asChild variant='secondary' size='32'>
							<Link href={path}>{path}</Link>
						</Button>
					</li>
				))}
			</ul>
		</div>
	))
}
