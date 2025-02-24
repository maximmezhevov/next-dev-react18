import Link from 'next/link'
import { auth, signOut } from '@/lib/auth'
import { Button } from '@/components/ui'
import { SignOutSrverActionButton } from '@/components/auth'

export default async function NextAuthServerPage() {
	const session = await auth()

	const handleSignOutServer = async () => {
		'use server'
		await signOut()
	}

	return (
		<main className='space-y-6 text-center'>
			<h1>next-auth/server</h1>

			<div className='flex items-center justify-center gap-1'>
				{!session ? (
					<Button asChild size='lg'>
						<Link href={`/sign-in?callbackUrl=/next-auth/server`}>Sign-in</Link>
					</Button>
				) : (
					<>
						<form action={handleSignOutServer}>
							<Button type='submit' variant='secondary'>
								Sign-out (server)
							</Button>
						</form>
						<SignOutSrverActionButton variant='secondary' />
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
