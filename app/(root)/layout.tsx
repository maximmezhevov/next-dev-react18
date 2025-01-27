import type { Path } from '@/types'

import { ThemeModeToggleDropdown } from '@/components/theme'
import { UserDropdown } from '@/components/auth'

import { LinkActive } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col-reverse'>
			{
				children /* peer/sidebar-root / data-sidebar={boolean} / width siderat 239px  */
			}
			<Aside
				className={cn(
					'pl-0 transition-[padding] xl:peer-data-[sidebar=true]/sidebar-root:pl-[239px] xl:peer-data-[sidebar=false]/sidebar-root:ease-out xl:peer-data-[sidebar=true]/sidebar-root:ease-in',
					// 'lg:peer-data-[sidebar=false]/sidebar-root:bg-green-100 lg:peer-data-[sidebar=true]/sidebar-root:bg-red-100',
					''
				)}
			/>
		</div>
	)
}

const Aside: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<aside
			className={cn(
				'sticky top-0 h-[3rem] border-b bg-background/50 pl-0 backdrop-blur-sm',
				className
			)}
		>
			<div className='h-[inherit] xl:mx-auto xl:max-w-screen-lg'>
				<div className='flex h-[inherit] items-center gap-0.5 px-2 xl:px-0'>
					<nav className='flex-1'>
						<NavList />
					</nav>
					<ThemeModeToggleDropdown />
					<UserDropdown />
				</div>
			</div>
		</aside>
	)
}

const ROUTES: Path[] = [
	{ href: '/', label: 'next-dev-react18' },
	{ href: '/dev', label: 'dev' },
]
const NavList: React.FC = () => {
	return (
		<ul className='space-x-0.5'>
			{ROUTES.map((path) => (
				<li key={path.href} className='inline-block'>
					<LinkActive variant='secondary' size='sm_32' path={path} />
				</li>
			))}
		</ul>
	)
}
