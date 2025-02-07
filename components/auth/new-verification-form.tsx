'use client'

import { useSearchParams } from 'next/navigation'
import { AuthCard } from './card'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/auth'
import { FormSuccess } from './form-success'
import { FormError } from './form-error'

export const NewVerificationForm = () => {
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
		newVerification(token)
			.then((data) => {
				setSuccess(data.success)
				setError(data.error)
			})
			.catch(() => {
				setError('something weng wrong')
			})
	}, [error, success, token])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<AuthCard
			headerLabel='Верификация' // confirm you verification
			backButtonLabel='вернуться к авторизации ' // back to logins
			backButtonHref='/auth/login'
		>
			<div className='flex flex-col items-center justify-center gap-4'>
				<div className='font-mono text-xs leading-8'>{token}</div>
				{!error && !success && <div>сделать спинер</div>}
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</AuthCard>
	)
}
