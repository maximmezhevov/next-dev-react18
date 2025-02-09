'use client'

import { Suspense, useEffect, useState } from 'react'
import { Separator, Tabs } from '@/components/shadcn'
import { X } from 'lucide-react'

import { AuthCard } from './card'
import { Social } from './social'
import { LoginWithVerificationForm } from './login-with-verification-form'
import { LoginWithoutVerificationForm } from './login-without-verification-form'

export const LoginForms: React.FC = () => {
	return (
		<AuthCard
			headerLabel='Добро пожаловать'
			backButtonHref='/auth/register'
			backButtonLabel='У вас нет учетной записи?'
			classNameContent='space-y-6'
		>
			<Social />
			<NamedSeparator label='или с учетными данными' />
			<CredentialLoginForms />
		</AuthCard>
	)
}

// TODO

const TabsMap = {
	'login-with-verification': 'Авторизация с email верификацией *',
	'login-without-verification': 'Авторизация без email верификацией',
} as const
type Tab = keyof typeof TabsMap

const TABS: Tab[] = ['login-with-verification', 'login-without-verification']

const CredentialLoginForms: React.FC = () => {
	const [activeTab, setActiveTab] = useState<Tab>('login-without-verification')
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
			<LoginWithVerificationTab {...props} />
			<LoginWithoutVerificationTab />
		</>
	)
}
const LoginWithoutVerificationTab: React.FC = () => {
	return (
		<Tabs.Content tabIndex={-1} value={'login-without-verification' as Tab}>
			<Suspense fallback={null}>
				<LoginWithoutVerificationForm />
			</Suspense>
		</Tabs.Content>
	)
}

const LoginWithVerificationTab: React.FC<{ activeTab: Tab }> = ({
	activeTab,
}) => {
	const [infoBoard, _setInfoBoard] = useState<boolean>(true)
	const setInfoBoard = () => _setInfoBoard((prew) => !prew)

	useEffect(() => {
		if (activeTab !== 'login-with-verification') return
		if (activeTab === 'login-with-verification') {
			if (infoBoard) return
			return _setInfoBoard(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab])

	return (
		<Tabs.Content
			tabIndex={-1}
			value={'login-with-verification' as Tab}
			className='relative space-y-2'
		>
			{infoBoard && <InfoBoard setInfoBoard={setInfoBoard} />}
			<Suspense fallback={null}>
				<LoginWithVerificationForm disabled={infoBoard} />
			</Suspense>
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
				<span onClick={setInfoBoard} className='cursor-pointer p-1'>
					<X tabIndex={0} className='size-3' />
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

// UI

const NamedSeparator: React.FC<{ label: string }> = ({ label }) => {
	return (
		<div className='flex items-center gap-1'>
			<Separator className='w-full shrink' />
			<div className='shrink-0 text-xs text-muted-foreground'>{label}</div>
			<Separator className='w-full shrink' />
		</div>
	)
}
