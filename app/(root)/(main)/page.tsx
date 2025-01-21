import { Button } from '@/components/shadcn/button'
import Link from 'next/link'

export default function Main() {
	return (
		<main className='flex h-svh items-center justify-center'>
			<Button asChild size='lg'>
				<Link href='/dev'>dev</Link>
			</Button>
		</main>
	)
}
