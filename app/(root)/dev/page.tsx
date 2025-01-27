import { Button } from '@/components/shadcn'
import { Container } from '@/components/ui'

export default async function Dev() {
	return (
		<Container variant='dev'>
			<main className='min-h-[inherit]'>
				<section className='flex min-h-[inherit] flex-col items-center justify-between pb-[6rem] pt-[3rem]'>
					<h1 className='inline-flex h-[3rem] items-center'>dev</h1>
					<section className='flex flex-1 flex-col justify-center'>
						<Button>a</Button>
					</section>
				</section>
			</main>
		</Container>
	)
}
