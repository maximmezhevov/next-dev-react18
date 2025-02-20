import { Metadata } from 'next'
import { AuthCard, LoginFormNoVerif, OAuth } from '@/components/auth'
import { NamedSeparator, SuspenseSkeleton } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Авторизация без email верификацией',
}

export default function LoginPage() {
	return (
		<AuthCard
			backButtonHref='/auth/register'
			backButtonLabel='Нет учетной записи?'
			classNameContent='space-y-6 pt-6'
		>
			<header className='text-center'>
				<h1 className='text-5xl font-black uppercase tracking-tight'>NRD18</h1>
				<p className='text-sm text-muted-foreground'>Добро пожаловать!</p>
			</header>

			{/* <OAuthServer provider='github' />
				<OAuthClient provider='github' /> */}

			<SuspenseSkeleton className='h-10'>
				<OAuth provider='github' />
			</SuspenseSkeleton>

			<NamedSeparator label='или с учетной записью' />

			<SuspenseSkeleton className='h-[216px]'>
				<LoginFormNoVerif />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
