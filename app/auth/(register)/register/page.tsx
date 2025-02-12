import { Metadata } from 'next'
import { RegisterNoVerifForm } from '@/components/auth/register-no-verif-form'

export const metadata: Metadata = {
	title: 'Регистрация без email верификацией',
}

const Register = () => {
	return <RegisterNoVerifForm />
}

export default Register
