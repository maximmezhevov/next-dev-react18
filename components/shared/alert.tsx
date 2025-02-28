import { cn } from '@/lib/shadcn'

export const Alert: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return <p className={cn('rounded-md p-3 text-center', className)}>{children}</p>
}
