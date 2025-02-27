import { RegistrationButton, Session, SignInButton } from '@/components/auth'
import { UserClient, UserServer } from '@/components/next-auth'

interface Props {
	server: React.ReactNode
	client: React.ReactNode
}

export default function NextAuthParallelLayout({ ...props }: Props) {
	return (
		<div className='space-y-6'>
			<Header />
			<Main {...props} />
		</div>
	)
}

const Header: React.FC = () => {
	return (
		<header className='text-center'>
			<h1>next-auth/parallel</h1>
		</header>
	)
}

const Main: React.FC<Props> = ({ server, client }) => {
	return (
		<main className='space-y-6'>
			<section className='flex justify-center gap-1'>
				<SignInButton />
				<RegistrationButton />
			</section>

			<section className='space-y-3'>
				<header className='flex items-center justify-between gap-3'>
					<h2>@server</h2>
					<div className='inline-flex items-center gap-1'>
						<span>server:</span>
						<UserServer />
					</div>
				</header>
				<div className='rounded-md border p-3 *:space-y-3'>{server}</div>
			</section>

			<section className='space-y-3'>
				<header className='flex items-center justify-between gap-3'>
					<h2>@client (useSession)</h2>
					<div className='inline-flex items-center gap-1'>
						<span>client (useSession):</span>
						<Session>
							<UserClient />
						</Session>
					</div>
				</header>
				<div className='rounded-md border p-3 *:space-y-3'>{client}</div>
			</section>
		</main>
	)
}
