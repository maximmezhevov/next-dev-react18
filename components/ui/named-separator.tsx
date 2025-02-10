import { Separator } from '@/components/shadcn'

export const NamedSeparator: React.FC<{ label: string }> = ({ label }) => {
	return (
		<div className='flex items-center gap-1'>
			<Separator className='w-full shrink' />
			<div className='shrink-0 text-xs text-muted-foreground'>{label}</div>
			<Separator className='w-full shrink' />
		</div>
	)
}
