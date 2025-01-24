import { redirect } from 'next/navigation'

export default async function Dev() {
	return redirect('/dev/blogs/with-an-prisma')
}
