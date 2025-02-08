'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordResetAction } from '@/actions/auth'
import { newPasswordSchema } from '@/schemas/auth'
import { Form, Input } from '@/components/shadcn'

import { AuthCard } from './card'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { useSearchParams } from 'next/navigation'
import { SubmitButton } from './submit-button'

export const PasswordResetForm: React.FC = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const [isPending, startTransition] = useTransition()
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [error, setError] = useState<string | undefined>(undefined)

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
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

	return (
		<AuthCard
			headerLabel='Новый пароль'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<Form.Field
							control={form.control}
							name='password'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>Новый пароль</Form.Label>
									<Form.Control>
										<Input
											{...field}
											disabled={isPending}
											type='password'
											placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					</div>
					<FormError message={error} />
					{success ? (
						<FormSuccess message={success} />
					) : (
						<SubmitButton
							isPending={isPending}
							label='Сохранить новый пароль'
						/>
					)}
				</form>
			</Form.Root>
		</AuthCard>
	)
}
