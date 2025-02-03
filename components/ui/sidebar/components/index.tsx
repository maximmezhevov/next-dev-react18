'use client'

import {
	ChevronRight,
	ChevronsLeftRight,
	ChevronsRightLeft,
	Menu,
} from 'lucide-react'

import { cn } from '@/lib'

import { useStore } from '../use-store'

import { Button, Separator, Sheet } from '@/components/shadcn'
import { useIsMobile } from '@/hooks'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React from 'react'
import { LinkActive } from '../..'
import { Routes } from '@/types'

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
		<aside className='sticky top-[3rem] h-[3rem] border-b'>
			<div className='mx-auto h-[inherit] max-w-screen-xl'>
				<div className='inline-flex h-[inherit] items-center px-2'>
					<SidebarTriggers />
					<SidebarScreenCropTrigger />
					<Separator orientation='vertical' className='mx-2 h-4' />
					<div className='ms-2'>{children}</div>
				</div>
			</div>
		</aside>
	)
}

const SidebarScreenCropTrigger: React.FC = () => {
	const { crop, setCrop } = useStore((state) => state)
	return (
		<Button
			onClick={setCrop}
			variant='ghost_secondary'
			size='icon-32'
			className='hidden xl:inline-flex'
		>
			{crop ? <ChevronsLeftRight /> : <ChevronsRightLeft />}
		</Button>
	)
}

export { SidebarRoot, SidebarInset, SidebarInsetHeader }

//

const Sidebars: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const isMobile = useIsMobile()
	if (isMobile) {
		return <SidebarMobile>{children}</SidebarMobile>
	}
	return <Sidebar>{children}</Sidebar>
}

const SidebarTriggers: React.FC = () => {
	const isMobile = useIsMobile()
	if (isMobile) {
		return <SidebarMobileTrigger />
	}
	return <SidebarTrigger />
}

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const open = useStore((state) => state.open)
	return (
		<div className='flex'>
			<div
				className={cn(
					'sticky top-[3rem] h-[calc(100svh-3rem)] overflow-hidden overflow-y-scroll transition-[width] duration-300 ease-in-out',
					open ? 'w-[calc(16rem-1px)]' : 'w-0' // xl(1280) - lg(1024) = 16rem/256px - "border"
				)}
			>
				<div className='p-2'>
					{/* <div className='h-[calc(100svh-3rem-16px)] border-b px-2'>...</div>
					<div className='h-[calc(100svh-3rem-16px)] px-2'>...</div> */}
					{children}
				</div>
			</div>
			<SidebarSeparator trigger={open} variant='sidebar' />
		</div>
	)
}
const SidebarTrigger: React.FC = () => {
	const setOpen = useStore((state) => state.setOpen)
	return (
		<Button onClick={setOpen} variant='ghost_secondary' size='icon-32'>
			<ChevronRight className='group-data-[sidebar-open=true]/sidebar-root:rotate-[180deg]' />
		</Button>
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
const SidebarMobileTrigger: React.FC = () => {
	const setSheet = useStore((state) => state.setSheet)
	return (
		<Button onClick={setSheet} variant='ghost_secondary' size='icon-32'>
			<Menu />
		</Button>
	)
}

const SidebarNavList: React.FC<{ routes: Routes[] }> = ({ routes }) => (
	<ul className='space-y-0.5'>
		{routes.map((path) => (
			<React.Fragment key={path.href}>
				<li>
					<LinkActive
						variant='secondary'
						size='sm_32'
						path={path}
						className='w-full'
					/>
				</li>
				<ul className='ml-2 space-y-0.5 border-l pl-2'>
					{path.variants?.map((variantPath) => (
						<li key={variantPath.href}>
							<LinkActive
								variant='secondary'
								size='sm_32'
								path={variantPath}
								className='w-full'
							/>
						</li>
					))}
				</ul>
			</React.Fragment>
		))}
	</ul>
)

export { Sidebars, SidebarNavList }
