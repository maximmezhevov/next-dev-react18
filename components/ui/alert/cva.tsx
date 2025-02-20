import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export interface AlertProps extends VariantProps<typeof alertVariants> {
	className?: string
}

export const alertVariants = cva('min-h-10 w-full rounded-md p-2 text-sm', {
	variants: {
		variant: {
			default: 'border',
			success:
				'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
			error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
			warning:
				'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
			dev: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
		},
	},

	defaultVariants: {
		variant: 'default',
	},
})

// unused

export const CloseButtonColortMap = {
	// default: '',
	success:
		'bg-green-800 hover:bg-green-800/80 text-green-300 hover:text-green-300 dark:bg-green-300 dark:hover:bg-green-300/80 dark:text-green-800',
	error:
		'bg-red-800 hover:bg-red-800/80 text-red-300 hover:text-red-300 dark:text-red-800 dark:hover:bg-red-300/80 dark:bg-red-300',
	dev: 'bg-blue-800 hover:bg-blue-800/80 text-blue-300 hover:text-blue-300 dark:text-blue-800 dark:hover:bg-blue-300/80 dark:bg-blue-300',
} as const
export type CloseButtonColor = keyof typeof CloseButtonColortMap
