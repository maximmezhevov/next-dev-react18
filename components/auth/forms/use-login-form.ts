import type { AuthError } from 'next-auth'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/auth'
import { loginAction } from '@/actions/auth'
import toast from 'react-hot-toast'

export type UrlWarning = 'ResetLinkSent'

export const useLoginForm = (redirectToUrlProps: string) => {
	const [isPending, setIsPending] = useState(false)
	const [isError, setIsError] = useState<string | undefined>(undefined)
	const [isSuccess, setIsSuccess] = useState<string | undefined>(undefined)
	const [showTwoFactor, setShowTwoFactor] = useState(false)

	const searchParams = useSearchParams()
	const router = useRouter()

	// urlError usrWarn

	// TODO // при ошибке теряется callbackUrl
	const urlError =
		searchParams.get('error') === ('OAuthAccountNotLinked' as AuthError['type'])
			? 'Электронная почта уже используемая другим провайдером'
			: undefined

	const urlWarning =
		searchParams.get('warning') === ('ResetLinkSent' as UrlWarning)
			? 'Ссылка для смены пароля была отправлена на электронную почту. Если вы уже изменили пароль, авторизуйтесь повторно'
			: undefined

	// callbackUrl

	const callbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined

	// redirectToUrl

	const redirectToUrl: string = callbackUrl || redirectToUrlProps

	// form

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '', twoFactorCode: '' },
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setIsPending(true)
		setIsError(undefined)
		setIsSuccess(undefined)

		try {
			const data = await loginAction(values)
			if (data.error) {
				setIsError(data.error)
				toast.error(data.error)
				return
			}

			if (data.success) {
				setIsSuccess(data.success)
				toast.success(data.success)
			}

			if (data.showtwoFactor) {
				setShowTwoFactor(true)
			}

			if (data.redirect) {
				router.push(redirectToUrl)
			}
		} finally {
			setIsPending(false)
		}
	}

	return {
		isPending,
		isError,
		urlError,
		urlWarning,
		isSuccess,
		showTwoFactor,
		form,
		onSubmit,
	}
}
