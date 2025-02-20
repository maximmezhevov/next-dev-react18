'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { newPasswordSchema } from '@/schemas/auth'
import { Alert, SubmitButton } from '@/components/ui'
import { Form, Input } from '@/components/shadcn'

import { usePasswordResetForm } from './use-password-reset-form'
import { ButtonWindowClose } from '@/components/auth'

interface FieldProps {
	control: Control<z.infer<typeof newPasswordSchema>>
	isPending: boolean
}

export const PasswordResetForm: React.FC = () => {
	const { isPending, isError, urlWarning, isSuccess, form, onSubmit } =
		usePasswordResetForm()

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<PasswordField control={form.control} isPending={isPending} />
					<PasswordDuplicateField
						control={form.control}
						isPending={isPending}
					/>
				</div>

				{isError ? (
					<Alert variant='error' message={isError} />
				) : isSuccess ? (
					<Alert variant='success' message={isSuccess} />
				) : (
					<Alert variant='warning' message={urlWarning} />
				)}

				{!isSuccess ? (
					<SubmitButton label='Сохранить новый пароль' isPending={isPending} />
				) : (
					<ButtonWindowClose />
				)}
			</form>
		</Form.Root>
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
