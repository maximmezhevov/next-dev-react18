'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerNoVerifAction } from '@/actions/auth'
import { registerSchema } from '@/schemas/auth'

import { Form, Input } from '@/components/shadcn'

export const RegisterNoVerifForm: React.FC = () => {
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
			registerNoVerifAction(values).then((data) => {
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
								<Form.Label>Полное имя</Form.Label>
								<Form.Control>
									<Input
										{...field}
										disabled={isPending}
										type='text'
										placeholder='Максим М'
										className='placeholder:text-muted-foreground/50'
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
								<Form.Label>Адрес электронной почты</Form.Label>
								<Form.Control>
									<Input
										{...field}
										disabled={isPending}
										type='email'
										placeholder='example@email.com'
										className='placeholder:text-muted-foreground/50'
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
										disabled={isPending}
										type='password'
										placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
										className='placeholder:text-muted-foreground/50'
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
						label='Создать учетную запись'
					/>
				)}
			</form>
		</Form.Root>
	)
}
