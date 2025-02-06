'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/actions/auth'
import { LoginSchema } from '@/schemas/auth'
import { AuthCard } from './card'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { Button, Form, Input } from '@/components/shadcn'

export const LoginForm: React.FC = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

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
			headerLabel='Sign-in'
			headerDescription='Welcome back'
			backButtonHref='/auth/register'
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
									<Form.Label>Email address</Form.Label>
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
									<div className='inline-flex w-full items-center justify-between'>
										<Form.Label>Password</Form.Label>
										<Link
											href='#forgot-password'
											className='text-xs text-muted-foreground hover:text-foreground'
										>
											Forgot password?
										</Link>
									</div>
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
						Sign-in
					</Button>
				</form>
			</Form.Root>
		</AuthCard>
	)
}
