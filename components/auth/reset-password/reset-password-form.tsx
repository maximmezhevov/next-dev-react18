'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { resetPasswordSchema } from '@/lib/zod/auth'
import { Alert, ButtonSubmit } from '@/components/shared'
import { Form, Input, PasswordInput } from '@/components/ui'

import { useResetPasswordForm } from './use-reset-password-form'

export const ResetPasswordForm = () => {
	const { isPending, error, success, form, onSubmit } = useResetPasswordForm()

	return (
		<Form.Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<EmailField control={form.control} isPending={isPending} />
					<PasswordField control={form.control} isPending={isPending} />
					<PasswordConfirmField control={form.control} isPending={isPending} />
				</div>

				{error && <Alert color='red'>{error}</Alert>}
				{success ? (
					<Alert color='green'>{success}</Alert>
				) : (
					<ButtonSubmit type='submit' disabled={isPending} className='w-full'>
						Сохранить новый пароль
					</ButtonSubmit>
				)}
			</form>
		</Form.Form>
	)
}

interface FieldProps {
	control: Control<z.infer<typeof resetPasswordSchema>>
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
					<Form.Label>Новый пароль</Form.Label>
					<Form.Control>
						<PasswordInput {...field} disabled={isPending} />
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}

const PasswordConfirmField: React.FC<FieldProps> = ({ control, isPending }) => {
	return (
		<Form.Field
			control={control}
			name='confirmPassword'
			render={({ field }) => (
				<Form.Item>
					<Form.Label>Новый пароль (еще раз)</Form.Label>
					<Form.Control>
						<PasswordInput {...field} disabled={isPending} />
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}
