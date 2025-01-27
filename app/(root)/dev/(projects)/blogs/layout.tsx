import { Container } from '@/components/ui'

export default function BlogsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Container variant='dev' className='space-y-4 px-2'>
			<header className='flex h-[3rem] items-center border-b'>Блог</header>
			{children}
		</Container>
	)
}
