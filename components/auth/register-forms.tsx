'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Tabs } from '@/components/shadcn'

import { AuthCard } from './card'
import { RegisterWithoutVerificationForm } from './register-without-verification-form'
import { RegisterWithVerificationForm } from './register-with-verification-form'

export const RegisterForms: React.FC = () => {
	return (
		<AuthCard
			headerLabel='Регистрация'
			backButtonHref='/auth/login'
			backButtonLabel='У вас уже есть учетная запись?'
		>
			<CredentialRegisterForms />
		</AuthCard>
	)
}

// TODO

const TabsMap = {
	'register-with-verification': 'Регистрация с email верификацией *',
	'register-without-verification': 'Регистрация без email верификацией',
} as const
type Tab = keyof typeof TabsMap

const TABS: Tab[] = [
	'register-with-verification',
	'register-without-verification',
]

const CredentialRegisterForms: React.FC = () => {
	const [activeTab, setActiveTab] = useState<Tab>(
		'register-without-verification'
	)
	return (
		<Tabs.Root
			value={activeTab}
			onValueChange={(value: string) => setActiveTab(value as Tab)}
			className='w-full space-y-4'
		>
			<TabTriggers />
			<TabsContetns activeTab={activeTab} />
		</Tabs.Root>
	)
}

const TabTriggers: React.FC = () => {
	return (
		<Tabs.List className='h-auto' /* border bg-background */>
			{TABS.map((tab) => (
				<Tabs.Trigger
					// disabled={Boolean(tab === 'register-with-verification')}
					key={tab}
					value={tab}
					className='w-full whitespace-normal text-xs data-[state=active]:bg-background/90'
					/* data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:shadow-none */
				>
					{TabsMap[tab]}
				</Tabs.Trigger>
			))}
		</Tabs.List>
	)
}

const TabsContetns: React.FC<{ activeTab: Tab }> = ({ ...props }) => {
	return (
		<>
			<RegisterWithVerificationTab {...props} />
			<RegisterWithoutVerificationTab />
		</>
	)
}

const RegisterWithoutVerificationTab: React.FC = () => {
	return (
		<Tabs.Content tabIndex={-1} value={'register-without-verification' as Tab}>
			<RegisterWithoutVerificationForm />
		</Tabs.Content>
	)
}

const RegisterWithVerificationTab: React.FC<{ activeTab: Tab }> = ({
	activeTab,
}) => {
	const [infoBoard, _setInfoBoard] = useState<boolean>(true)
	const setInfoBoard = () => _setInfoBoard((prew) => !prew)

	useEffect(() => {
		if (activeTab !== 'register-with-verification') return
		if (activeTab === 'register-with-verification') {
			if (infoBoard) return
			return _setInfoBoard(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab])

	return (
		<Tabs.Content
			tabIndex={-1}
			value={'register-with-verification' as Tab}
			className='relative space-y-2'
		>
			{infoBoard && <InfoBoard setInfoBoard={setInfoBoard} />}
			<RegisterWithVerificationForm disabled={infoBoard} />
		</Tabs.Content>
	)
}

const InfoBoard: React.FC<{ setInfoBoard: () => void }> = ({
	setInfoBoard,
}) => {
	return (
		<div className='item-center absolute inset-1 z-[1] flex flex-col gap-y-1.5 rounded-md bg-destructive/15 p-4 text-sm shadow-sm backdrop-blur-[2px]'>
			<div className='inline-flex items-center justify-between'>
				<p className='font-medium'>* Временно не доступно!</p>
				<span
					tabIndex={0}
					onClick={setInfoBoard}
					className='cursor-pointer p-1'
				>
					<X className='size-3' />
				</span>
			</div>
			<div className='inline-flex shrink grow items-center'>
				<p>
					Resend: - &quot;You can only send testing emails to your own email
					address. To send emails to other recipients, please verify a domain at
					resend.com/domains, and change the `from` address to an email using
					this domain ...&quot;
				</p>
			</div>
		</div>
	)
}
