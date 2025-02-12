'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginAction } from '@/actions/auth'
import { loginSchema } from '@/schemas/auth'

import { Button, Form, Input } from '@/components/shadcn'

export const LoginForm: React.FC = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [showTwoFactor, setShowTwoFactor] = useState(false)

	const [isPending, startTransition] = useTransition()

	const searchParams = useSearchParams()
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Электронная почта уже используемая другим провайдером'
			: undefined

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	})

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		setError(undefined)
		setSuccess(undefined)

		startTransition(() =>
			loginAction(values).then((data) => {
				if (data.error) {
					form.reset()
					setError(data.error)
				}
				if (data.success) {
					form.reset()
					setSuccess(data.success)
				}
				if (data.twoFactor) {
					setShowTwoFactor(true)
				}
			})
		)
	}

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					{!showTwoFactor ? (
						<>
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
												<Link href='/auth/reset'>Сбросить пароль?</Link>
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
						</>
					) : (
						<Form.Field
							control={form.control}
							name='code'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>2FA код</Form.Label>
									<Form.Control>
										<Input
											{...field}
											disabled={isPending}
											type='text'
											placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
											className='placeholder:text-muted-foreground/50'
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					)}
				</div>
				<Form.Alert variant='error' message={error || urlError} />
				<Form.Alert variant='success' message={success} />
				<Form.SubmitButton
					isPending={isPending}
					label={showTwoFactor ? 'Подтвердить' : 'Войти'}
					variant='secondary'
				/>
			</form>
		</Form.Root>
	)
}
