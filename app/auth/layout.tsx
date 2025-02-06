import { ThemeModeToggleDropdown } from '@/components/theme'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<div className='absolute right-2 top-2'>
				<ThemeModeToggleDropdown />
			</div>
			<div
				className='flex h-full items-center justify-center'
				/* bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 dark:from-sky-800 dark:to-blue-950' */
			>
				{children}
			</div>
		</>
	)
}
