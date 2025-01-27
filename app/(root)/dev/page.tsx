import { SidebarToggleDropdown } from '@/components/dev'
import { Container } from '@/components/ui'

export default async function Dev() {
	return (
		<Container variant='dev'>
			<main className='flex min-h-[inherit] flex-col items-center gap-[3rem] pt-[3rem]'>
				<h1 className='inline-flex h-[3rem] items-center'>dev</h1>
				<SidebarToggleDropdown triggerVariant='value' />
			</main>
		</Container>
	)
}
