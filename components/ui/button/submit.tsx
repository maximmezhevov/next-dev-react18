import type { ButtonVariantProps } from '@/components/ui'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'

interface Props extends ButtonVariantProps {
	children: React.ReactNode
	disabled: boolean
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
	onClick?: () => void
	className?: string
}

/**
 * ButtonSubmit = ButtonPending
 */

export const ButtonSubmit: React.FC<Props> = ({ children, disabled, variant, ...props }) => {
	return (
		<Button
			disabled={disabled}
			variant={disabled && variant === 'ghost' ? 'secondary' : variant}
			{...props}
		>
			{disabled && <Loader2 className='animate-spin' />}
			{children}
		</Button>
	)
}
