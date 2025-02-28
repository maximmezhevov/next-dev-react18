import { AuthCard, RegistrationForm } from '@/components/auth'
import { SuspenseSkeleton } from '@/components/ui'

export default function RegistrationPage() {
	return (
		<AuthCard
			headerTitle='Регистрация'
			footerButtonHref='/sign-in'
			footerButtonLabel='Eсть учетная запись?'
			classNameContent='space-y-6'
		>
			<SuspenseSkeleton className='h-[296px]'>
				<RegistrationForm />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
