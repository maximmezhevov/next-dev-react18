import { Session } from '@/components/auth'
import { UserClient, UserServer } from '@/components/next-auth'

export default function NextAuthParallelLayout({
	server,
	client,
}: {
	server: React.ReactNode
	client: React.ReactNode
}) {
	return (
		<div className='space-y-6'>
			<Header />
			<Main server={server} client={client} />
		</div>
	)
}

const Header: React.FC = () => {
	return (
		<header className='flex flex-wrap items-center justify-between gap-3'>
			<h1>next-auth/parallel</h1>
		</header>
	)
}

const Main: React.FC<{ server: React.ReactNode; client: React.ReactNode }> = ({
	server,
	client,
}) => {
	return (
		<main className='space-y-6'>
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
