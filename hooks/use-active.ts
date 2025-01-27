'use client'

import type { Path } from '@/types'
import { usePathname } from 'next/navigation'

export const useActive = (href: Path['href'], inherit: boolean) => {
	const pathname = usePathname()

	const isActive = Boolean(!inherit && pathname == href)

	const inheritIsActive = Boolean(
		inherit && (pathname == href || pathname.startsWith(`${href}/`))
	)

	return {
		pathname,
		isActive,
		inheritIsActive,
	}
}
