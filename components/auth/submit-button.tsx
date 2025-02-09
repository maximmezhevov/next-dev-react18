import { Button, buttonVariants } from '@/components/shadcn'
import { cn } from '@/lib'
import { VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps extends VariantProps<typeof buttonVariants> {
	isPending: boolean
	onClick?: () => void
	disabled?: boolean
	children?: React.ReactNode
	label?: string
	className?: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
	isPending,
	className,
	children,
	label,
	...props
}) => {
	return (
		<Button
			disabled={isPending}
			type='submit'
			className={cn('w-full', className)}
			{...props}
		>
			{isPending && <Loader2 className='animate-spin' />}
			{children || label}
		</Button>
	)
}
