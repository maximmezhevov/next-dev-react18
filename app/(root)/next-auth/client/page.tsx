'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { SignOutClientButton } from '@/components/auth'
import { Button } from '@/components/ui'

export default function NextAuthServerPage() {
	const { data: session } = useSession()

	const handleSignOutClient = async () => {
		await signOut()
	}

	return (
		<main className='space-y-6 text-center'>
			<h1>next-auth/client</h1>

			<div className='flex items-center justify-center gap-1'>
				{!session ? (
					<Button asChild size='lg'>
						<Link href={`/sign-in?callbackUrl=/next-auth/client`}>Sign-in</Link>
					</Button>
				) : (
					<>
						<Button onClick={handleSignOutClient} variant='secondary'>
							Sign-out (client)
						</Button>
						<SignOutClientButton variant='secondary' />
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
