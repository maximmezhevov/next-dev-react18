import Link from 'next/link'
import { Button } from '@/components/ui'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<header className='flex h-[84px] items-center justify-between px-6'>
				<Button asChild variant='secondary'>
					<Link href='/'>
						<div>next-dev-react18</div>
					</Link>
				</Button>
			</header>
			<div className='px-6'>{children}</div>
		</>
	)
}
