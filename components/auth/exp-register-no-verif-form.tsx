'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
// import { signIn } from 'next-auth/react'

import { expRegisterNoVerifAction } from '@/actions/auth'
import { registerSchema } from '@/schemas/auth'
import { Form, Input } from '@/components/shadcn'

import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { SubmitButton } from './submit-button'

export const ExpRegisterNoVerifForm: React.FC = () => {
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
			expRegisterNoVerifAction(values)
				// // return { success: '...' } return { error: '...'}
				// .then((data) => {
				// 	setSuccess(data.success)
				// 	setError(data.error)
				// })

				// return { success: '...' } throw new Error('...')
				.then((data) => {
					setSuccess(data.success)
					// toast.success(data.success)
					toast.success('success')
				})
				.catch((error) => {
					setError(error.message)
					// toast.error(error.message)
					toast.error('error')
				})
		)

		// signIn('credentials', {
		// 	email: values.email,
		// 	password: values.password,
		// 	redirectTo: '/dev/next-auth',
		// })
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
				<FormError message={error} />
				{success ? (
					<FormSuccess message={success} />
				) : (
					<SubmitButton isPending={isPending} label='Создать учетную запись' />
				)}
			</form>
		</Form.Root>
	)
}
