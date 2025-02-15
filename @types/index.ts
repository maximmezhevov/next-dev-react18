// router

export type Path = { label: string; href: string }

export type Routes = Path & {
	variants?: Path[]
}

// auth

export type AvailableProviders = 'github'
