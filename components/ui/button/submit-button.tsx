import { VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib'
import { Button, buttonVariants } from '@/components/shadcn'

interface SubmitButtonProps extends VariantProps<typeof buttonVariants> {
	value?: string // submitValue
	children?: React.ReactNode
	label?: string
	isPending: boolean
	isPendingLabel?: string
	onClick?: () => void
	className?: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
	children,
	label,
	isPending,
	isPendingLabel = null,
	className,
	...props
}) => {
	return (
		<Button
			disabled={isPending}
			className={cn('w-full', className)}
			type='submit'
			{...props}
		>
			{/* {isPending ? (
				<>
					<Loader2 className='animate-spin' />
					{isPendingLabel || label ||children}
				</>
			) : (
				children || label
			)} */}

			{isPending && <Loader2 className='animate-spin' />}
			{isPending ? isPendingLabel || label || children : children || label}
		</Button>
	)
}
