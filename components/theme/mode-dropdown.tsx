'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/shadcn'
import { Button, DropdownMenu } from '@/components/ui'

const themeMap = {
	light: 'Светлая',
	dark: 'Тёмная',
	system: 'Как в системе',
} as const
type Theme = keyof typeof themeMap

export const ThemeToggle: React.FC = () => {
	const { themes, theme, setTheme } = useTheme()

	const handleTheme = (value: string) => {
		setTheme(value)
	}
	return (
		<DropdownMenu.DropdownMenu>
			<Trigger />
			<Content themes={themes} theme={theme} handleTheme={handleTheme} />
		</DropdownMenu.DropdownMenu>
	)
}

const Trigger: React.FC = () => {
	return (
		<DropdownMenu.Trigger asChild>
			<Button
				variant='ghost'
				size='icon'
				className='rounded-full data-[state=open]:bg-secondary/80 data-[state=open]:text-foreground'
			>
				<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
				<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
			</Button>
		</DropdownMenu.Trigger>
	)
}

const Content: React.FC<{
	themes: string[]
	theme: string | undefined
	handleTheme: (value: string) => void
}> = ({ themes, theme, handleTheme }) => {
	return (
		<DropdownMenu.Content collisionPadding={{ right: 24 }}>
			<DropdownMenu.Group className='space-y-0.5'>
				{themes.map((item) => (
					<DropdownMenu.Item
						key={item}
						onClick={() => handleTheme(item)}
						className={cn(theme == item && 'bg-secondary')}
					>
						{themeMap[item as Theme]}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	)
}
