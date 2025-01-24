'use client'

import type { VariantProps } from 'class-variance-authority'
import type { Path } from '@/types'

import Link from 'next/link'
import { cva } from 'class-variance-authority'

import { useLinkActive } from '@/hooks'
import { cn } from '@/lib/utils'

export interface LinkActiveProps extends VariantProps<typeof linkVariants> {
	path: Path
	inherit?: boolean
	className?: string
}

const linkVariants = cva('', {
	variants: {
		variant: {
			default: '',
			secondary:
				'rounded-md px-2 hover:bg-secondary data-[active=true]:bg-secondary data-[active=true]:hover:bg-secondary/80 inline-block',
		},
		size: {
			sm_32: 'text-sm py-1.5',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export const LinkActive: React.FC<LinkActiveProps> = ({
	path,
	inherit = true,
	variant,
	size,
	className,
}) => {
	const { isActive, inheritIsActive } = useLinkActive(path.href, inherit)

	return (
		<Link
			data-active={isActive || inheritIsActive}
			href={path.href}
			className={cn(
				linkVariants({ variant, size, className })
				// isActive || (inheritIsActive && 'pointer-events-none')
			)}
		>
			{path.label}
		</Link>
	)
}
