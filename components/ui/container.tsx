import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib'

export interface ContainerProps extends VariantProps<typeof containerVariants> {
	children: React.ReactNode
	className?: string
}

const containerVariants = cva('', {
	variants: {
		variant: {
			default: '',
			app: 'min-h-[inherit] max-w-screen-lg mx-auto',
			root: 'min-h-[calc(100svh-3rem)] max-w-screen-lg mx-auto',
			dev: 'min-h-[inherit] lg:max-w-screen-lg lg:mx-auto',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export const Container: React.FC<ContainerProps> = ({
	children,
	variant,
	className,
}) => {
	return (
		<div
			className={cn(
				variant == 'dev' && 'px-2 xl:px-0',
				(variant == 'dev' || variant == 'app') && 'min-h-[inherit]'
			)}
		>
			<div className={containerVariants({ variant, className })}>
				{children}
			</div>
		</div>
	)
}
