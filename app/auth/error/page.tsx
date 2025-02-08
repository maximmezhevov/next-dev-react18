import { Metadata } from 'next'
import { ErrorCard } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Что-то пошло не так',
}

export default function AuthError() {
	return <ErrorCard />
}
