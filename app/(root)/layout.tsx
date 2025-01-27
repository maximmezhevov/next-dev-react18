import type { Path } from '@/types'

import { cn } from '@/lib/utils'
import { SidebarToggleDropdown } from '@/components/dev'
import { ThemeModeToggleDropdown } from '@/components/theme'
import { UserDropdown } from '@/components/auth'
import { LinkActive } from '@/components/ui'
import { Separator } from '@/components/shadcn'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col-reverse'>
			{
				children
				/* peer/sidebar-root / data-sidebar={boolean} / width siderat 239px  */
			}
			<Aside
				className={cn(
					'transition-[padding] ease-in-out lg:peer-data-[sidebar=true]/sidebar-root:pl-[calc(239px+8px)] xl:peer-data-[sidebar=true]/sidebar-root:pl-[239px]',
					'px-2 xl:px-0'
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
			<div className='h-[inherit] lg:mx-auto lg:max-w-screen-lg'>
				<div className='flex h-[inherit] items-center gap-0.5'>
					<nav className='flex-1'>
						<NavList />
					</nav>
					<SidebarToggleDropdown triggerVariant='icon' />
					<ThemeModeToggleDropdown />
					<Separator orientation='vertical' className='mx-2 h-4' />
					<UserDropdown />
				</div>
			</div>
		</aside>
	)
}

const ROUTES: Path[] = [
	{ href: '/', label: 'next-dev-react18' },
	{ href: '/dev', label: 'dev' },
	{ href: '/me', label: 'me' },
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
