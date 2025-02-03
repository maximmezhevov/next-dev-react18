'use client'

import type { Routes } from '@/types'
import { useStore } from './use-store'
import { DevSidebar } from '../sidebar'
import { DevSidebarShadcn } from '../sidebar-shadcn'

export const DevLayoutVariant: React.FC<{
	children: React.ReactNode
	routes: Routes[]
}> = ({ children, routes }) => {
	const devLayoutVariant = useStore((state) => state.devLayoutVariant)
	switch (devLayoutVariant) {
		case 'sidebar-ui':
			return <DevSidebar routes={routes}>{children}</DevSidebar>
		case 'sidebar-shadcn':
			return <DevSidebarShadcn routes={routes}>{children}</DevSidebarShadcn>
	}
}
