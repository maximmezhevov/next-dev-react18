import { Container } from '@/components/ui'

export default function BlogsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Container variant='dev_layout' className='space-y-4'>
			<header className='flex h-[3rem] items-center border-b'>Блог</header>
			{children}
		</Container>
	)
}
