import { AuthCard, ResetPasswordForm } from '@/components/auth'
import { SuspenseSkeleton } from '@/components/ui'

export default function ResetPasswordPage() {
	return (
		<AuthCard headerTitle='Сброс пароля' classNameContent='space-y-6'>
			<SuspenseSkeleton className='h-[296px]'>
				<ResetPasswordForm />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
