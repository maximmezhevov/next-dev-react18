import { LoginButton } from '@/components/auth'
import { Button } from '@/components/shadcn'
import { cn } from '@/lib'
// import { Poppins } from 'next/font/google'

// import Link from 'next/link'
// import { Container } from '@/components/ui'
// import { Button } from '@/components/shadcn'

// const poppins = Poppins({
// 	subsets: ['latin'],
// 	weight: ['600'],
// })

export default function NextAuth() {
	return (
		// <Container variant='dev'>
		// 	<main className='flex min-h-[inherit] w-full items-center justify-center'>
		// 		<Button asChild size='lg'>
		// 			<Link href='/login'>login</Link>
		// 		</Button>
		// 	</main>
		// </Container>

		<div
			className='flex h-[calc(100svh-6rem)] flex-col items-center justify-center gap-[1rem]'
			/* bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 dark:from-sky-800 dark:to-blue-950 */
		>
			<header className='text-center'>
				<h1 className='text-5xl font-black uppercase tracking-tight'>auth</h1>
				<p
					className='text-lg font-semibold tracking-tight' /* line-through decoration-2 */
				>
					next-auth
				</p>
			</header>
			<main>
				<LoginButton>
					<Button size='lg'>Sing in</Button>
				</LoginButton>
			</main>
		</div>
	)
}
