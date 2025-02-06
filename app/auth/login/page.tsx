import { Suspense } from 'react'
import { LoginForm } from '@/components/auth'

export default function Login() {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	)
}
