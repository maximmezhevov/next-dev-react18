import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'

export default async function NextAuthClientLayout({ children }: { children: React.ReactNode }) {
	const session = await auth()
	return <SessionProvider session={session}>{children}</SessionProvider>
}

// import { Session } from '@/components/auth'

// export default function NextAuthClientLayout({ children }: { children: React.ReactNode }) {
// 	return <Session>{children}</Session>
// }
