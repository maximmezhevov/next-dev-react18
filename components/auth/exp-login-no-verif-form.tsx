'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { expLoginNoVerifAction } from '@/actions/auth'
import { loginSchema } from '@/schemas/auth'
import { Button, Form, Input } from '@/components/shadcn'

import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { SubmitButton } from './submit-button'

export const ExpLoginNoVerifForm: React.FC = () => {
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
			expLoginNoVerifAction(values)
				// 	// return { success: '...' } return { error: '...'}
				// 	.then((data) => {
				// 		setSuccess(data.success)
				// 		setError(data.error)
				// 	})

				// return { success: '...' } throw new Error('...')
				.then((data) => {
					// console.log('DATA: ', JSON.stringify(data))
					// console.log('DATA SUCCESS: ', JSON.stringify(data.success))
					setSuccess(data.success)
					// toast.success(data.success)
					toast.success('success')
				})
				.catch((error) => {
					// console.log('ERROR: ', JSON.stringify(error))
					// console.log('ERROR MESSAGE: ', JSON.stringify(error.message))
					setError(error.message)
					// toast.error(error.message)
					toast.error('error')
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
								<div className='inline-flex w-full items-center justify-between'>
									<Form.Label>Пароль</Form.Label>
									<Button
										asChild
										variant='link'
										className='h-auto p-0 text-xs text-muted-foreground underline-offset-2 transition-none hover:text-foreground hover:underline'
									>
										<Link href='/auth/password-reset-no-verif'>
											Сбросить пароль?
										</Link>
									</Button>
								</div>
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
				<FormError message={error || urlError} />
				<FormSuccess message={success} />
				<SubmitButton isPending={isPending} label='Войти' variant='secondary' />
			</form>
		</Form.Root>
	)
}
