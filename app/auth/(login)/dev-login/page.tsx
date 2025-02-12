import { Metadata } from 'next'
import { DevLoginNoVerifForm } from '@/components/auth'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'exp-login',
}

const DevLogin = () => {
	return (
		<Suspense fallback={null}>
			<DevLoginNoVerifForm />
		</Suspense>
	)
}

export default DevLogin
