import { FaCircleExclamation } from 'react-icons/fa6'

export const FormError: React.FC<{ message?: string }> = ({ message }) => {
	if (!message) return
	return (
		<div className='flex items-center gap-x-2 rounded-md bg-destructive/15 p-2 text-sm text-destructive'>
			<FaCircleExclamation size={16} />
			<p>{message}</p>
		</div>
	)
}
