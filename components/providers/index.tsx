import { ThemeProvider } from '@/components/theme'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			{children}
			<Toaster position='top-center' reverseOrder={true} />
		</ThemeProvider>
	)
}
