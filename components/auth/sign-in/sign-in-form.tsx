'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { signInSchema } from '@/lib/zod/auth'
import { Alert, ButtonSubmit, ButtonWatchCallback } from '@/components/shared'
import { Form, Input, PasswordInput } from '@/components/ui'

import { useSignInForm } from './use-sign-in-form'

export const SignInForm: React.FC = () => {
	const { isPending, error, success, form, onSubmit } = useSignInForm()

	return (
		<Form.Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<EmailField control={form.control} isPending={isPending} />
					<PasswordField control={form.control} isPending={isPending} />
				</div>

				{error && <Alert color='red'>{error}</Alert>}
				{success ? (
					<Alert color='green'>{success}</Alert>
				) : (
					<ButtonSubmit type='submit' disabled={isPending} variant='secondary' className='w-full'>
						Войти
					</ButtonSubmit>
				)}
			</form>
		</Form.Form>
	)
}

interface FieldProps {
	control: Control<z.infer<typeof signInSchema>>
	isPending: boolean
}

const EmailField: React.FC<FieldProps> = ({ control, isPending }) => {
	return (
		<Form.Field
			control={control}
			name='email'
			render={({ field }) => (
				<Form.Item>
					<Form.Label>Адрес электронной почты</Form.Label>
					<Form.Control>
						<Input {...field} disabled={isPending} type='email' placeholder='example@email.com' />
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}

const PasswordField: React.FC<FieldProps> = ({ control, isPending }) => {
	return (
		<Form.Field
			control={control}
			name='password'
			render={({ field }) => (
				<Form.Item>
					<div className='inline-flex h-[15px] w-full items-center justify-between'>
						<Form.Label>Пароль</Form.Label>
						<ButtonWatchCallback
							disabled={isPending}
							href='/sign-in/#'
							variant='link'
							className='min-h-[15px] p-0 text-xs text-muted-foreground hover:text-foreground'
						>
							Сбросить пароль?
						</ButtonWatchCallback>
					</div>
					<Form.Control>
						<PasswordInput {...field} disabled={isPending} />
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}
