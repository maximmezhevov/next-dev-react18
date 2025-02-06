'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { register } from '@/actions/auth'
import { RegisterSchema } from '@/schemas/auth'
import { AuthCard } from './card'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { Button, Form, Input } from '@/components/shadcn'

export const RegisterForm: React.FC = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: 'name',
			email: 'example@email.com',
			password: '123',
		},
	})

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			register(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)

		/* axios.post('.../api/...', values).then{}... */
	}

	return (
		<AuthCard
			headerLabel='Registration'
			headerDescription='Create an accout'
			backButtonHref='/auth/login'
			backButtonLabel='Already have an account?'
			showSocial={false}
		>
			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<Form.Field
							control={form.control}
							name='name'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>Name</Form.Label>
									<Form.Control>
										<Input {...field} disabled={isPending} placeholder='name' />
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
									<Form.Label>Password</Form.Label>
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
						Create an account
					</Button>
				</form>
			</Form.Root>
		</AuthCard>
	)
}
