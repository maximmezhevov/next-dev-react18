import type { Path } from '@/types'
import { Sidebar } from '@/components/ui'

export const DevSidebar: React.FC<{
	children: React.ReactNode
	routes: Path[]
}> = ({ children, routes }) => {
	return (
		<Sidebar.Root>
			<Sidebar.Sidebar>
				<Sidebar.Nav>
					<Sidebar.NavList routes={routes} />
				</Sidebar.Nav>
			</Sidebar.Sidebar>
			<Sidebar.Inset>
				<Sidebar.InsetHeader>...</Sidebar.InsetHeader>
				{children}
			</Sidebar.Inset>
		</Sidebar.Root>
	)
}
