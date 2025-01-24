import Link from 'next/link'
import { User2 } from 'lucide-react'
import { Button } from '@/components/shadcn/button'

const AUTH = false

export const UserDropdown: React.FC = () => {
	if (!AUTH) {
		return (
			<Button asChild variant='secondary' size='icon_32'>
				<Link href='/login'>
					<User2 />
				</Link>
			</Button>
		)
	}
	return null
}
