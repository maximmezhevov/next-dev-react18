import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { newPasswordSchemaNoVerif } from '@/schemas/auth'
import toast from 'react-hot-toast'
import { loginActionNoVerif, passwordResetActionNoVerif } from '@/actions/auth'

export const usePasswordResetFormNoVerif = ({ login }: { login?: boolean }) => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const router = useRouter()

	const callbackUrl = login ? '/dev/next-auth' : '/auth/login'

	const form = useForm<z.infer<typeof newPasswordSchemaNoVerif>>({
		resolver: zodResolver(newPasswordSchemaNoVerif),
		defaultValues: {
			email: '',
			password: '',
			passwordDuplicate: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof newPasswordSchemaNoVerif>) => {
		setError(undefined)
		setSuccess(undefined)
		setIsPending(true)

		try {
			const resetData = await passwordResetActionNoVerif(values)
			if (resetData.error) {
				setError(resetData.error)
				toast.error(resetData.error)
				return
			}

			setSuccess(resetData.success)
			toast.success(resetData.success)

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
