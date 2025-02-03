import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa6'
import { Container } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default function Me() {
	return (
		<Container variant='root'>
			<main className='flex min-h-[inherit] flex-col items-center gap-[3rem] pt-[3rem]'>
				<header className='*:text-center'>
					<h1 className='text-5xl font-black uppercase tracking-tight'>me</h1>
					<p className='font-bold tracking-tight'>Контакты</p>
				</header>
				<Button asChild variant='link'>
					<Link target='_blank' href='https://t.me/maximmezhevov'>
						<FaTelegram size={16} /> t.me/maximmezhevov
					</Link>
				</Button>
			</main>
		</Container>
	)
}
