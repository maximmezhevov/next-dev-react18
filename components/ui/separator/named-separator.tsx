import { Separator } from './separator'

export const NamedSeparator: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div className='flex items-center gap-1.5'>
			<Separator className='shrink grow' />
			<div className='shrink-0 text-xs text-muted-foreground'>{text}</div>
			<Separator className='shrink grow' />
		</div>
	)
}
