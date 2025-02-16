'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib'
import { Button } from '@/components/shadcn'

import type { AlertProps, CloseButtonColor } from '../cva'
import { alertVariants, CloseButtonColortMap } from '../cva'

export const AlertCloseable: React.FC<
	AlertProps & { children: React.ReactNode }
> = ({ children, variant, className }) => {
	const [open, setOpen] = useState(true)
	if (!open) return
	return (
		<div
			className={cn(
				'[&>*:nth-child(2)]:text-pretty [&>*:nth-child(n+3)]:mt-1 [&>*:nth-child(n+3)]:text-pretty', // [&>*:nth-child(2)]:text-center [&>*:nth-child(2)]:font-medium
				alertVariants({ variant, className })
			)}
		>
			<Button
				variant='ghost-secondary'
				onClick={() => setOpen(false)}
				className={cn('float-right size-4 rounded-full px-0 [&_svg]:size-3', [
					CloseButtonColortMap[variant as CloseButtonColor],
				])}
			>
				<X />
			</Button>
			{children}
		</div>
	)
}
