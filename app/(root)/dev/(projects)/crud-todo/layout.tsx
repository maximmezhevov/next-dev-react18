import { Path } from '@/types'
import DevLayout from '@/components/ui/dev-layout'

const ROUTES: Path[] = [
	{
		href: '/dev/todo/with-an-prisma',
		label: 'with-an-prisma',
	},
]

export default function TodoLayout({
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
