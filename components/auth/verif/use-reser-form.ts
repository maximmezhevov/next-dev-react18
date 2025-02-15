import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { resetSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetAction } from '@/actions/auth'

export const useResetForm = () => {
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [error, setError] = useState<string | undefined>(undefined)

	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof resetSchema>>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = (values: z.infer<typeof resetSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			resetAction(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)
	}

	return { success, error, isPending, form, onSubmit }
}
