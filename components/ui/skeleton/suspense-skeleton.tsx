import { Suspense } from 'react'

import { Skeleton } from './skeleton'

export const SuspenseSkeleton: React.FC<{ children: React.ReactNode; className: string }> = ({
	children,
	className,
}) => {
	return <Suspense fallback={<Skeleton className={className} />}>{children}</Suspense>
}
