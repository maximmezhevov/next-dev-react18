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
			<DropdownMenu.DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenu.DropdownMenuTrigger>
			<DropdownMenu.DropdownMenuContent
				onCloseAutoFocus={(e) => e.preventDefault()}
				align='end'
				className='space-y-0.5'
			>
				{themes.map((item) => (
					<DropdownMenu.DropdownMenuItem
						key={item}
						onClick={() => handleTheme(item)}
						className={cn('cursor-pointer', theme == item && 'bg-secondary')}
					>
						{themeMap[item as Theme]}
					</DropdownMenu.DropdownMenuItem>
				))}
			</DropdownMenu.DropdownMenuContent>
		</DropdownMenu.DropdownMenu>
	)
}
