import Link from 'next/link'
import { Container } from '@/components/ui'
import { Button } from '@/components/shadcn/button'

export default function NextAuth() {
	return (
		<Container variant='dev_layout'>
			<main className='flex min-h-[inherit] w-full items-center justify-center'>
				<Button asChild size='lg'>
					<Link href='/login'>login</Link>
				</Button>
			</main>
		</Container>
	)
}
