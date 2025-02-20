import { auth, signOut } from '@/auth'
import { AddCallbackUrlButton } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default async function NextAuth() {
	const session = await auth()
	return (
		<main className='space-y-6'>
			{!session ? <SignIn /> : <SignOut />}
			{session && (
				<div className='font-mono text-xs'>
					<span>session:</span>{' '}
					<code className='break-all'>{JSON.stringify(session)}</code>
				</div>
			)}
		</main>
	)
}

const SignIn: React.FC = () => {
	return (
		<div className='flex items-center justify-center gap-1'>
			<AddCallbackUrlButton href='/auth/login' label='Aвторизация' />
			<AddCallbackUrlButton
				href='/auth/register'
				label='Регистрация'
				variant='secondary'
			/>
		</div>
	)
}
const SignOut: React.FC = () => {
	return (
		<form
			action={async () => {
				'use server'
				await signOut()
			}}
		>
			<Button type='submit' variant='secondary' size='32'>
				sign-out (server)
			</Button>
		</form>
	)
}
