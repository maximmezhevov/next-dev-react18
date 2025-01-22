import type { Path } from '@/types'
import { LinkActive } from '@/components/ui'

export default function DevLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex w-full'>
			<div className='w-fit shrink-0'>
				<div className='sticky top-0 h-svh w-[inherit] border-r p-2'>
					<Nav />
				</div>
			</div>
			{children}
		</div>
	)
}

const ROUTES: Path[] = [{ href: '/dev/blog', label: 'Блог' }]
const Nav: React.FC = () => {
	return (
		<nav>
			<ul>
				{ROUTES.map((path) => (
					<li key={path.href} className='w-full'>
						<LinkActive
							path={path}
							variant='secondary'
							size='sm_32'
							className='w-full'
						/>
					</li>
				))}
			</ul>
		</nav>
	)
}
