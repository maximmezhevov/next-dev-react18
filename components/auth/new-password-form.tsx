'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { newPasswordAction } from '@/actions/auth'
import { newPasswordSchema } from '@/schemas/auth'
import { Button, Form, Input } from '@/components/shadcn'

import { AuthCard } from './card'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { useSearchParams } from 'next/navigation'

export const NewPasswordForm: React.FC = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const [isPending, startTransition] = useTransition()
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const [error, setError] = useState<string | undefined>(undefined)

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
		console.log(values)
		setError(undefined)
		setSuccess(undefined)
		startTransition(() =>
			newPasswordAction(values, token).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		)
	}

	return (
		<AuthCard
			headerLabel='Новый пароль'
			headerDescription='Забыли пароль?'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<Form.Field
							control={form.control}
							name='password'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>Новый пароль</Form.Label>
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
					<Button
						disabled={isPending}
						type='submit'
						variant='secondary'
						className='w-full'
					>
						Сохранить новый пароль
					</Button>
				</form>
			</Form.Root>
		</AuthCard>
	)
}
