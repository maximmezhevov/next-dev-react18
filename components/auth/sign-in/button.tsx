'use client'

import { Button } from '@/components/ui'
import { signInAction } from '@/actions/auth'

export const SignInButton = () => {
	const handleSignIn = async () => {
		await signInAction({
			email: 'example@email.com',
			password: '123',
		})
	}

	return (
		<Button onClick={handleSignIn} variant='secondary'>
			Sign-in
		</Button>
	)
}
