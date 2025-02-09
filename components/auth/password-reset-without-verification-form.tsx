'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordResetWithoutVerificationAction } from '@/actions/auth'
import { newPasswordWithoutVerificationSchema } from '@/schemas/auth'
import { Form, Input } from '@/components/shadcn'

import { AuthCard } from './card'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { SubmitButton } from './submit-button'

export const PassworResetWithoutVerificationForm: React.FC = () => {
	const [isPending, startTransition] = useTransition()
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [error, setError] = useState<string | undefined>(undefined)

	const form = useForm<z.infer<typeof newPasswordWithoutVerificationSchema>>({
		resolver: zodResolver(newPasswordWithoutVerificationSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (
		values: z.infer<typeof newPasswordWithoutVerificationSchema>
	) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			passwordResetWithoutVerificationAction(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)
	}

	return (
		<AuthCard
			headerLabel='Новый пароль'
			headerDescription='without verification'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<Form.Field
							control={form.control}
							name='email'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>Адрес электронной почты</Form.Label>
									<Form.Control>
										<Input
											{...field}
											disabled={isPending}
											type='email'
											placeholder='example@email.io'
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
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
