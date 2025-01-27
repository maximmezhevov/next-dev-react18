import { create } from 'zustand'

export type DevSidebarVariant = 'children' | 'sidebar' | 'sidebar-shadcn'

interface Store {
	devSidebarVariant: DevSidebarVariant
	setDevSidebarVariant: (value: DevSidebarVariant) => void
}

export const useStore = create<Store>((set) => ({
	devSidebarVariant: 'sidebar',
	setDevSidebarVariant: (value: DevSidebarVariant) =>
		set({ devSidebarVariant: value }),
}))
