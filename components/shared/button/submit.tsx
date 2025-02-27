import type { ButtonVariantProps } from '@/components/ui'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'

interface Props extends ButtonVariantProps {
	disabled: boolean
	label?: string
	children?: React.ReactNode

	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
	onClick?: () => void

	className?: string
}

export const ButtonSubmit: React.FC<Props> = ({ disabled, label, children, variant, ...props }) => {
	return (
		<Button
			disabled={disabled}
			variant={disabled && variant === 'ghost' ? 'secondary' : variant}
			{...props}
		>
			{disabled && <Loader2 className='animate-spin' />}
			{label || children}
		</Button>
	)
}
