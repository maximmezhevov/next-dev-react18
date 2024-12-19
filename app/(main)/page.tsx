import { ModeToggleButton } from '@/components/theme/mode-toggle'
import { Button } from '@/components/ui/shadcn/button'
import Link from 'next/link'

export default function MainPage() {
	return (
		<>
			<aside className='absolute right-4 top-4'>
				<ModeToggleButton />
			</aside>
			<main className='flex min-h-svh flex-col items-center justify-center gap-4'>
				<h1>next-dev-react18</h1>
				<nav>
					<Button asChild size='lg'>
						<Link href='/dev'>dev</Link>
					</Button>
				</nav>
			</main>
		</>
	)
}
