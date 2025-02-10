'use client'

import { Suspense, useState } from 'react'
import { Tabs } from '@/components/shadcn'

import { LoginForm } from './login-form'
import { LoginNoVerifForm } from './login-no-verif-form'
import { ExpLoginNoVerifForm } from './exp-login-no-verif-form'

// TODO - рефакторинг

// EXP
const EXP = false

const TabsMap = {
	login: 'Авторизация с email верификацией *',
	'login-no-verif': 'Авторизация без email верификацией',
} as const
type Tab = keyof typeof TabsMap

const TABS: Tab[] = ['login', 'login-no-verif']

export const LoginForms: React.FC = () => {
	const [activeTab, setActiveTab] = useState<Tab>('login-no-verif')
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

const TabsContetns: React.FC<{ activeTab: Tab }> = ({ activeTab }) => {
	return (
		<>
			<Tabs.ContentWithAWarningBoard
				value={'login' as Tab}
				activeTab={activeTab}
			>
				<Tabs.WithAWarningBoard>
					<Tabs.WithAWarningContent>
						<Tabs.WithAWarningContentDefault />
					</Tabs.WithAWarningContent>
				</Tabs.WithAWarningBoard>
				<Suspense fallback={null}>
					<LoginForm />
				</Suspense>
			</Tabs.ContentWithAWarningBoard>

			<Tabs.Content tabIndex={-1} value={'login-no-verif' as Tab}>
				<Suspense fallback={null}>
					{EXP ? <ExpLoginNoVerifForm /> : <LoginNoVerifForm />}
				</Suspense>
			</Tabs.Content>
		</>
	)
}
