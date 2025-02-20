import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { resetSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetAction } from '@/actions/auth'
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

	// callbackUrl

	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl
		? `&callbackUrl=${getCallbackUrl}` // <- &
		: ''

	// url

	const urlWarn = `warning=${'ResetLinkSent' as UrlWarning}`

	const redirectToUrl: string = `/auth/login?${urlWarn}${callbackUrl}`

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

		if (submitValue === ('imit' as SubmitValue)) {
			// TODO
			setIsPending(false)
			return alert('TODO!')
		}

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

				router.push(redirectToUrl)
			} finally {
				setIsPending(false)
			}
		}
	}

	return { isPending, isWarning, isError, form, onSubmit }
}
