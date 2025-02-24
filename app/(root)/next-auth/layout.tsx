import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NextAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='space-y-6'>
			<header className='flex flex-wrap gap-1'>
				<Button asChild variant='secondary'>
					<Link href='/next-auth'>next-auth</Link>
				</Button>
				<Button asChild variant='secondary'>
					<Link href='/next-auth/server'>next-auth/server</Link>
				</Button>
				<Button asChild variant='secondary'>
					<Link href='/next-auth/client'>next-auth/client</Link>
				</Button>
			</header>
			{children}
		</div>
	)
}
