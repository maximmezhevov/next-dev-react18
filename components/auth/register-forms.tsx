import { AuthCard } from './card'
import { RegisterFormsTabs } from './register-forms-tabs'

export const RegisterForms: React.FC = () => {
	return (
		<AuthCard
			headerLabel='Регистрация'
			backButtonHref='/auth/login'
			backButtonLabel='Eсть учетная запись?'
		>
			<RegisterFormsTabs />
		</AuthCard>
	)
}
