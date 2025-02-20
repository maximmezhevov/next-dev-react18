import { Metadata } from 'next'
import { AuthCard, PasswordResetForm } from '@/components/auth'
import { SuspenseSkeleton } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

export default function PasswordResetPage() {
	return (
		<AuthCard headerTitle='Сброс пароля'>
			<SuspenseSkeleton className='h-[216px]'>
				<PasswordResetForm />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
