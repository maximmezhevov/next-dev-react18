import { Inter } from 'next/font/google'
import { cn } from '@/lib/shadcn'

import './globals.css'
import Providers from '@/components/providers'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
})

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(inter.className, 'antialiased')}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
