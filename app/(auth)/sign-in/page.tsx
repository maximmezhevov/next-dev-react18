import { SignInForm, OAuthServerActionButton, AuthCard } from '@/components/auth'
import { NamedSeparator, SuspenseSkeleton } from '@/components/ui'

export default function SignIsPage() {
	return (
		<AuthCard
			headerTitle='Авторизация'
			footerButtonHref='/registration'
			footerButtonLabel='Нет учетной записи?'
			classNameContent='space-y-6'
		>
			<div className='space-y-1'>
				<SuspenseSkeleton className='h-9'>
					<OAuthServerActionButton provider='github' className='w-full'>
						Продолжить с GitHub
					</OAuthServerActionButton>
				</SuspenseSkeleton>
			</div>

			<NamedSeparator text='или с учетной записью' />

			<SuspenseSkeleton className='h-[212px]'>
				<SignInForm />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
