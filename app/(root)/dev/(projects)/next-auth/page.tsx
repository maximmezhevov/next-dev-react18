import Link from 'next/link'
// import { LoginButton } from '@/components/auth'
import { Container, Header } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default function NextAuth() {
	return (
		<Container variant='dev'>
			<main
				className='flex min-h-[inherit] flex-col items-center gap-[3rem] pt-[3rem]'
				/* bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 dark:from-sky-800 dark:to-blue-950 */
			>
				<Header.Root>
					<Header.Title>auth</Header.Title>
					<Header.Description>next-auth</Header.Description>
				</Header.Root>
				<section>
					<div className='inline-flex items-center gap-1'>
						{/* <LoginButton>
						<Button>Sing in</Button>
					</LoginButton> */}
						<Button asChild>
							<Link href='/auth/login'>Sing in</Link>
						</Button>
						<Button asChild variant='secondary'>
							<Link href='/auth/register'>Register</Link>
						</Button>
					</div>
				</section>
			</main>
		</Container>
	)
}
