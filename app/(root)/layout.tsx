import Link from 'next/link'
import { ThemeToggle } from '@/components/theme'
import { User } from '@/components/auth'
import { Button } from '@/components/ui'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='px-6'>
			<div className='mx-auto max-w-screen-md'>
				<header className='flex h-[84px] items-center justify-between gap-3'>
					<div>
						<Button asChild variant='secondary'>
							<Link href='/'>
								<div>next-dev-react18</div>
							</Link>
						</Button>
					</div>
					<div className='inline-flex gap-1'>
						<ThemeToggle />
						<User />
					</div>
				</header>
				{children}
			</div>
		</div>
	)
}
