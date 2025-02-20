import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { registerSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginAction, registerAction } from '@/actions/auth'
import toast from 'react-hot-toast'

export const useRegisterForm = (redirectToUrlProps: string) => {
	const [isPending, setIsPending] = useState(false)
	const [isError, setIsError] = useState<string | undefined>(undefined)
	const [isSuccess, setIsSuccess] = useState<string | undefined>(undefined)

	const searchParams = useSearchParams()
	const router = useRouter()

	// callbackUrl

	const callbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined

	// redirectToUrl

	const redirectToUrl: string = callbackUrl || redirectToUrlProps

	// form

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: '', email: '', password: '' },
	})

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		setIsPending(true)
		setIsError(undefined)
		setIsSuccess(undefined)

		try {
			const registerData = await registerAction(values)
			if (registerData.error) {
				setIsError(registerData.error)
				toast.error(registerData.error)
				return
			}

			setIsSuccess(registerData.success)
			toast.success(registerData.success)

			const loginData = await loginAction(values)
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
