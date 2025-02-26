import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'

export const Session: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
	const session = await auth()
	return <SessionProvider session={session}>{children}</SessionProvider>
}
