import { Metadata } from 'next'
import { LoginForms } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Авторизация',
}

export default function Login() {
	return <LoginForms />
}
