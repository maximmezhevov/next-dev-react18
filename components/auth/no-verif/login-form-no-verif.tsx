'use client'

import type { Control } from 'react-hook-form'
import Link from 'next/link'
import * as z from 'zod'
import { loginSchemaNoVerif } from '@/schemas/auth'
import { Button, Form, Input } from '@/components/shadcn'

import { useLoginFormNoVerif } from './use-login-form-no-verif'

interface FieldProps {
	control: Control<z.infer<typeof loginSchemaNoVerif>>
	isPending: boolean
}

export const LoginFormNoVerif: React.FC = () => {
	const { error, success, urlError, isPending, form, onSubmit } =
		useLoginFormNoVerif()

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<EmailField control={form.control} isPending={isPending} />
					<PasswordField control={form.control} isPending={isPending} />
				</div>
				<Form.Alert variant='error' message={error || urlError} />
				<Form.Alert variant='success' message={success} />
				<Form.SubmitButton
					isPending={isPending}
					label='Войти'
					variant='secondary'
				/>
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
					<div className='inline-flex w-full items-center justify-between'>
						<Form.Label>Пароль</Form.Label>
						<Button
							asChild
							variant='link'
							className='h-auto p-0 text-xs text-muted-foreground underline-offset-2 transition-none hover:text-foreground hover:underline'
						>
							<Link href='/auth/password-reset-no-verif'>Сбросить пароль?</Link>
						</Button>
					</div>
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
