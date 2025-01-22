import { redirect } from 'next/navigation'

export default async function Blog() {
	return redirect('/dev/blog/with-an-prisma')
}
