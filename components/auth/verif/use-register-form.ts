import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { registerSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerAction } from '@/actions/auth'

export const useRegisterForm = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof registerSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			registerAction(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)
	}

	return { error, success, isPending, form, onSubmit }
}
