import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { newPasswordSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordResetAction } from '@/actions/auth'

export const usePasswordResetForm = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [error, setError] = useState<string | undefined>(undefined)

	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
			passwordDuplicate: '',
		},
	})

	const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			passwordResetAction(values, token).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)
	}

	return { success, error, isPending, form, onSubmit }
}
