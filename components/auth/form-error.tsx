export const FormError: React.FC<{ message?: string }> = ({ message }) => {
	if (!message) return
	return (
		<div className='inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive/15 px-3 py-2 text-center text-sm text-destructive'>
			{message}
		</div>
	)
}
