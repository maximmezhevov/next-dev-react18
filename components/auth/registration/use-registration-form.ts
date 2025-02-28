'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWatchCallback } from '@/hooks'
import { registrationSchema } from '@/lib/zod/auth'
import { registrationAction } from '@/actions/auth'

const DEFAULE_REDIRECT = '/next-auth'

export const useRegistrationForm = () => {
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const router = useRouter()

	const { callback } = useWatchCallback()

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

				router.push(callback || DEFAULE_REDIRECT)
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message)
				console.log('Error', error)
				return setError(error.message)
			} else {
				toast.error('An unknown error occurred!')
				console.log('Unknown error occurred:', error)
				return setError('An unknown error occurred!')
			}
		} finally {
			setIsPending(false)
		}
	}

	return { isPending, error, success, form, onSubmit }
}
