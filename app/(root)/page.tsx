import Link from 'next/link'
import { Button } from '@/components/ui'

export default function RootPage() {
	return (
		<main>
			<Button asChild variant='secondary'>
				<Link href='/next-auth'>next-auth</Link>
			</Button>
		</main>
	)
}
