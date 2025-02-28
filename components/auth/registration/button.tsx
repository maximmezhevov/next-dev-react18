'use client'

import { registrationAction } from '@/actions/auth'
import { Button } from '@/components/ui'

export const RegistrationButton = () => {
	return (
		<Button onClick={() => registrationAction()} variant='secondary'>
			Registration
		</Button>
	)
}
