import { Suspense } from 'react'
import { SignInForm, OAuthServerActionButton } from '@/components/auth'
import { Card, NamedSeparator, Skeleton } from '@/components/ui'

export default function SignIsPage() {
	return (
		<Card.Card className='w-[400px]'>
			<Card.CardHeader className='text-center'>
				<Card.CardTitle>Sign-in</Card.CardTitle>
			</Card.CardHeader>
			<Card.CardContent className='space-y-6'>
				<div className='space-y-1'>
					<Suspense fallback={<Skeleton className='h-9' />}>
						<OAuthServerActionButton provider='github' className='w-full' />
					</Suspense>
				</div>

				<NamedSeparator text='or Сredentials' />

				<SignInForm />
			</Card.CardContent>
			<Card.CardFooter className='justify-center'>...</Card.CardFooter>
		</Card.Card>
	)
}
