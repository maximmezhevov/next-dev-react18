import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/auth'
import { loginAction } from '@/actions/auth'

export const useLoginForm = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)

	const [isPending, startTransition] = useTransition()

	const searchParams = useSearchParams()
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Электронная почта уже используемая другим провайдером'
			: undefined
	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl ? getCallbackUrl : '/'

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			twoFactorCode: '',
		},
	})

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		setError(undefined)
		setSuccess(undefined)

		startTransition(() =>
			loginAction(values, callbackUrl).then((data) => {
				if (data.error) {
					form.reset()
					setError(data.error)
				}
				if (data.success) {
					form.reset()
					setSuccess(data.success)
				}
				if (data.twoFactor) {
					setShowTwoFactor(true)
				}
			})
		)
	}

	return {
		error,
		success,
		showTwoFactor,
		urlError,
		isPending,
		form,
		onSubmit,
	}
}
