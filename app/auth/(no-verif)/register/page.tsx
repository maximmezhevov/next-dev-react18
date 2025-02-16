import { Metadata } from 'next'
import { AuthCard, RegisterFormNoVerif } from '@/components/auth'
import { SuspenseSkeleton } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Регистрация без email верификацией',
}

export default function RegisterPage() {
	return (
		<AuthCard headerTitle='Регистрация' backButtonLabel='Eсть учетная запись?'>
			<SuspenseSkeleton className='h-[280px]'>
				<RegisterFormNoVerif />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
