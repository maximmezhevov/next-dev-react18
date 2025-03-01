'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWatchCallback } from '@/hooks'
import { registrationSchema } from '@/lib/zod/auth'
import { registrationAction, signInAction } from '@/actions/auth'

const DEFAULE_REDIRECT = '/sign-in'

export const useRegistrationForm = () => {
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const { callback } = useWatchCallback()

	const router = useRouter()

	const form = useForm<z.infer<typeof registrationSchema>>({
		resolver: zodResolver(registrationSchema),
		defaultValues: { name: '', email: '', password: '' },
	})

	const onSubmit = async (values: z.infer<typeof registrationSchema>) => {
		setIsPending(true)
		setError(undefined)
		setSuccess(undefined)

		try {
			const registrationData = await registrationAction(values)
			if (registrationData.error) {
				throw Error(registrationData.error)
			}

			if (registrationData.success) {
				setSuccess(registrationData.success)
				toast.success(registrationData.success)

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
