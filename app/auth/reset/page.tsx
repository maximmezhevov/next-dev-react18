import { Metadata } from 'next'
import { AuthCard, ResetForm } from '@/components/auth'
import { SuspenseSkeleton } from '@/components/ui'

// import { PasswordResetFormNoVerif } from '@/components/auth'
// import { NamedSeparator } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

export default function ResetPage() {
	return (
		<AuthCard
			headerTitle='Сбросить пароль?'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
			// classNameContent='space-y-6'
		>
			<SuspenseSkeleton className='h-[206px]'>
				<ResetForm />
			</SuspenseSkeleton>

			{/* <NamedSeparator label='или' />

			<SuspenseSkeleton className='h-[300px]'>
				<PasswordResetFormNoVerif redirectToUrl='/dev/next-auth' />
			</SuspenseSkeleton> */}
		</AuthCard>
	)
}
