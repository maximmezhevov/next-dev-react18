import { Metadata } from 'next'
import { AuthCard, PasswordResetFormNoVerif } from '@/components/auth'
import { SuspenseSkeleton } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

export default function PassworResetNoVerifPage() {
	return (
		<AuthCard
			headerTitle='Сброс пароля'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<SuspenseSkeleton className='h-[300px] w-full'>
				<PasswordResetFormNoVerif />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
