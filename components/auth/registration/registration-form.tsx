'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { registrationSchema } from '@/lib/zod/auth'
import { Alert, ButtonSubmit } from '@/components/shared'
import { Form, Input, PasswordInput } from '@/components/ui'

import { useRegistrationForm } from './use-registration-form'

export const RegistrationForm: React.FC = () => {
	const { isPending, error, success, form, onSubmit } = useRegistrationForm()

	return (
		<Form.Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<NameField control={form.control} isPending={isPending} />
					<EmailField control={form.control} isPending={isPending} />
					<PasswordField control={form.control} isPending={isPending} />
				</div>

				{error && <Alert color='red'>{error}</Alert>}
				{success ? (
					<Alert color='green'>{success}</Alert>
				) : (
					<ButtonSubmit type='submit' disabled={isPending} className='w-full'>
						Создать учетную запись
					</ButtonSubmit>
				)}
			</form>
		</Form.Form>
	)
}

interface FieldProps {
	control: Control<z.infer<typeof registrationSchema>>
	isPending: boolean
}

const NameField: React.FC<FieldProps> = ({ control, isPending }) => {
	return (
		<Form.Field
			control={control}
			name='name'
			render={({ field }) => (
				<Form.Item>
					<Form.Label>Полное имя</Form.Label>
					<Form.Control>
						<Input {...field} disabled={isPending} type='text' placeholder='Максим М' />
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
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
					<Form.Label>Пароль</Form.Label>
					<Form.Control>
						<PasswordInput {...field} disabled={isPending} />
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}
