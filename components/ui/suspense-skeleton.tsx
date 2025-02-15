import { Suspense } from 'react'

import { Skeleton } from '@/components/shadcn'

interface SkeletonProps {
	children: React.ReactNode
	className?: string
}

export const SuspenseSkeleton: React.FC<SkeletonProps> = ({
	children,
	className,
}) => {
	return (
		<Suspense fallback={<Skeleton className={className} />}>
			{children}
		</Suspense>
	)
}
