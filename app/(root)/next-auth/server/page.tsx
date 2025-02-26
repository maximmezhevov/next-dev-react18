import { auth } from '@/lib/auth'
import { SignOutServerRefreshButton, SignOutServerReloadButton } from '@/components/auth'
import { ButtonAddCallback } from '@/components/ui'

export default async function NextAuthServerPage() {
	const session = await auth()

	return (
		<main className='space-y-6 text-center'>
			<h1>next-auth/server</h1>

			<div className='flex flex-wrap items-center justify-center gap-1'>
				{!session ? (
					<ButtonAddCallback href='/sign-in' size='lg'>
						Войти
					</ButtonAddCallback>
				) : (
					<>
						<SignOutServerRefreshButton variant='secondary' wrap />
						<SignOutServerReloadButton variant='secondary' wrap />
					</>
				)}
			</div>

			<div className='text-sm'>
				<span className='font-mono'>session:</span>{' '}
				<code className='break-all'>{JSON.stringify(session)}</code>
			</div>
		</main>
	)
}
