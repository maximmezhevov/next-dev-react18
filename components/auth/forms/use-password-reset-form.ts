import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { newPasswordSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordResetAction } from '@/actions/auth'

import type { UrlWarning } from './use-login-form'

export const usePasswordResetForm = () => {
	const [isPending, setIsPending] = useState(false)
	const [isSuccess, setIsSuccess] = useState<string | undefined>(undefined)
	const [isError, setIsError] = useState<string | undefined>(undefined)

	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	// urlWarning

	const urlWarningImitResetLinkSent =
		searchParams.get('warning') === ('ImitResetLinkSent' as UrlWarning)
			? 'Имитируем: отправку email с ссылкой, в которую вшит token; получение пользователем email; переход по отправленной ссылке'
			: undefined

	const urlWarning = urlWarningImitResetLinkSent

	// form

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: { password: '', passwordDuplicate: '' },
	})

	const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
		setIsPending(true)
		setIsError(undefined)
		setIsSuccess(undefined)

		try {
			const data = await passwordResetAction(values, token)
			if (data.error) {
				setIsError(data.error)
				return
			}

			if (data.success) {
				setIsSuccess(data.success)
			}
		} finally {
			setIsPending(false)
		}
	}

	return { isPending, isError, urlWarning, isSuccess, form, onSubmit }
}
