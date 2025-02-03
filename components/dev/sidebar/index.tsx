import type { Routes } from '@/types'
import { Sidebar } from '@/components/ui'
import { SidebarBreadcrumb } from '../sidebar-breadcrumb'

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
				<SidebarBreadcrumb />
			</Sidebar.InsetHeader>
			{children}
		</Sidebar.Inset>
	)
}
