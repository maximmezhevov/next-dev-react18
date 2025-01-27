'use client'

import { ChevronDown, Settings2 } from 'lucide-react'
import { type DevSidebarVariant, useStore } from './use-store'
import { useActive } from '@/hooks'
import { cn } from '@/lib'
import { Button, Dropdown } from '@/components/shadcn'

type TriggerVariant = 'value' | 'icon'

const VARIANTS: DevSidebarVariant[] = ['children', 'sidebar', 'sidebar-shadcn']

export const DevSidebarToggleDropdown: React.FC<{
	triggerVariant: TriggerVariant
}> = ({ triggerVariant }) => {
	const { inheritIsActive } = useActive('/dev', true)
	const { devSidebarVariant, setDevSidebarVariant } = useStore((state) => state)

	if (!inheritIsActive) return null
	return (
		<Dropdown.Root>
			<Trigger
				triggerVariant={triggerVariant}
				devSidebarVariant={devSidebarVariant}
			/>
			<Content
				devSidebarVariant={devSidebarVariant}
				setDevSidebarVariant={setDevSidebarVariant}
			/>
		</Dropdown.Root>
	)
}

const Trigger: React.FC<{
	triggerVariant: TriggerVariant
	devSidebarVariant: DevSidebarVariant
}> = ({ triggerVariant, devSidebarVariant }) => {
	return (
		<Dropdown.Trigger asChild>
			<Button
				variant={triggerVariant == 'value' ? 'secondary' : 'ghost_secondary'}
				size={triggerVariant == 'value' ? 'default' : 'icon_32'}
				className='group data-[state=open]:bg-secondary/80 data-[state=open]:text-foreground'
			>
				{triggerVariant == 'value' ? (
					<>
						{devSidebarVariant}
						<ChevronDown className='transition-[transform] group-data-[state=open]:rotate-180' />
					</>
				) : (
					<Settings2 />
				)}
			</Button>
		</Dropdown.Trigger>
	)
}

const Content: React.FC<{
	devSidebarVariant: DevSidebarVariant
	setDevSidebarVariant: (value: DevSidebarVariant) => void
}> = ({ devSidebarVariant, setDevSidebarVariant }) => {
	return (
		<Dropdown.Content onCloseAutoFocus={(e) => e.preventDefault()}>
			<Dropdown.Group className='space-y-0.5'>
				{VARIANTS.map((variant) => (
					<Dropdown.Item
						key={variant}
						onClick={() => setDevSidebarVariant(variant)}
						className={cn(
							devSidebarVariant == variant && 'pointer-events-none bg-secondary'
						)}
					>
						{variant}
					</Dropdown.Item>
				))}
			</Dropdown.Group>
		</Dropdown.Content>
	)
}
