import type { Path } from '@/types'

import { cn } from '@/lib/utils'
import { LinkActive } from '@/components/ui'

const Layout: React.FC<{
	children: React.ReactNode
	className?: string
}> & {
	Aside: React.FC<{ children: React.ReactNode; className?: string }>
	Nav: React.FC<{ children: React.ReactNode }>
	NavList: React.FC<{ routes: Path[] }>
	Inset: React.FC<{ className?: string } & { children: React.ReactNode }>
} = ({ children, className }) => {
	return (
		<div className={cn('flex min-h-[calc(100svh-3rem)] w-full', className)}>
			{children}
		</div>
	)
}

Layout.Aside = ({ children, className }) => (
	<aside className='min-h-[inherit] w-fit shrink-0'>
		<div
			className={cn(
				'sticky top-[3rem] h-[calc(100svh-3rem)] w-[inherit] border-r p-2',
				className
			)}
		>
			{children}
		</div>
	</aside>
)
Layout.Aside.displayName = 'Aside'

Layout.Nav = ({ children }) => <nav>{children}</nav>
Layout.Nav.displayName = 'Nav'

Layout.NavList = ({ routes }) => (
	<ul className='space-y-0.5'>
		<NavItem routes={routes} />
	</ul>
)
Layout.NavList.displayName = 'NavList'

const NavItem: React.FC<{ routes: Path[] }> = ({ routes }) =>
	routes.map((path) => (
		<li key={path.href}>
			<LinkActive
				variant='secondary'
				size='sm_32'
				path={path}
				className='w-full'
			/>
		</li>
	))

Layout.Inset = ({ children, className }) => (
	<div className={cn('shrink grow', className)}>{children}</div>
)
Layout.Inset.displayName = 'Inset'

export default Layout
