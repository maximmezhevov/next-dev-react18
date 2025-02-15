'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { Form, Input } from '@/components/shadcn'
import { newPasswordSchemaNoVerif } from '@/schemas/auth'

import { usePasswordResetFormNoVerif } from './use-password-reset-form-no-verif'

interface FieldProps {
	control: Control<z.infer<typeof newPasswordSchemaNoVerif>>
	isPending: boolean
}

export const PasswordResetFormNoVerif: React.FC = () => {
	const { error, success, isPending, form, onSubmit } =
		usePasswordResetFormNoVerif({ login: false })

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<EmailField control={form.control} isPending={isPending} />
					<PasswordField control={form.control} isPending={isPending} />
					<PasswordDuplicateField
						control={form.control}
						isPending={isPending}
					/>
				</div>
				<Form.Alert variant='error' message={error} />
				{success ? (
					<Form.Alert variant='success' message={success} />
				) : (
					<Form.SubmitButton
						isPending={isPending}
						label='Сохранить новый пароль'
					/>
				)}
			</form>
		</Form.Root>
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
							placeholder='example@email.io'
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
					<Form.Label>Новый пароль</Form.Label>
					<Form.Control>
						<Input
							{...field}
							disabled={isPending}
							type='password'
							placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
						/>
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}

const PasswordDuplicateField: React.FC<FieldProps> = ({
	control,
	isPending,
}) => {
	return (
		<Form.Field
			control={control}
			name='passwordDuplicate'
			render={({ field }) => (
				<Form.Item>
					<Form.Label>Новый пароль (еще раз)</Form.Label>
					<Form.Control>
						<Input
							{...field}
							disabled={isPending}
							type='password'
							placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
						/>
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}
