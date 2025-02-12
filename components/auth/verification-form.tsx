'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { verificationAction } from '@/actions/auth'
import { Alert } from '@/components/ui'

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
		<div className='flex w-full flex-col items-center justify-center gap-4'>
			{!error && !success && (
				<div>
					<Loader2 className='size-10 animate-spin' />
				</div>
			)}
			{!success && <Alert variant='error' message={error} />}
			<Alert variant='success' message={success} />
		</div>
	)
}
