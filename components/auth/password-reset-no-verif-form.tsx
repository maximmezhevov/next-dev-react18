'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordResetNoVerifAction } from '@/actions/auth'
import { newPasswordNoVerifSchema } from '@/schemas/auth'

import { Form, Input } from '@/components/shadcn'

export const PasswordResetNoVerifForm: React.FC = () => {
	const [isPending, startTransition] = useTransition()
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [error, setError] = useState<string | undefined>(undefined)

	const form = useForm<z.infer<typeof newPasswordNoVerifSchema>>({
		resolver: zodResolver(newPasswordNoVerifSchema),
		defaultValues: {
			email: '',
			password: '',
			passwordDuplicate: '',
		},
	})

	const onSubmit = (values: z.infer<typeof newPasswordNoVerifSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			passwordResetNoVerifAction(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)
	}

	return (
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
					<Form.Field
						control={form.control}
						name='passwordDuplicate'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>Новый пароль (еще раз)</Form.Label>
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
				<Form.Alert variant='error' message={error} />
				{success ? (
					<Form.Alert variant='success' message={success} />
				) : (
					<Form.SubmitButton
						isPending={isPending}
						label='Сохранить новый пароль'
					/>
				)}
			</form>
		</Form.Root>
	)
}
