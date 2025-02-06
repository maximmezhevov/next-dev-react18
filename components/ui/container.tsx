import { cva, type VariantProps } from 'class-variance-authority'

export interface ContainerProps extends VariantProps<typeof containerVariants> {
	children: React.ReactNode
	className?: string
}

const containerVariants = cva('mx-auto', {
	variants: {
		variant: {
			default: '',
			app: 'min-h-[inherit] max-w-screen-xl w-full', // inherit - body
			root: 'min-h-[calc(100svh-3rem)] max-w-screen-xl w-full',
			dev: 'min-h-[inherit] max-w-screen-xl w-full', // inherit - sidebar inset control
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
		<div className={containerVariants({ variant, className })}>{children}</div>
	)
}
