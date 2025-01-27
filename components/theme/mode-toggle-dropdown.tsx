'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Dropdown } from '@/components/shadcn'

const themeModeMap = {
	light: 'Светлая',
	dark: 'Тёмная',
	system: 'Как в системе',
} as const

export const ThemeModeToggleDropdown: React.FC = () => {
	const { themes, theme, setTheme } = useTheme()

	return (
		<Dropdown.Root>
			<Dropdown.Trigger asChild>
				<Button
					variant='ghost_secondary'
					size='icon_32'
					className='data-[state=open]:bg-secondary/80 data-[state=open]:text-foreground'
				>
					<Sun
						className='rotate-0 scale-100 dark:-rotate-90 dark:scale-0' /* transition-all */
					/>
					<Moon
						className='absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100' /* transition-all */
					/>
					<span className='sr-only'>theme mode toggle dropdown</span>
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Content
				collisionPadding={{ right: 8 }}
				onCloseAutoFocus={(e) => e.preventDefault()}
			>
				<Dropdown.Group className='space-y-0.5'>
					{themes.map((item) => (
						<Dropdown.Item
							key={item}
							onClick={() => setTheme(item)}
							className={cn(
								theme == item && 'pointer-events-none bg-secondary'
							)}
						>
							{themeModeMap[item as 'light' | 'dark' | 'system']}
						</Dropdown.Item>
					))}
				</Dropdown.Group>
			</Dropdown.Content>
		</Dropdown.Root>
	)
}
