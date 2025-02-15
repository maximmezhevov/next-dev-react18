import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { verificationAction } from '@/actions/auth'

export const useVerification = () => {
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

	return { error, success }
}
