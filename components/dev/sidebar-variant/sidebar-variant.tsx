'use client'

import type { Path } from '@/types'
import { useStore } from './use-store'
import { DevSidebar } from '../sidebar'
import { DevSidebarShadcn } from '../sidebar-shadcn'

export const DevSidebarVariant: React.FC<{
	children: React.ReactNode
	routes: Path[]
}> = ({ children, routes }) => {
	const devSidebarVariant = useStore((state) => state.devSidebarVariant)
	switch (devSidebarVariant) {
		case 'children':
			return children
		case 'sidebar':
			return <DevSidebar routes={routes}>{children}</DevSidebar>
		case 'sidebar-shadcn':
			return <DevSidebarShadcn routes={routes}>{children}</DevSidebarShadcn>
	}
}
