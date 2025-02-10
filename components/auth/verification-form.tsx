'use client'

import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { AuthCard } from './card'
import { useCallback, useEffect, useState } from 'react'
import { verificationAction } from '@/actions/auth'
import { FormSuccess } from './form-success'
import { FormError } from './form-error'

export const VerificationForm: React.FC = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const onSubmit = useCallback(() => {
		if (error || success) return

		if (!token) {
			setError('missing token')
			return
		}
		verificationAction(token)
			.then((data) => {
				setSuccess(data.success)
				setError(data.error)
			})
			.catch(() => {
				setError('Что то пошло не так')
			})
	}, [error, success, token])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<AuthCard
			headerLabel='Верификация'
			backButtonLabel='Вернуться к авторизации'
			backButtonHref='/auth/login'
		>
			<div className='flex w-full flex-col items-center justify-center gap-4'>
				{!error && !success && (
					<div>
						<Loader2 className='size-10 animate-spin' />
					</div>
				)}
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</AuthCard>
	)
}
