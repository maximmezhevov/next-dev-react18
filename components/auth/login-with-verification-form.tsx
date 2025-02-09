'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginWithVerificationAction } from '@/actions/auth'
import { loginSchema } from '@/schemas/auth'
import { cn } from '@/lib'
import { Form, Input } from '@/components/shadcn'

import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { SubmitButton } from './submit-button'

export const LoginWithVerificationForm: React.FC<{ disabled?: boolean }> = ({
	disabled,
}) => {
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
			loginWithVerificationAction(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)

		/* axios.post('.../api/...', values).then{}... */
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
										className='disabled:cursor-default'
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
									<Form.Label
										className={cn(disabled && 'pointer-events-none opacity-50')}
									>
										Пароль
									</Form.Label>
									<Link
										href='/auth/reset'
										tabIndex={disabled ? -1 : 0}
										className={cn(
											'text-xs text-muted-foreground hover:text-foreground',
											disabled && 'pointer-events-none opacity-50'
										)}
									>
										Забыли пароль?
									</Link>
								</div>
								<Form.Control>
									<Input
										{...field}
										disabled={isPending || disabled}
										type='password'
										placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
										className='disabled:cursor-default'
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>
				</div>
				<FormError message={error || urlError} />
				<FormSuccess message={success} />
				<SubmitButton
					isPending={isPending}
					disabled={disabled}
					label='Войти'
					variant='secondary'
				/>
			</form>
		</Form.Root>
	)
}
