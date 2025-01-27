import type { Path } from '@/types'
import { cn } from '@/lib/utils'

import { SidebarTriggers } from './components-client'

import { LinkActive } from '@/components/ui'
import { Separator } from '@/components/shadcn'

interface SidebarNavProps {
	children: React.ReactNode
}
const SidebarNav: React.FC<SidebarNavProps> = ({ children }) => (
	<nav className='p-2'>{children}</nav>
)

interface SidebarNavListProps {
	routes: Path[]
}
const SidebarNavList: React.FC<SidebarNavListProps> = ({ routes }) => (
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

interface SidebarInsetProps {
	children: React.ReactNode
	className?: string
}
const SidebarInset: React.FC<SidebarInsetProps> = ({ children, className }) => (
	<div className={cn('min-h-[calc(100svh-6rem)] shrink grow', className)}>
		{children}
	</div>
)

interface InsetHeaderProps {
	children: React.ReactNode
	className?: string
}
const SidebarInsetHeader: React.FC<InsetHeaderProps> = ({
	children,
	className,
}) => (
	<aside
		className={cn(
			'sticky top-[3rem] h-[3rem] border-b bg-background/50 px-2 backdrop-blur-sm xl:px-0',
			className
		)}
	>
		<div className='h-[inherit] lg:mx-auto lg:max-w-screen-lg'>
			<div className='flex h-[inherit] items-center gap-2'>
				<SidebarTriggers />
				<Separator orientation='vertical' className='me-2 h-3.5' />
				{children}
			</div>
		</div>
	</aside>
)

export { SidebarNav, SidebarNavList, SidebarInset, SidebarInsetHeader }
