import { SidebarToggleDropdown } from '@/components/dev'
import { Container } from '@/components/ui'

export default async function Dev() {
	return (
		<Container variant='dev'>
			<main className='flex min-h-[inherit] flex-col items-center gap-[3rem] pt-[3rem]'>
				<header className='*:text-center'>
					<h1 className='text-5xl font-black uppercase tracking-tight'>dev</h1>
					<p className='font-bold tracking-tight line-through decoration-2'>
						Портфолио, в кавычках
					</p>
				</header>
				<section>
					<SidebarToggleDropdown triggerVariant='value' />
				</section>
			</main>
		</Container>
	)
}
