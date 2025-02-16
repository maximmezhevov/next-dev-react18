'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { registerSchema } from '@/schemas/auth'
import { Alert, SubmitButton } from '@/components/ui'
import { Form, Input } from '@/components/shadcn'

import { useRegisterFormNoVerif } from './use-register-form-no-verif'

interface FieldProps {
	control: Control<z.infer<typeof registerSchema>>
	isPending: boolean
}

export const RegisterFormNoVerif: React.FC = () => {
	const { error, success, isPending, form, onSubmit } = useRegisterFormNoVerif({
		login: true,
	})

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<NameField control={form.control} isPending={isPending} />
					<EmailField control={form.control} isPending={isPending} />
					<PasswordField control={form.control} isPending={isPending} />
				</div>
				<Alert variant='error' message={error} />
				{success ? (
					<Alert variant='success' message={success} />
				) : (
					<SubmitButton label='Создать учетную запись' isPending={isPending} />
				)}
			</form>
		</Form.Root>
	)
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
	)
}
