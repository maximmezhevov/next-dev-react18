export const FormSuccess: React.FC<{ message?: string }> = ({ message }) => {
	if (!message) return
	return (
		<div className='w-full rounded-md bg-emerald-500/15 px-3 py-2 text-center text-sm text-emerald-500'>
			{message}
		</div>
	)
}
