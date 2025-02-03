import type { Routes } from '@/types'
import { Content } from './content'
import { Inset } from './inset'
import { Sidebar } from '@/components/shadcn'

export const DevSidebarShadcn: React.FC<{
	children: React.ReactNode
	routes: Routes[]
}> = ({ children, routes }) => {
	return (
		<Sidebar.Provider>
			<Content routes={routes} />
			<Inset>{children}</Inset>
		</Sidebar.Provider>
	)
}
