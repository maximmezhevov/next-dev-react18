'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/actions/auth'
import { LoginSchema } from '@/schemas'
import { AuthCard } from './card'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { Button, Form, Input } from '@/components/shadcn'

export const LoginForm: React.FC = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: 'example@email.com',
			password: '123',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			login(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)

		/* axios.post('.../api/...', values).then{}... */
	}

	return (
		<AuthCard
			headerLabel='Login'
			headerDescription='Welcome back'
			backButtonHref='/auht/register'
			backButtonLabel='Dont have an account?'
			showSocial
		>
			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<Form.Field
							control={form.control}
							name='email'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>email</Form.Label>
									<Form.Control>
										<Input
											{...field}
											disabled={isPending}
											type='Email'
											placeholder='example@email.com'
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
									<Form.Label>password</Form.Label>
									<Form.Control>
										<Input
											{...field}
											disabled={isPending}
											type='password'
											placeholder='******'
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type='submit' className='w-full'>
						Login
					</Button>
				</form>
			</Form.Root>
		</AuthCard>
	)
}
