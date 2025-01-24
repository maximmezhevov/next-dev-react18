import type { Path } from '@/types'
import DevLayout from '@/components/ui/dev-layout'

const ROUTES: Path[] = [
	{ href: '/dev/blogs/with-an-prisma', label: 'prisma' },
	{
		href: '/dev/blogs/with-an-fetch-next-api',
		label: 'fetch-next-api ',
	},
	{ href: '/dev/blogs/with-an-fetch-api', label: 'fetch-api' },
]

export default function BlogsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<DevLayout className='min-h-[calc(100svh-6rem)]'>
			<DevLayout.Aside className='sticky top-[6rem] h-[calc(100svh-6rem)]'>
				<DevLayout.Nav>
					<DevLayout.NavList routes={ROUTES} />
				</DevLayout.Nav>
			</DevLayout.Aside>
			<DevLayout.Inset className='mx-auto max-w-screen-lg'>
				{children}
			</DevLayout.Inset>
		</DevLayout>
	)
}
