'use client'

import { useState } from 'react'
import { Tabs } from '@/components/shadcn'

import { RegisterForm } from './register-form'
import { RegisterNoVerifForm } from './register-no-verif-form'

const TabsMap = {
	register: 'Регистрация с email верификацией *',
	'register-no-verif': 'Регистрация без email верификацией',
} as const
type Tab = keyof typeof TabsMap

const TABS: Tab[] = ['register', 'register-no-verif']

export const RegisterFormsTabs: React.FC = () => {
	const [activeTab, setActiveTab] = useState<Tab>('register-no-verif')
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

const TabsContetns: React.FC<{ activeTab: Tab }> = ({ activeTab }) => {
	return (
		<>
			<Tabs.ContentWithAWarningBoard
				value={'register' as Tab}
				activeTab={activeTab}
			>
				<Tabs.WithAWarningBoard>
					<Tabs.WithAWarningContent>
						<Tabs.WithAWarningContentDefault />
					</Tabs.WithAWarningContent>
				</Tabs.WithAWarningBoard>
				<RegisterForm />
			</Tabs.ContentWithAWarningBoard>

			<Tabs.Content tabIndex={-1} value={'register-no-verif' as Tab}>
				<RegisterNoVerifForm />
			</Tabs.Content>
		</>
	)
}
