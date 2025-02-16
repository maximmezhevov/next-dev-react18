import { Container } from '@/components/ui'

export default function BlogWithAnFetchNextApiLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Container variant='dev' className='space-y-4 px-2'>
			<div className='mx-auto min-h-[inherit] max-w-screen-lg px-2 lg:px-0 lg:group-data-[sidebar=true]/sidebar:px-2'>
				{children}
			</div>
		</Container>
	)
}
