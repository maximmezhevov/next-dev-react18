'use client'

import { useSearchParams } from 'next/navigation'

export const useCallback = (prefixUrl?: '?' | '&') => {
	const searchParams = useSearchParams()

	const callback: string | undefined = searchParams.get('callbackUrl') ?? undefined

	const callbackUrl = callback ? `${prefixUrl || ''}callbackUrl=${callback}` : ''

	return { callback, callbackUrl }
}
