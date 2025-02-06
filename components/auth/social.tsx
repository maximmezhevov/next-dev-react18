import { FaGithub } from 'react-icons/fa6'
// import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/shadcn'
// import { signIn } from '@/lib/auth'

export const Social: React.FC = () => {
	// const github = async () => {
	// 	'use server'
	// 	await signIn('github')
	// }

	return (
		<div className='flex w-full items-center gap-x-2'>
			{/* <Button variant='outline' size='lg' className='w-full' onClick={() => {}}>
				<FcGoogle />
			</Button> */}
			{/* <form
				action={async () => {
					'use server'
					await signIn('github')
				}}
			> */}
			<Button type='submit' className='w-full'>
				<FaGithub /> Continue with GitHub
			</Button>
			{/* </form> */}
		</div>
	)
}
