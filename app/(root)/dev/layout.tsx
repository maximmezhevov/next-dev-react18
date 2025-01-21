import Link from 'next/link'

export default function DevLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex'>
			<Sidebar />
			{children}
		</div>
	)
}

const PROJECTS = ['blog-action', 'blog-api', 'blog-api-client']
const Sidebar: React.FC = () => {
	return (
		<aside className='h-svh shrink-0 border-r p-4'>
			<nav>
				<ul>
					{PROJECTS.map((item) => (
						<li key={item}>
							<Link href={`/dev/${item}`}>{item}</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	)
}
