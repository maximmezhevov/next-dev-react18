import { DevLayoutVariantToggleDropdown } from '@/components/dev'
import { Container, Header } from '@/components/ui'

export default async function Dev() {
	return (
		<Container variant='dev'>
			<main className='flex min-h-[inherit] flex-col items-center gap-[3rem] pt-[3rem]'>
				<Header.Root>
					<Header.Title>dev</Header.Title>
					<Header.Description className='line-through decoration-2'>
						Портфолио, в кавычках
					</Header.Description>
				</Header.Root>
				<section>
					<DevLayoutVariantToggleDropdown triggerVariant='value' />
				</section>
			</main>
		</Container>
	)
}
