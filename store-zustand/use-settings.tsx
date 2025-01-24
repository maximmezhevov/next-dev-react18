import { create } from 'zustand'

type Version = 'v0.0.1' | 'v0.0.2'

interface SettingsStore {
	variantApp: Version
	setVarioantApp: (value: Version) => void
	variantDev: Version
	setVariantDev: (value: Version) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
	variantApp: 'v0.0.1',
	setVarioantApp: (value: Version) => set({ variantApp: value }),
	variantDev: 'v0.0.1',
	setVariantDev: (value: Version) => set({ variantDev: value }),
}))
