'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { AtSign } from 'lucide-react'

import { registerAction } from '@/actions/auth'
import { registerSchema } from '@/schemas/auth'
import { Form, Input } from '@/components/shadcn'

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
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					{/* <Form.Field
						control={form.control}
						name='name'
						render={({ field }) => (
							<Form.Item>
								<div className='inline-flex w-full items-center justify-between text-xs'>
									<Form.Label>Имя пользователя</Form.Label>
									<span>Уникальное публичное имя</span>
								</div>
								<Form.Control>
									<div className='relative'>
										<Input
											{...field}
											disabled={isPending}
											type='text'
											placeholder='username'
											className='pl-7 placeholder:text-muted-foreground/50'
										/>
										<AtSign className='absolute left-3 top-3 size-4' />
									</div>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/> */}
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
