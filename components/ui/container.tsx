import { cva, VariantProps } from 'class-variance-authority'

export interface ContainerProps extends VariantProps<typeof containerVariants> {
	children: React.ReactNode
	className?: string
}

const containerVariants = cva('min-h-[inherit] ', {
	variants: {
		variant: {
			default: '',
			dev_layout: 'lg:mx-auto lg:max-w-screen-lg',
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
		<div className='min-h-[inherit] px-2 xl:px-0'>
			<div className={containerVariants({ variant, className })}>
				{children}
			</div>
		</div>
	)
}
