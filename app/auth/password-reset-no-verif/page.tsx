import { Metadata } from 'next'
import { PasswordResetNoVerifForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Сброс пароля',
}

export default function PassworResetWithoutVerification() {
	return <PasswordResetNoVerifForm />
}
