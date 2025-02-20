import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { resetSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetAction, resetImitAction } from '@/actions/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

import { type UrlWarning } from './use-login-form'

export type SubmitValue = 'email' | 'imit'

export const useResetForm = () => {
	const [isPending, setIsPending] = useState(false)
	const [isError, setIsError] = useState<string | undefined>(undefined)
	const [isWarning, setIsWarning] = useState<string | undefined>(undefined)

	const searchParams = useSearchParams()
	const router = useRouter()

	// urlWarning

	const urlWarningEmailSend = `warning=${'ResetLinkSent' as UrlWarning}`
	const urlWarningImitEmailSend = `warning=${'ImitResetLinkSent' as UrlWarning}`

	// callbackUrl

	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl
		? `&callbackUrl=${getCallbackUrl}` // <- &
		: ''

	// redirect

	const emailSendRedirectToUrl = `/auth/login?${urlWarningEmailSend}${callbackUrl}`
	const imitEmailSendRectToUrl = `/auth/login?${urlWarningImitEmailSend}${callbackUrl}`

	// form

	const form = useForm<z.infer<typeof resetSchema>>({
		resolver: zodResolver(resetSchema),
		defaultValues: { email: '' },
	})

	const onSubmit = async (
		values: z.infer<typeof resetSchema>,
		event?: React.BaseSyntheticEvent // TODO
	) => {
		setIsPending(true)
		setIsError(undefined)
		setIsWarning(undefined)

		if (!event) return // TODO
		const submitter = (event.nativeEvent as SubmitEvent)
			.submitter as HTMLButtonElement
		const submitValue = submitter.value as 'email' as SubmitValue

		if (submitValue === ('email' as SubmitValue)) {
			try {
				const data = await resetAction(values)
				if (data.error) {
					setIsError(data.error)
					toast.error(data.error)
					return
				}

				setIsWarning(data.warning)
				toast(data.warning)

				router.push(emailSendRedirectToUrl)
			} finally {
				setIsPending(false)
			}
		}

		if (submitValue === ('imit' as SubmitValue)) {
			try {
				const data = await resetImitAction(values)
				if (data.error) {
					setIsError(data.error)
					toast.error(data.error)
					return
				}

				// setIsWarning(data.warning)
				// toast(data.warning)

				if (data.token) {
					window.open(
						`/auth/password-reset?token=${data.token}&${urlWarningImitEmailSend}`
					)
					router.push(imitEmailSendRectToUrl)
				}
			} finally {
				setIsPending(false)
			}
		}
	}

	return { isPending, isWarning, isError, form, onSubmit }
}
