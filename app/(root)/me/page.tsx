import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa6'
import { Container } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default function Me() {
	return (
		<Container variant='root'>
			<main className='min-h-[inherit]'>
				<section className='flex min-h-[inherit] flex-col items-center justify-between pb-[6rem] pt-[3rem]'>
					<h1 className='inline-flex h-[3rem] items-center'>Me</h1>
					<section className='flex flex-1 flex-col justify-center'>
						<Button asChild variant='link'>
							<Link href='#'>
								<FaTelegram size={16} /> ...
							</Link>
						</Button>
					</section>
				</section>
			</main>
		</Container>
	)
}
