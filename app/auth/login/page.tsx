import { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Авторизация',
}

export default function Login() {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	)
}
