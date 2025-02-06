import { Routes } from '@/types/index'

import { DevLayoutVariant } from '@/components/dev'

const ROUTES: Routes[] = [
	// {
	// 	label: 'try',
	// 	href: '/try',
	// },
	// {
	// 	label: 'next',
	// 	href: '/dev/next',
	// },
	{
		label: 'auth (next-auth)',
		href: '/dev/next-auth',
	},
	{
		label: 'Блог',
		href: '/dev/blog',
		variants: [
			{
				label: 'with an prisma',
				href: '/dev/blog/with-an-prisma',
			},
			{
				label: 'with an fetch next api',
				href: '/dev/blog/with-an-fetch-next-api',
			},
			{
				label: 'with an fetch api',
				href: '/dev/blog/with-an-fetch-api',
			},
		],
	},
]

export default function DevLayout({ children }: { children: React.ReactNode }) {
	return <DevLayoutVariant routes={ROUTES}>{children}</DevLayoutVariant>
}
