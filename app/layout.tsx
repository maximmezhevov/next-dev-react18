import { Inter } from 'next/font/google'
import { cn } from '@/lib/shadcn'

import './globals.css'

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
		<html lang='en'>
			<body className={cn(inter.className, 'antialiased')}>{children}</body>
		</html>
	)
}
