import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { newPasswordSchemaNoVerif } from '@/schemas/auth'
import toast from 'react-hot-toast'
import { loginActionNoVerif, passwordResetActionNoVerif } from '@/actions/auth'

export const usePasswordResetFormNoVerif = (redirectToUrlProps: string) => {
	const [isPending, setIsPending] = useState(false)
	const [isError, setIsError] = useState<string | undefined>(undefined)
	const [isSuccess, setIsSuccess] = useState<string | undefined>(undefined)

	const searchParams = useSearchParams()
	const router = useRouter()

	// callbackUrl

	const callbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined

	// redirectUrl

	const redirectToUrl: string = callbackUrl || redirectToUrlProps

	// form

	const form = useForm<z.infer<typeof newPasswordSchemaNoVerif>>({
		resolver: zodResolver(newPasswordSchemaNoVerif),
		defaultValues: { email: '', password: '', passwordDuplicate: '' },
	})

	const onSubmit = async (values: z.infer<typeof newPasswordSchemaNoVerif>) => {
		setIsPending(true)
		setIsError(undefined)
		setIsSuccess(undefined)

		try {
			const resetData = await passwordResetActionNoVerif(values)
			if (resetData.error) {
				setIsError(resetData.error)
				toast.error(resetData.error)
				return
			}

			setIsSuccess(resetData.success)
			toast.success(resetData.success)

			const loginData = await loginActionNoVerif(values)
			if (loginData.error) {
				setIsError(loginData.error)
				toast.error(loginData.error)
				return
			}

			setIsSuccess(loginData.success)
			toast.success(loginData.success)

			router.push(redirectToUrl)
		} finally {
			setIsPending(false)
		}
	}

	return { isPending, isError, isSuccess, form, onSubmit }
}
