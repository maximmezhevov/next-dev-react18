import { AuthCard } from '@/components/auth'
import { ButtonGroupActiveMapping } from '@/components/ui'

export default function RegisterLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<AuthCard
			headerLabel='Регистрация'
			backButtonHref='/auth/login'
			backButtonLabel='Eсть учетная запись?'
			classNameContent='space-y-6'
		>
			<ButtonGroupActiveMapping
				// prettier-ignore
				paths={[
					{ href: '/auth/register', label: 'Регистрация без email верификацией' },
					{ href: '/auth/register-verif', label: 'Регистрация с email верификацией *' }
				]}
				className='border p-1.5'
			/>
			{children}
		</AuthCard>
	)
}
