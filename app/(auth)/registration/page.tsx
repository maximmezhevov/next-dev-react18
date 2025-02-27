import { AuthCard, RegistrationForm } from '@/components/auth'

export default function RegistrationPage() {
	return (
		<AuthCard
			headerTitle='Регистрация'
			footerButtonHref='/sign-in'
			footerButtonLabel='Eсть учетная запись?'
			classNameContent='space-y-6'
		>
			<RegistrationForm />
		</AuthCard>
	)
}
