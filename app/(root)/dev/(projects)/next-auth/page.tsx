import { auth, signOut } from '@/auth'
import { AddCallbackUrlButton, Container, Header } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default async function NextAuth() {
	const session = await auth()
	return (
		<Container variant='dev'>
			<main className='flex min-h-[inherit] flex-col items-center gap-[3rem] pt-[3rem]'>
				<Header.Root>
					<Header.Title>auth</Header.Title>
					<Header.Description>next-auth</Header.Description>
				</Header.Root>

				<section>
					<div className='inline-flex items-center gap-1'>
						{!session ? (
							<>
								<AddCallbackUrlButton href='/auth/login'>
									Авторизация
								</AddCallbackUrlButton>
								<AddCallbackUrlButton href='/auth/register' variant='secondary'>
									Регистрация
								</AddCallbackUrlButton>
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
				</section>
			</main>
		</Container>
	)
}
