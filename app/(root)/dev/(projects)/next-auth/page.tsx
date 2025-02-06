import Link from 'next/link'
// import { LoginButton } from '@/components/auth'
import { Container, Header } from '@/components/ui'
import { Button } from '@/components/shadcn'
import { auth, signOut } from '@/auth'

export default async function NextAuth() {
	const session = await auth()
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
						{!session ? (
							<>
								{/* <LoginButton>
									<Button>Sing in</Button>
								</LoginButton> */}
								<Button asChild>
									<Link href='/auth/login'>Sing-in</Link>
								</Button>
								<Button asChild variant='secondary'>
									<Link href='/auth/register'>Registration</Link>
								</Button>
							</>
						) : (
							<form
								action={async () => {
									'use server'
									await signOut()
								}}
							>
								<Button type='submit'>Sing-out</Button>
							</form>
						)}
					</div>
				</section>
				<section className='w-full space-y-[1rem] px-[3rem]'>
					<div className='break-all font-mono text-xs'>
						{JSON.stringify(session)}
					</div>
					<div>...</div>
				</section>
			</main>
		</Container>
	)
}
