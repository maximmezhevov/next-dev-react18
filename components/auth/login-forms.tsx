import { NamedSeparator } from '@/components/ui'

import { AuthCard } from './card'
import { Social } from './social'
import { LoginFormsTabs } from './login-forms-tabs'

export const LoginForms: React.FC = () => {
	return (
		<AuthCard
			headerBigLabel='NRD18'
			headerDescription='Добро пожаловать!'
			backButtonHref='/auth/register'
			backButtonLabel='Нет учетной записи?'
			classNameContent='space-y-6'
		>
			<Social />
			<NamedSeparator label='или с учетной записью' />
			<LoginFormsTabs />
		</AuthCard>
	)
}
