import { Metadata } from 'next'
import { ResetForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Сброс пароля',
}

export default function Reset() {
	return <ResetForm />
}
