'use client'

import type { Routes } from '@/types'
import type { LinkActiveProps } from '@/components/ui'
import React from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
	ChevronRight,
	ChevronsLeftRight,
	ChevronsRightLeft,
	Menu,
} from 'lucide-react'
import { useIsMobile } from '@/hooks'
import { cn } from '@/lib'
import { LinkActive } from '@/components/ui'
import { Button, Separator, Sheet } from '@/components/shadcn'

import { useStore } from '../use-store'

const SidebarRoot: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const { open, crop } = useStore((state) => state)
	return (
		<div
			className={cn(
				'min-h-[calc(100svh-3rem)]',
				'mx-auto w-full transition-[max-width] duration-300 ease-in-out',
				crop ? 'max-w-[calc(1280px+2px)]' : 'max-w-full'
			)}
		>
			<div
				data-sidebar-open={open}
				data-sidebar-crop={crop}
				className='group/sidebar-root flex min-h-[inherit]'
			>
				<SidebarSeparator trigger={crop} variant='edges' />
				{children}
				<SidebarSeparator trigger={crop} variant='edges' />
			</div>
		</div>
	)
}

// SIDEBAR DESKTOP/MOBILE

const Sidebars: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const isMobile = useIsMobile()
	if (isMobile) {
		return <SidebarMobile>{children}</SidebarMobile>
	}
	return <SidebarDesktop>{children}</SidebarDesktop>
}

const SidebarDesktop: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const open = useStore((state) => state.open)
	return (
		<div className='flex'>
			<div
				className={cn(
					'sticky top-[3rem] h-[calc(100svh-3rem)] overflow-hidden overflow-y-scroll transition-[width] duration-300 ease-in-out',
					open ? 'w-[calc(16rem-1px)]' : 'w-0' // xl(1280) - lg(1024) = 16rem/256px - "border"
				)}
			>
				{children}
			</div>
			<SidebarSeparator trigger={open} variant='sidebar' />
		</div>
	)
}

const SidebarMobile: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { sheet, setSheet } = useStore((state) => state)
	return (
		<Sheet.Root open={sheet} onOpenChange={setSheet}>
			<Sheet.Content side='left'>
				<VisuallyHidden>
					<Sheet.Title>Sheet Content</Sheet.Title>
					<Sheet.Description>
						This is a hidden description for screen readers.
					</Sheet.Description>
				</VisuallyHidden>
				{children}
			</Sheet.Content>
		</Sheet.Root>
	)
}

const SidebarTriggers: React.FC = () => {
	const isMobile = useIsMobile()
	if (isMobile) {
		return <SidebarMobileTrigger />
	}
	return <SidebarDesktopTrigger />
}

const SidebarMobileTrigger: React.FC = () => {
	const setSheet = useStore((state) => state.setSheet)
	return (
		<Button onClick={setSheet} variant='ghost-secondary' size='32-i'>
			<Menu />
		</Button>
	)
}

const SidebarDesktopTrigger: React.FC = () => {
	const setOpen = useStore((state) => state.setOpen)
	return (
		<Button onClick={setOpen} variant='ghost-secondary' size='32-i'>
			<ChevronRight className='group-data-[sidebar-open=true]/sidebar-root:rotate-[180deg]' />
		</Button>
	)
}

// SIDEBAR CONTENT

const SidebarNavList: React.FC<{ routes: Routes[] }> = ({ routes }) => {
	return (
		<ul className='space-y-0.5 p-2'>
			{routes.map((path) => (
				<React.Fragment key={path.href}>
					<li>
						<SidebarLinkActive path={path} />
					</li>
					<ul className='ml-2 space-y-0.5 border-l pl-2'>
						{path.variants?.map((variantPath) => (
							<li key={variantPath.href}>
								<SidebarLinkActive path={variantPath} />
							</li>
						))}
					</ul>
				</React.Fragment>
			))}
		</ul>
	)
}

type SidebarLinkActiveProps = Pick<LinkActiveProps, 'path'>
const SidebarLinkActive: React.FC<SidebarLinkActiveProps> = ({ path }) => {
	const setSheet = useStore((state) => state.setSheet)
	const isMobile = useIsMobile()
	const handlerSetSheet = () => isMobile && setSheet()
	return (
		<LinkActive
			variant='secondary'
			size='32-sm'
			path={path}
			className='w-full'
			onClick={handlerSetSheet}
		/>
	)
}

// SIDEBAR INSET

const SidebarInset: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	return (
		<div className={cn('min-h-[calc(100svh-6rem)] flex-1')}>{children}</div>
	)
}

const SidebarInsetHeader: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	return (
		<aside className='sticky top-[3rem] h-[3rem] bg-background/50 backdrop-blur-sm'>
			<div className='flex h-full flex-col'>
				<div className='mx-auto h-full w-full max-w-screen-xl'>
					<div className='h-full shrink-0 grow px-2'>{children}</div>
				</div>
				<Separator orientation='horizontal' className='shrink-0' />
			</div>
		</aside>
	)
}

// SIDEBAR SETTINGS

const SidebarScreenCropTrigger: React.FC = () => {
	const { crop, setCrop } = useStore((state) => state)
	return (
		<Button
			onClick={setCrop}
			variant='ghost-secondary'
			size='32-i'
			className='hidden xl:inline-flex'
		>
			{crop ? <ChevronsLeftRight /> : <ChevronsRightLeft />}
		</Button>
	)
}

// SIDEBAR COMPONENTS

const SidebarSeparator: React.FC<{
	trigger: boolean
	variant: 'edges' | 'sidebar'
}> = ({ trigger, variant }) => {
	return (
		<div
			className={cn(
				'shrink-0 bg-border transition-[width] duration-300 ease-in-out',
				trigger ? 'w-[1px]' : 'w-0',
				variant == 'edges' && 'hidden xl:block',
				variant == 'sidebar' && ''
			)}
		/>
	)
}

// EXPORT

export { SidebarRoot }
// SIDEBAR DESKTOP/MOBILE
export { Sidebars, SidebarTriggers }
// SIDEBAR CONTENT
export { SidebarNavList }
// SIDEBAR INSET
export { SidebarInset, SidebarInsetHeader }
// SIDEBAR SETTINGS
export { SidebarScreenCropTrigger }
// SIDEBAR COMPONENTS
export {}
