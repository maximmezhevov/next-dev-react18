import { ThemeProvider } from '@/components/theme'

export default function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>
}
