'use client'

import type { Control } from 'react-hook-form'
import * as z from 'zod'
import { loginSchema } from '@/schemas/auth'
import {
	Alert,
	SubmitButton,
	SuspenseSkeleton,
	WatchCallbackUrlButton,
} from '@/components/ui'
import { Form, Input } from '@/components/shadcn'

import { useLoginForm } from './use-login-form'

interface FieldProps {
	control: Control<z.infer<typeof loginSchema>>
	isPending: boolean
}

export const LoginForm: React.FC = () => {
	const { error, success, showTwoFactor, urlError, isPending, form, onSubmit } =
		useLoginForm()

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					{!showTwoFactor ? (
						<>
							<EmailField control={form.control} isPending={isPending} />
							<PasswordField control={form.control} isPending={isPending} />
						</>
					) : (
						<TwoFactorField control={form.control} isPending={isPending} />
					)}
				</div>
				<Alert variant='error' message={error || urlError} />
				<Alert variant='success' message={success} />
				<SubmitButton
					label={showTwoFactor ? 'Подтвердить' : 'Войти'}
					isPending={isPending}
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

export const PasswordField: React.FC<FieldProps> = ({ control, isPending }) => {
	return (
		<Form.Field
			control={control}
			name='password'
			render={({ field }) => (
				<Form.Item>
					<div className='inline-flex w-full items-center justify-between'>
						<Form.Label>Пароль</Form.Label>

						{/* <Button
							asChild
							variant='link'
							className='h-auto p-0 text-xs text-muted-foreground underline-offset-2 transition-none hover:text-foreground hover:underline'
						>
							<Link href='/auth/reset'>Сбросить пароль?</Link>
						</Button> */}

						<SuspenseSkeleton className='h-5 w-full'>
							<WatchCallbackUrlButton
								href='/auth/password-reset-no-verif'
								label='Сбросить пароль?'
								variant='link2'
								size='16'
							/>
						</SuspenseSkeleton>
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

const TwoFactorField: React.FC<FieldProps> = ({ control, isPending }) => {
	return (
		<Form.Field
			control={control}
			name='twoFactorCode'
			render={({ field }) => (
				<Form.Item>
					<Form.Label>2FA код</Form.Label>
					<Form.Control>
						<Input
							{...field}
							disabled={isPending}
							type='text'
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
