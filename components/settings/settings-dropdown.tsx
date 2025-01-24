'use client'

import { Settings2 } from 'lucide-react'
import { useSettingsStore } from '@/store-zustand'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../shadcn/dropdown-menu'
import { Button } from '../shadcn/button'

export const SettingsDropdown = () => {
	const { variantApp, variantDev } = useSettingsStore((store) => store)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost_secondary' size='icon_32'>
					<Settings2 />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{variantApp}</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>1</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>{variantDev}</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>2</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
