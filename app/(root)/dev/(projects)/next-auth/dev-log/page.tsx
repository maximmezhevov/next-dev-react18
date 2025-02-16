// prettier-ignore
const LOG: string[] = [
	'',
]

export default function NextAuthDevLogPage() {
	return (
		<main>
			<ul className='list-inside list-disc'>
				{LOG.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</main>
	)
}
