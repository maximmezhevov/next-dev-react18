import { Metadata } from 'next'
import { AuthCard, RegisterForm } from '@/components/auth'
import { SuspenseSkeleton } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Регистрация',
}

export default function RegisterVerifPage() {
	return (
		<AuthCard
			headerTitle='Регистрация'
			backButtonHref='/auth/login'
			backButtonLabel='Eсть учетная запись?'
		>
			<SuspenseSkeleton className='h-[300px]'>
				<RegisterForm redirectToUrl='/dev/next-auth' />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
