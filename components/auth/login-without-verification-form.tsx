'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginWithoutVerificationAction } from '@/actions/auth'
import { loginSchema } from '@/schemas/auth'
import { Form, Input } from '@/components/shadcn'

import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { SubmitButton } from './submit-button'

export const LoginWithoutVerificationForm: React.FC = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const searchParams = useSearchParams()
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Электронная почта, уже используемая другим провайдером'
			: undefined

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			loginWithoutVerificationAction(values).then((data) => {
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
								<div className='inline-flex w-full items-center justify-between'>
									<Form.Label>Пароль</Form.Label>
									<Link
										href='/auth/password-reset-without-verification'
										className='text-xs text-muted-foreground hover:text-foreground'
									>
										Забыли пароль?
									</Link>
								</div>
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
				<FormError message={error || urlError} />
				<FormSuccess message={success} />
				<SubmitButton isPending={isPending} label='Войти' variant='secondary' />
			</form>
		</Form.Root>
	)
}
