import { Loader2 } from 'lucide-react'

export const FormSuccess: React.FC<{ message?: string; spiner?: boolean }> = ({
	message,
	spiner,
}) => {
	if (!message) return
	return (
		<div className='inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-emerald-500/15 px-3 py-2 text-center text-sm text-emerald-500'>
			{spiner && <Loader2 className='size-4 shrink-0 animate-spin' />}
			{message}
		</div>
	)
}
