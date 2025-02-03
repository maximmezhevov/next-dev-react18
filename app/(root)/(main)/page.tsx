import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'
import { Container } from '@/components/ui'
import { Button } from '@/components/shadcn'

export default async function Main() {
	return (
		<Container variant='root'>
			<main className='min-h-[inherit]'>
				<section className='flex min-h-[inherit] flex-col items-center justify-between py-[3rem]'>
					<header className='*:text-center'>
						<h1 className='text-5xl font-black uppercase tracking-tight'>
							ndr18
						</h1>
						<p className='font-bold tracking-tight'>next-dev-react18</p>
					</header>
					<section className='inline-flex flex-1 items-center gap-1'>
						<Button asChild size='lg'>
							<Link href='/dev'>dev</Link>
						</Button>
						<Button asChild variant='secondary' size='lg'>
							<Link href='/me'>me</Link>
						</Button>
					</section>
					<section className='inline-flex h-[3rem] items-center'>
						<Button asChild variant='link' size='32'>
							<Link
								target='_blank'
								href='https://github.com/maximmezhevov/next-dev-react18'
							>
								<FaGithub size={16} />
								GitHub
							</Link>
						</Button>
					</section>
				</section>
			</main>
		</Container>
	)
}
