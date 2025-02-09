'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerWithVerificationAction } from '@/actions/auth'
import { registerSchema } from '@/schemas/auth'
import { cn } from '@/lib'
import { Form, Input } from '@/components/shadcn'

import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { SubmitButton } from './submit-button'

export const RegisterWithVerificationForm: React.FC<{ disabled?: boolean }> = ({
	disabled,
}) => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

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
			registerWithVerificationAction(values).then((data) => {
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
						name='name'
						render={({ field }) => (
							<Form.Item>
								<Form.Label
									className={cn(disabled && 'pointer-events-none opacity-50')}
								>
									имя
								</Form.Label>
								<Form.Control>
									<Input
										{...field}
										disabled={isPending || disabled}
										type='text'
										placeholder='Имя'
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>
					<Form.Field
						control={form.control}
						name='email'
						render={({ field }) => (
							<Form.Item>
								<Form.Label
									className={cn(disabled && 'pointer-events-none opacity-50')}
								>
									Адрес электронной почты
								</Form.Label>
								<Form.Control>
									<Input
										{...field}
										disabled={isPending || disabled}
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
								<Form.Label>Пароль</Form.Label>
								<Form.Control>
									<Input
										{...field}
										disabled={isPending || disabled}
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
						disabled={disabled}
						label='Создать учетную запись'
					/>
				)}
			</form>
		</Form.Root>
	)
}
