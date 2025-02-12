'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { resetAction } from '@/actions/auth'
import { resetSchema } from '@/schemas/auth'

import { Form, Input } from '@/components/shadcn'

export const ResetForm: React.FC = () => {
	const [isPending, startTransition] = useTransition()
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [error, setError] = useState<string | undefined>(undefined)

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
										placeholder='example@email.com'
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
						label='Отправить ссылку для сброса пароля'
					/>
				)}
			</form>
		</Form.Root>
	)
}
