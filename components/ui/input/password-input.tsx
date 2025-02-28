// https://gist.github.com/mjbalcueva/b21f39a8787e558d4c536bf68e267398

'use client'

import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/shadcn'

import { Input } from './input'

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, disabled, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false)

		return (
			<div className='relative'>
				<Input
					type={showPassword ? 'text' : 'password'}
					className={cn('pr-10', className)}
					placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
					disabled={disabled}
					ref={ref}
					{...props}
				/>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent hover:text-foreground'
					onClick={() => setShowPassword((prev) => !prev)}
					disabled={disabled}
				>
					{showPassword ? <EyeIcon className='h-4 w-4' /> : <EyeOffIcon className='h-4 w-4' />}
					<span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
				</Button>
			</div>
		)
	}
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }

// 'use client'

// import * as React from 'react'
// import { EyeIcon, EyeOffIcon } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/shadcn'

// import { Input } from './input'

// const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
// 	({ className, ...props }, ref) => {
// 		const [showPassword, setShowPassword] = React.useState(false)
// 		// const disabled = props.value === '' || props.value === undefined || props.disabled

// 		return (
// 			<div className='relative'>
// 				<Input
// 					type={showPassword ? 'text' : 'password'}
// 					className={cn('pr-10' /* hide-password-toggle */, className)}
// 					placeholder='&bull;&bull;&bull;&bull;&bull;&bull;'
// 					ref={ref}
// 					{...props}
// 				/>
// 				<Button
// 					type='button'
// 					variant='ghost'
// 					size='sm'
// 					className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
// 					onClick={() => setShowPassword((prev) => !prev)}
// 					// disabled={disabled}
// 				>
// 					{showPassword /* && !disabled */ ? (
// 						<EyeIcon className='h-4 w-4' /* aria-hidden='true'  */ />
// 					) : (
// 						<EyeOffIcon className='h-4 w-4' /* aria-hidden='true'  */ />
// 					)}
// 					<span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
// 				</Button>

// 				{/* hides browsers password toggles */}
// 				{/* <style>{`
// 					.hide-password-toggle::-ms-reveal,
// 					.hide-password-toggle::-ms-clear {
// 						visibility: hidden;
// 						pointer-events: none;
// 						display: none;
// 					}
// 				`}</style> */}
// 			</div>
// 		)
// 	}
// )
// PasswordInput.displayName = 'PasswordInput'
