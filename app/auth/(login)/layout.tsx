import { signIn } from '@/auth'
import { FaGithub } from 'react-icons/fa6'
import { AuthCard } from '@/components/auth'
import { ButtonGroupActiveMapping, NamedSeparator } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<AuthCard
			headerBigLabel='NRD18'
			headerDescription='Добро пожаловать!'
			backButtonHref='/auth/register'
			backButtonLabel='Нет учетной записи?'
			classNameContent='space-y-6'
		>
			<form
				action={async () => {
					'use server'
					await signIn('github', { redirectTo: '/dev/next-auth' })
				}}
			>
				<Button type='submit' className='w-full'>
					<FaGithub /> Продолжить с GitHub
				</Button>
			</form>
			<NamedSeparator label='или с учетной записью' />
			<ButtonGroupActiveMapping
				// prettier-ignore
				paths={[
					{ href: '/auth/login', label: 'Авторизация без email верификацией' },
					{ href: '/auth/login-verif', label: 'Авторизация с email верификацией *' }
				]}
				className='border p-1.5'
			/>
			{children}
		</AuthCard>
	)
}
