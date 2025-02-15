'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { resetSchema } from '@/schemas/auth'
import { Form, Input } from '@/components/shadcn'

import { useResetForm } from './use-reser-form'

interface FieldProps {
	control: Control<z.infer<typeof resetSchema>>
	isPending: boolean
}

export const ResetForm: React.FC = () => {
	const { success, error, isPending, form, onSubmit } = useResetForm()

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<EmailField control={form.control} isPending={isPending} />
				<Form.Alert variant='error' message={error} />
				{success ? (
					<Form.Alert variant='success' message={success} />
				) : (
					<Form.SubmitButton
						isPending={isPending}
						label='Отправить ссылку для сброса пароля'
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
							placeholder='example@email.com'
						/>
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}
