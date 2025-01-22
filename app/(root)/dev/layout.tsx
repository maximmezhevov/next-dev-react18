import Link from 'next/link'

export default function DevLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex'>
			<div className='w-fit shrink-0'>
				<div className='sticky top-0 h-svh w-[inherit] border-r p-4'>
					<Nav />
				</div>
			</div>
			{children}
		</div>
	)
}

const ROUTES_PROJECT: { href: string; label?: string }[] = [{ href: 'blog' }]
const Nav: React.FC = () => {
	return (
		<nav>
			<ul>
				{ROUTES_PROJECT.map((item) => (
					<li key={item.href}>
						<Link href={`/dev/${item.href}`}>{item?.label || item.href}</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
