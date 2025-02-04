import { FaCircleCheck } from 'react-icons/fa6'
export const FormSuccess: React.FC<{ message?: string }> = ({ message }) => {
	if (!message) return
	return (
		<div className='flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-2 text-sm text-emerald-500'>
			<FaCircleCheck size={16} />
			<p>{message}</p>
		</div>
	)
}
