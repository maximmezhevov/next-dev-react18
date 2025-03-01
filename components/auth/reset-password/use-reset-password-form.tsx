'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '@/lib/zod/auth'
import toast from 'react-hot-toast'
import { resetPasswordAction, signInAction } from '@/actions/auth'
import { useWatchCallback } from '@/hooks'

const DEFAULE_REDIRECT = '/next-auth'

export const useResetPasswordForm = () => {
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const { callback } = useWatchCallback()

	const router = useRouter()

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: { email: '', password: '', confirmPassword: '' },
	})

	const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
		setIsPending(true)
		setError(undefined)
		setSuccess(undefined)

		try {
			const resetPasswordData = await resetPasswordAction(values)
			if (resetPasswordData.error) {
				throw Error(resetPasswordData.error)
			}

			if (resetPasswordData.success) {
				setSuccess(resetPasswordData.success)
				toast.success(resetPasswordData.success)

				try {
					const signInData = await signInAction(values)
					if (signInData.error) {
						throw new Error(signInData.error)
					}

					if (signInData.success) {
						setSuccess(signInData.success)
						toast.success(signInData.success)

						router.push(callback || DEFAULE_REDIRECT)
					}
				} catch (error) {
					throw error
				}
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

	return { isPending, error, success, form, onSubmit }
}
