'use client'

import { PanelLeft } from 'lucide-react'

import { useStore } from './use-store'
import { useIsMobile } from '@/hooks'
import { cn } from '@/lib'
import { Button, Sheet } from '@/components/shadcn'

const SidebarRoot: React.FC<{
	children: React.ReactNode
	className?: string
}> = ({ children, className }) => {
	const open = useStore((state) => state.open)
	return (
		<div
			data-sidebar={open}
			className={cn(
				'group/sidebar-root peer/sidebar-root',
				'flex min-h-[calc(100svh-3rem)] w-full',
				className
			)}
		>
			{children}
		</div>
	)
}

export { SidebarRoot }

//

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const isMobile = useIsMobile()
	if (isMobile) {
		return <SidebarSheet>{children}</SidebarSheet>
	} else {
		return <SidebarAside>{children}</SidebarAside>
	}
}

const SidebarTriggers: React.FC = () => {
	const isMobile = useIsMobile()
	if (isMobile) {
		return <SidebarSheetTrigger />
	} else {
		return <SidebarAsideTrigger />
	}
}

export { Sidebar, SidebarTriggers }

//

const SidebarAside: React.FC<{
	children: React.ReactNode
	className?: string
}> = ({ children, className }) => {
	const open = useStore((state) => state.open)
	return (
		<aside className='sticky top-[3rem] h-[calc(100svh-3rem)] border-r'>
			<div
				className={cn(
					'w-full overflow-hidden transition-[width] ease-in-out',
					open ? 'w-[239px]' : 'w-0',
					className
				)}
			>
				{children}
			</div>
		</aside>
	)
}

const SidebarAsideTrigger: React.FC = () => {
	const setOpen = useStore((state) => state.setOpen)
	return (
		<Button onClick={setOpen} variant='ghost_secondary' size='icon_32'>
			<PanelLeft />
		</Button>
	)
}

const SidebarSheet: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { sidebarSheet, setSidebarSheet } = useStore((state) => state)
	return (
		<Sheet.Root open={sidebarSheet} onOpenChange={setSidebarSheet}>
			<Sheet.Content side='left'>
				{/* <Sheet.Header>
					<Sheet.Title>Edit profile</Sheet.Title>
					<Sheet.Description>
						Make changes to your profile here. Click save when youre done.
					</Sheet.Description>
				</Sheet.Header> */}
				{children}
			</Sheet.Content>
		</Sheet.Root>
	)
}

const SidebarSheetTrigger: React.FC = () => {
	const setSidebarSheet = useStore((state) => state.setSidebarSheet)
	return (
		<Button onClick={setSidebarSheet} variant='ghost_secondary' size='icon_32'>
			<PanelLeft />
		</Button>
	)
}
