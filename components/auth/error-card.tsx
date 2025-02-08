'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/shadcn'
import { AuthCard } from './card'

export const ErrorCard: React.FC = () => {
	const router = useRouter()
	return (
		<AuthCard
			headerLabel='Что-то пошло не так'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<Button onClick={() => router.back()} className='w-full'>
				Вернуться назад
			</Button>
		</AuthCard>
	)
}
