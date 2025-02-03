import type { Routes } from '@/types'
import { Sidebar } from '@/components/ui'
import { SidebarBreadcrumb } from '../sidebar-breadcrumb'
import { Separator } from '@/components/shadcn'

export const DevSidebar: React.FC<{
	children: React.ReactNode
	routes: Routes[]
}> = ({ children, routes }) => {
	return (
		<Sidebar.Root>
			<SidebarSidebar routes={routes} />
			<SidebarInset>{children}</SidebarInset>
		</Sidebar.Root>
	)
}

const SidebarSidebar: React.FC<{ routes: Routes[] }> = ({ routes }) => {
	return (
		<Sidebar.Sidebar>
			<nav>
				<Sidebar.NavList routes={routes} />
			</nav>
		</Sidebar.Sidebar>
	)
}

const SidebarInset: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Sidebar.Inset>
			<Sidebar.InsetHeader>
				<div className='inline-flex h-[inherit] items-center px-2'>
					<Sidebar.SidebarTrigger />
					<Sidebar.ScreenCropTrigger />
					<Separator orientation='vertical' className='mx-2 h-4' />
					<div className='ms-2'>
						<SidebarBreadcrumb />
					</div>
				</div>
			</Sidebar.InsetHeader>
			{children}
		</Sidebar.Inset>
	)
}
