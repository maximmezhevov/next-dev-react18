import { ButtonActive, Render } from '@/components/shared'

type Routes = { href: string; label: string }
const ROUTES: Routes[] = [
	{ href: '/next-auth', label: 'next-auth' },
	{ href: '/next-auth/server', label: 'next-auth/server' },
	{ href: '/next-auth/client', label: 'next-auth/client (useSession)' },
	{ href: '/next-auth/parallel', label: 'next-auth/parallel' },
]

export default function NextAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='space-y-6'>
			<header className='flex items-center justify-between'>
				<nav className='inline-flex flex-wrap gap-1'>
					<Render<Routes>
						items={ROUTES}
						render={(item) => <ButtonActive href={item.href} label={item.label} />}
					/>
				</nav>
			</header>
			{children}
		</div>
	)
}
