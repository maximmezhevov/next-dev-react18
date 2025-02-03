import { create } from 'zustand'

interface Store {
	open: boolean
	setOpen: () => void
	sheet: boolean
	setSheet: () => void
	crop: boolean
	setCrop: () => void
}

export const useStore = create<Store>((set) => ({
	open: true,
	setOpen: () => set((state) => ({ open: !state.open })),
	sheet: false,
	setSheet: () => set((state) => ({ sheet: !state.sheet })),
	crop: true,
	setCrop: () => set((state) => ({ crop: !state.crop })),
}))
