import { create } from 'zustand'

interface Store {
	open: boolean
	setOpen: () => void
	sidebarSheet: boolean
	setSidebarSheet: () => void
}

export const useStore = create<Store>((set) => ({
	open: true,
	setOpen: () => set((state) => ({ open: !state.open })),
	sidebarSheet: false,
	setSidebarSheet: () =>
		set((state) => ({ sidebarSheet: !state.sidebarSheet })),
}))
