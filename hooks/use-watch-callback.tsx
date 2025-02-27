'use client'

import { useSearchParams } from 'next/navigation'

export const useWatchCallback = () => {
	const searchParams = useSearchParams()
	const callbackUrl: string | undefined = searchParams.get('callbackUrl') ?? undefined
	return { callbackUrl }
}
