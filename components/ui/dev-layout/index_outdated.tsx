/*
	При использовании 'use client' ошибка:
	[ Server ] React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
*/

// 'use client'

import type { Path } from '@/types'

import { cn } from '@/lib/utils'
import { LinkActive } from '@/components/ui'

const DevLayout: React.FC<{
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

DevLayout.Aside = ({ children, className }) => (
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
DevLayout.Aside.displayName = 'Aside'

DevLayout.Nav = ({ children }) => <nav>{children}</nav>
DevLayout.Nav.displayName = 'Nav'

DevLayout.NavList = ({ routes }) => (
	<ul className='space-y-0.5'>
		{routes.map((path) => (
			<li key={path.href}>
				<LinkActive
					variant='secondary'
					size='sm_32'
					path={path}
					className='w-full'
				/>
			</li>
		))}
	</ul>
)
DevLayout.NavList.displayName = 'NavList'

DevLayout.Inset = ({ children, className }) => (
	<div className={cn('shrink grow', className)}>{children}</div>
)
DevLayout.Inset.displayName = 'Inset'

export default DevLayout
