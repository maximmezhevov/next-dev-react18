import Link from 'next/link'
import { Button } from '@/components/shadcn/button'

export default function NextAuth() {
	return (
		<main className='flex h-svh w-full items-center justify-center'>
			<Button asChild size='lg'>
				<Link href='/login'>login</Link>
			</Button>
		</main>
	)
}
