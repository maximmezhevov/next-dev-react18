'use client'

import { Settings2 } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { Button } from '@/components/shadcn/button'

export const SettingsDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost_secondary'
					size='icon_32'
					className='data-[state=open]:bg-secondary/80 data-[state=open]:text-foreground'
				>
					<Settings2 />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				collisionPadding={{ right: 8 }}
				onCloseAutoFocus={(e) => e.preventDefault()}
			>
				<DropdownMenuLabel>...</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>...</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
