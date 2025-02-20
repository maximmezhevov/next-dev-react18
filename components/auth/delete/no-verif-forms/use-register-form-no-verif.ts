import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { registerSchemaNoVerif } from '@/schemas/auth'
import { loginActionNoVerif, registerActionNoVerif } from '@/actions/auth'

const DEFAULT_REDIRECT = '/dev/next-auth'

export const useRegisterFormNoVerif = ({ login }: { login?: boolean }) => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const router = useRouter()

	const searchParams = useSearchParams()
	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl ? getCallbackUrl : DEFAULT_REDIRECT

	const form = useForm<z.infer<typeof registerSchemaNoVerif>>({
		resolver: zodResolver(registerSchemaNoVerif),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof registerSchemaNoVerif>) => {
		setError(undefined)
		setSuccess(undefined)
		setIsPending(true)

		try {
			const registerData = await registerActionNoVerif(values)
			if (registerData.error) {
				setError(registerData.error)
				toast.error(registerData.error)
				return
			}

			setSuccess(registerData.success)
			toast.success(registerData.success)

			if (login) {
				const loginData = await loginActionNoVerif(values)
				if (loginData.error) {
					setError(loginData.error)
					toast.error(loginData.error)
					return
				}

				setSuccess(loginData.success)
				toast.success(loginData.success)
			}

			router.push(callbackUrl)
		} finally {
			setIsPending(false)
		}
	}

	return { error, success, isPending, form, onSubmit }
}
