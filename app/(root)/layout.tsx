import type { User } from 'next-auth'

import Link from 'next/link'
import { auth } from '@/lib/auth'
import { UserAvatar, UserDropdown } from '@/components/auth'
import { ThemeToggle } from '@/components/theme'
import { Button, ButtonAddCallback } from '@/components/ui'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='px-6'>
			<div className='mx-auto max-w-screen-md'>
				<header className='flex h-[84px] items-center justify-between gap-1'>
					<div className='shrink grow'>
						<Button asChild variant='secondary'>
							<Link href='/'>
								<div>next-dev-react18</div>
							</Link>
						</Button>
					</div>
					<ThemeToggle />
					<User />
				</header>
				{children}
			</div>
		</div>
	)
}

const User: React.FC = async () => {
	const session = await auth()
	const user: User | undefined = session?.user
	if (!user) {
		return (
			<ButtonAddCallback href='/sign-in' variant='secondary' size='icon' className='rounded-full'>
				<UserAvatar image={null} />
			</ButtonAddCallback>
		)
	} else {
		return <UserDropdown user={user} />
	}
}
