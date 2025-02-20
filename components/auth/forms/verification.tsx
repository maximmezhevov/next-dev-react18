'use client'

import { Loader2 } from 'lucide-react'
import { Alert } from '@/components/ui'
import { Button } from '@/components/shadcn'

import { useVerification } from './use-verification'

export const Verification: React.FC = () => {
	const { error, success } = useVerification()

	return (
		<div className='flex w-full flex-col items-center justify-center gap-4'>
			{!success && <Alert variant='error' message={error} />}
			<Alert variant='success' message={success} />
			{!error && !success ? (
				<div>
					<Loader2 className='size-10 animate-spin' />
				</div>
			) : (
				<Button onClick={() => window.close()} className='w-full'>
					window.close()
				</Button>
			)}
		</div>
	)
}
