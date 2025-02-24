import Link from 'next/link'
import { Button } from '@/components/ui'
import { ThemeToggle } from '@/components/theme'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='px-6'>
			<div className='mx-auto max-w-screen-md'>
				<header className='flex h-[84px] items-center justify-between'>
					<div className='shrink grow'>
						<Button asChild variant='secondary'>
							<Link href='/'>
								<div>next-dev-react18</div>
							</Link>
						</Button>
					</div>
					<ThemeToggle />
				</header>
				{children}
			</div>
		</div>
	)
}
