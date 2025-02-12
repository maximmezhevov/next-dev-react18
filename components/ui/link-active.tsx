'use client'

import type { Path } from '@/@types'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { useActive } from '@/hooks'
import { cn } from '@/lib'

export interface LinkActiveProps extends VariantProps<typeof linkVariants> {
	path: Path
	inherit?: boolean
	onClick?: () => void
	className?: string
}

const linkVariants = cva('whitespace-nowrap', {
	variants: {
		variant: {
			default: '',
			secondary:
				'rounded-md px-2 hover:bg-secondary data-[active=true]:bg-secondary data-[active=true]:hover:bg-secondary/80 inline-block',
		},
		size: {
			'32-sm': 'text-sm py-1.5',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export const LinkActive: React.FC<LinkActiveProps> = ({
	path,
	inherit = true,
	onClick,
	variant,
	size,
	className,
}) => {
	const { isActive, inheritIsActive } = useActive(path.href, inherit)

	return (
		<Link
			data-active={isActive || inheritIsActive}
			href={path.href}
			onClick={onClick}
			className={cn(
				linkVariants({ variant, size, className })
				// isActive || (inheritIsActive && 'pointer-events-none')
			)}
		>
			{path.label}
		</Link>
	)
}
