import { cn } from '@/lib'

type ComponentsProps = { children: React.ReactNode; className?: string }

const Root: React.FC<ComponentsProps> = ({ children, className }) => {
	return <header className={cn('text-center', className)}>{children}</header>
}

const Title: React.FC<ComponentsProps> = ({ children, className }) => {
	return (
		<h1
			className={cn('text-5xl font-black uppercase tracking-tight', className)}
		>
			{children}
		</h1>
	)
}

const Description: React.FC<ComponentsProps> = ({ children, className }) => {
	return <p className={cn('font-bold tracking-tight', className)}>{children}</p>
}

export { Root, Title, Description }
