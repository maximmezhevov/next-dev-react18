import type { Path } from '@/types'
import DevLayout from '@/components/ui/dev-layout'

const ROUTES: Path[] = [
	{ href: '/dev/blogs', label: 'Блог' },
	{ href: '/dev/todos', label: 'Тодо' },
	{ href: '/dev/next-auth', label: 'next-auth' },
]

export default function DevLayout_({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<DevLayout className='min-h-[calc(100svh-3rem)]'>
			<DevLayout.Aside className='sticky top-[3rem] h-[calc(100svh-3rem)]'>
				<DevLayout.Nav>
					<DevLayout.NavList routes={ROUTES} />
				</DevLayout.Nav>
			</DevLayout.Aside>
			<DevLayout.Inset>
				<DevLayout.InsetHeader className='sticky top-[3rem]'>
					1
				</DevLayout.InsetHeader>
				{children}
			</DevLayout.Inset>
		</DevLayout>
	)
}
