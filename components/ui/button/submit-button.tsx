import { VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib'
import { Button, buttonVariants } from '@/components/shadcn'

interface SubmitButtonProps extends VariantProps<typeof buttonVariants> {
	isPending: boolean
	children?: React.ReactNode
	label?: string
	onClick?: () => void
	disabled?: boolean
	className?: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
	isPending,
	children,
	label,
	className,
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
