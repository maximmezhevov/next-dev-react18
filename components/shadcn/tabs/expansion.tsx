'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { X } from 'lucide-react'

import { Button, Tabs } from '..'

const Store = create<{
	infoBoard: boolean
	setInfoBoard: () => void
	setInfoBoard2: (value: boolean) => void
}>((set) => ({
	infoBoard: true,
	setInfoBoard: () => set((state) => ({ infoBoard: !state.infoBoard })),
	setInfoBoard2: (value: boolean) => set({ infoBoard: value }),
}))

export const TabsContentWithAWarningBoard: React.FC<{
	children: React.ReactNode
	value: string
	activeTab: string
}> = ({ children, value, activeTab }) => {
	const { infoBoard, setInfoBoard2 } = Store((state) => state)

	useEffect(() => {
		if (activeTab !== value) return
		if (activeTab === value) {
			if (infoBoard) return
			return setInfoBoard2(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab])

	return (
		<Tabs.Content tabIndex={-1} value={value} className='relative space-y-2'>
			{children}
		</Tabs.Content>
	)
}

export const TabsWithAWarningBoard: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const infoBoard = Store((state) => state.infoBoard)
	return infoBoard && children
}

export const TabsWithAWarningContent: React.FC<{
	children: React.ReactNode
	title?: string
}> = ({ children, title = 'Временно не доступно!' }) => {
	const setInfoBoard = Store((state) => state.setInfoBoard)
	return (
		<div className='item-center absolute inset-1 z-[1] flex flex-col gap-y-1.5 rounded-md border border-destructive/30 bg-destructive/15 p-4 text-sm shadow-sm backdrop-blur'>
			<div className='inline-flex items-center justify-between'>
				<p className='font-medium'>* {title}</p>
				<Button
					variant='ghost-secondary'
					onClick={setInfoBoard}
					className='size-4 rounded-full px-0 hover:bg-destructive focus:bg-destructive [&_svg]:size-3'
				>
					<X />
				</Button>
			</div>
			<div className='inline-flex shrink grow items-center'>{children}</div>
		</div>
	)
}

// `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`
export const TabsWithAWarningContentDefault: React.FC = () => {
	return (
		<>
			<p>
				Resend: - &quot;You can only send testing emails to your own email
				address. To send emails to other recipients, please verify a domain at
				resend.com/domains, and change the from address to an email using this
				domain ...&quot;
			</p>
		</>
	)
}
