// auth

export type User = { name: string; email: string; avatar: string }

// router

export type Path = { label: string; href: string }

export type Routes = Path & {
	variants?: Path[]
}
