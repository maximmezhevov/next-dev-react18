'use client'

import { useSession } from 'next-auth/react'

import { SignOutClientButton } from '@/components/auth'
import { ButtonAddCallback } from '@/components/shared'

export default function NextAuthServerPage() {
	const { data: session } = useSession()

	return (
		<main className='space-y-6 text-center'>
			<h1>next-auth/client (useSession)</h1>

			<div className='flex flex-wrap items-center justify-center gap-1'>
				{!session ? (
					<ButtonAddCallback href='/sign-in' size='lg'>
						Войти
					</ButtonAddCallback>
				) : (
					<SignOutClientButton variant='secondary' wrap />
				)}
			</div>

			<div className='text-sm'>
				<span className='font-mono'>session:</span>{' '}
				<code className='break-all'>{JSON.stringify(session)}</code>
			</div>
		</main>
	)
}
