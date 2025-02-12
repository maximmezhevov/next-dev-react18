'use client'

import type { Path } from '@/@types'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/shadcn'
import { cn } from '@/lib'

export const ButtonGroupActiveMapping: React.FC<{
	paths: Path[]
	className?: string
}> = ({ paths, className }) => {
	const pathname = usePathname()
	return (
		<div
			className={cn(
				'flex gap-1 rounded-md *:h-auto *:w-full *:whitespace-normal *:px-2.5 *:text-center *:text-xs',
				className
			)}
		>
			{paths.map((button) => (
				<Button
					key={button.href}
					asChild
					variant={pathname === button.href ? 'secondary' : 'ghost-secondary'}
				>
					<Link href={button.href}>{button.label}</Link>
				</Button>
			))}
		</div>
	)
}
