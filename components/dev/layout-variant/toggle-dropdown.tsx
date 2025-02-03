'use client'

import { ChevronDown, Settings2 } from 'lucide-react'
import { type DevLayoutVariant, useStore } from './use-store'
import { useActive } from '@/hooks'
import { cn } from '@/lib'
import { Button, Dropdown } from '@/components/shadcn'

type TriggerVariant = 'value' | 'icon'

const VARIANTS: DevLayoutVariant[] = ['sidebar-ui', 'sidebar-shadcn']

export const DevLayoutVariantToggleDropdown: React.FC<{
	triggerVariant: TriggerVariant
}> = ({ triggerVariant }) => {
	const { inheritIsActive } = useActive('/dev', true)
	const { devLayoutVariant, setDevLayoutVariant } = useStore((state) => state)

	if (!inheritIsActive) return null
	return (
		<Dropdown.Root>
			<Trigger
				triggerVariant={triggerVariant}
				devSidebarVariant={devLayoutVariant}
			/>
			<Content
				devSidebarVariant={devLayoutVariant}
				setDevSidebarVariant={setDevLayoutVariant}
			/>
		</Dropdown.Root>
	)
}

const Trigger: React.FC<{
	triggerVariant: TriggerVariant
	devSidebarVariant: DevLayoutVariant
}> = ({ triggerVariant, devSidebarVariant }) => {
	return (
		<Dropdown.Trigger asChild>
			<Button
				variant={triggerVariant == 'value' ? 'outline' : 'ghost_secondary'}
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
	devSidebarVariant: DevLayoutVariant
	setDevSidebarVariant: (value: DevLayoutVariant) => void
}> = ({ devSidebarVariant, setDevSidebarVariant }) => {
	return (
		<Dropdown.Content>
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
