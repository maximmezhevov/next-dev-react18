import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/providers'
import './globals.css'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: 'NDR18',
	description: 'next-dev-react18',
}

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning className='min-h-svh'>
			<body
				className={`${inter.className} min-h-[inherit] bg-background text-foreground antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
