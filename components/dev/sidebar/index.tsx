import type { Routes } from '@/types/index'
import { Sidebar } from '@/components/ui'
import { SidebarBreadcrumb } from '../sidebar-breadcrumb'
import { Separator } from '@/components/shadcn'
import { DevLayoutVariantToggleDropdown } from '../layout-variant'

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
				<div className='grid h-full grid-cols-[auto_1fr_auto] content-center'>
					<div className='inline-flex items-center'>
						<Sidebar.SidebarTrigger />
						<Sidebar.ScreenCropTrigger />
						<Separator orientation='vertical' className='mx-2 h-4' />
					</div>
					<div className='overflow-hidden'>
						<div className='overflow-x-scroll'>
							<SidebarBreadcrumb className='mx-2 h-full' />
						</div>
					</div>
					<div className='inline-flex items-center'>
						<Separator orientation='vertical' className='mx-2 h-4' />
						<DevLayoutVariantToggleDropdown triggerVariant='icon' />
					</div>
				</div>
			</Sidebar.InsetHeader>
			{children}
		</Sidebar.Inset>
	)
}
