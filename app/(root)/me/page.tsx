import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa6'
import { Container, Header } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default function Me() {
	return (
		<Container variant='root'>
			<main className='flex min-h-[inherit] flex-col items-center gap-[3rem] pt-[3rem]'>
				<Header.Root>
					<Header.Title>me</Header.Title>
					<Header.Description>Контакты</Header.Description>
				</Header.Root>
				<Button asChild variant='link'>
					<Link target='_blank' href='https://t.me/maximmezhevov'>
						<FaTelegram size={16} /> t.me/maximmezhevov
					</Link>
				</Button>
			</main>
		</Container>
	)
}
