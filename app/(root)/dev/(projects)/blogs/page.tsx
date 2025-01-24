import { redirect } from 'next/navigation'

export default async function Blogs() {
	return redirect('/dev/blogs/with-an-prisma')
}
