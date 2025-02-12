import { Metadata } from 'next'
import { DevRegisterNoVerifForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'exp-register',
}

const DevRegister = () => {
	return <DevRegisterNoVerifForm />
}

export default DevRegister
