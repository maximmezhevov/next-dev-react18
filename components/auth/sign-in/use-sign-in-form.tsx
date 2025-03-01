'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/lib/zod/auth'
import { signInAction } from '@/actions/auth'
import toast from 'react-hot-toast'
import { useWatchCallback } from '@/hooks'

const DEFAULE_REDIRECT = '/next-auth'

export const useSignInForm = () => {
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const { callback } = useWatchCallback()

	const router = useRouter()

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: { email: '', password: '' },
	})

	const onSubmit = async (values: z.infer<typeof signInSchema>) => {
		setIsPending(true)
		setError(undefined)
		setSuccess(undefined)

		try {
			const data = await signInAction(values)
			if (data.error) {
				throw new Error(data.error)
			}

			if (data.success) {
				setSuccess(data.success)
				toast.success(data.success)

				router.push(callback || DEFAULE_REDIRECT)
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
				toast.error(error.message)
				console.log('Ошибка:', error)
			} else {
				setError('Что-то пошло не так (Неизвестная ошибка)!')
				toast.error('Что-то пошло не так (Неизвестная ошибка)!')
				console.log('Неизвестная ошибка:', error)
			}
		} finally {
			setIsPending(false)
		}
	}

	return {
		isPending,
		error,
		success,
		form,
		onSubmit,
	}
}
