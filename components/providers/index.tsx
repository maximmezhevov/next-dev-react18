import { ThemeProvider } from '@/components/theme'

import { ToasterProviders } from './toaster-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			{children}
			<ToasterProviders />
		</ThemeProvider>
	)
}
