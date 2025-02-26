import { SignInForm, OAuthServerActionButton } from '@/components/auth'
import { Card, NamedSeparator, SuspenseSkeleton } from '@/components/ui'

export default function SignIsPage() {
	return (
		<Card.Card className='w-[400px]'>
			<Card.CardHeader className='text-center'>
				<Card.CardTitle>Войти</Card.CardTitle>
			</Card.CardHeader>
			<Card.CardContent className='space-y-6'>
				<div className='space-y-1'>
					<SuspenseSkeleton className='h-9'>
						<OAuthServerActionButton provider='github' className='w-full' />
					</SuspenseSkeleton>
				</div>

				<NamedSeparator text='or Сredentials' />

				<SignInForm />
			</Card.CardContent>
			<Card.CardFooter className='justify-center'>...</Card.CardFooter>
		</Card.Card>
	)
}
