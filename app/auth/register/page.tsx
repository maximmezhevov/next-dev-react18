import { Metadata } from 'next'
import { RegisterForms } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Регистрация',
}

export default function Register() {
	return <RegisterForms />
}
