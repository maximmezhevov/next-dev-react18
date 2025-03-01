import { cn } from '@/lib/shadcn'

const colorMap = {
	red: 'bg-red-100 dark:bg-red-900',
	green: 'bg-green-100 dark:bg-green-900',
} as const
type Color = keyof typeof colorMap

export const Alert: React.FC<{ children: React.ReactNode; color: Color; className?: string }> = ({
	children,
	color,
	className,
}) => {
	return (
		<p className={cn('rounded-md px-4 py-2 text-center text-sm', colorMap[color], className)}>
			{children}
		</p>
	)
}
