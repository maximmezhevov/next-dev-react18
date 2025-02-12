import { Metadata } from 'next'
import { LoginNoVerifForm } from '@/components/auth'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Авторизация без email верификацией',
}

const Login = () => {
	return (
		<Suspense fallback={null}>
			<LoginNoVerifForm />
		</Suspense>
	)
}

export default Login
