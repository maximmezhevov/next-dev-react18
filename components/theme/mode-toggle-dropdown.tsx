'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib'
import { Button, Dropdown } from '@/components/shadcn'

const themeModeMap = {
	light: 'Светлая',
	dark: 'Тёмная',
	system: 'Как в системе',
} as const

export const ThemeModeToggleDropdown: React.FC = () => {
	const { themes, theme, setTheme } = useTheme()

	const handleSetTheme = (value: string) => {
		setTheme(value)
	}

	return (
		<Dropdown.Root>
			<Trigger />
			<Content themes={themes} theme={theme} handleSetTheme={handleSetTheme} />
		</Dropdown.Root>
	)
}

const Trigger: React.FC = () => {
	return (
		<Dropdown.Trigger asChild>
			<Button
				variant='ghost-secondary'
				size='32-i'
				className='data-[state=open]:bg-secondary/80 data-[state=open]:text-foreground'
			>
				<Sun
					className='rotate-0 scale-100 dark:-rotate-90 dark:scale-0' /* transition-all */
				/>
				<Moon
					className='absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100' /* transition-all */
				/>
			</Button>
		</Dropdown.Trigger>
	)
}

const Content: React.FC<{
	themes: string[]
	theme: string | undefined
	handleSetTheme: (value: string) => void
}> = ({ themes, theme, handleSetTheme }) => {
	return (
		<Dropdown.Content>
			<Dropdown.Group className='space-y-0.5'>
				{themes.map((item) => (
					<Dropdown.Item
						key={item}
						onClick={() => handleSetTheme(item)}
						className={cn(theme == item && 'pointer-events-none bg-secondary')}
					>
						{themeModeMap[item as 'light' | 'dark' | 'system']}
					</Dropdown.Item>
				))}
			</Dropdown.Group>
		</Dropdown.Content>
	)
}
