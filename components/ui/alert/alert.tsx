import type { AlertProps } from './cva'
import { alertVariants } from './cva'

import { cn } from '@/lib'
import { Loader2 } from 'lucide-react'

export const Alert: React.FC<
	AlertProps & { message?: string; spiner?: boolean }
> = ({ message, spiner, variant, className }) => {
	if (!message) return
	return (
		<div
			className={cn(
				'inline-flex items-center justify-center gap-2 px-3 text-center',
				alertVariants({ variant, className })
			)}
		>
			{spiner && <Loader2 className='size-5 shrink-0 animate-spin' />}
			{message}
		</div>
	)
}
