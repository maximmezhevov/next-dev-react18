'use client'

import { registrationAction } from '@/action/auth'
import { Button } from '@/components/ui'

export const RegistrationButton = () => {
	return (
		<Button onClick={() => registrationAction()} variant='secondary'>
			Registration
		</Button>
	)
}
