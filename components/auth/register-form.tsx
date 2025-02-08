'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerAction } from '@/actions/auth'
import { registerSchema } from '@/schemas/auth'
import { Form, Input } from '@/components/shadcn'

import { AuthCard } from './card'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { SubmitButton } from './submit-button'

export const RegisterForm: React.FC = () => {
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
			registerAction(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)
	}

	return (
		<AuthCard
			headerLabel='Registration'
			backButtonHref='/auth/login'
			backButtonLabel='Already have an account?'
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
										<Input
											{...field}
											disabled={isPending}
											type='text'
											placeholder='name'
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
									<Form.Label>Email address</Form.Label>
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
									<Form.Label>Password</Form.Label>
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
						<SubmitButton isPending={isPending} label='Create an account' />
					)}
				</form>
			</Form.Root>
		</AuthCard>
	)
}
