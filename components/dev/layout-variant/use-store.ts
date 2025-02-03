import { create } from 'zustand'

export type DevLayoutVariant = 'sidebar-ui' | 'sidebar-shadcn'

interface Store {
	devLayoutVariant: DevLayoutVariant
	setDevLayoutVariant: (value: DevLayoutVariant) => void
}

export const useStore = create<Store>((set) => ({
	devLayoutVariant: 'sidebar-ui',
	setDevLayoutVariant: (value: DevLayoutVariant) =>
		set({ devLayoutVariant: value }),
}))
