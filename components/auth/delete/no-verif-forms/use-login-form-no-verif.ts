import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { loginSchemaNoVerif } from '@/schemas/auth'
import { loginActionNoVerif } from '@/actions/auth'

const DEFAULT_REDIRECT = '/dev/next-auth'

export const useLoginFormNoVerif = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const router = useRouter()

	const searchParams = useSearchParams()
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Электронная почта, уже используемая другим провайдером'
			: undefined
	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl ? getCallbackUrl : DEFAULT_REDIRECT

	const form = useForm<z.infer<typeof loginSchemaNoVerif>>({
		resolver: zodResolver(loginSchemaNoVerif),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof loginSchemaNoVerif>) => {
		setError(undefined)
		setSuccess(undefined)
		setIsPending(true)

		try {
			const data = await loginActionNoVerif(values)
			if (data.error) {
				setError(data.error)
				toast.error(data.error)
				return
			}

			setSuccess(data.success)
			toast.success(data.success)

			router.push(callbackUrl)
		} finally {
			setIsPending(false)
		}
	}

	return {
		error,
		success,
		urlError,
		isPending,
		form,
		onSubmit,
	}
}
