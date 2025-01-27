import { SidebarVariant } from '@/components/dev'

const ROUTES = [
	{
		href: '/dev/blogs',
		label: 'Блог',
		// sub: [
		// 	{ href: '/dev/blogs/with-an-prisma', label: 'prisma' },
		// 	{
		// 		href: '/dev/blogs/with-an-fetch-next-api',
		// 		label: 'fetch-next-api ',
		// 	},
		// 	{ href: '/dev/blogs/with-an-fetch-api', label: 'fetch-api' },
		// ],
	},
	{ href: '/dev/next-auth', label: 'next-auth' },
]

export default function DevLayout({ children }: { children: React.ReactNode }) {
	return <SidebarVariant routes={ROUTES}>{children}</SidebarVariant>
}
