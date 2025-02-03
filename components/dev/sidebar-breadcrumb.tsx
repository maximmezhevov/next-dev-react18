'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
	Breadcrumb,
	//Separator
} from '@/components/shadcn'

export const SidebarBreadcrumb: React.FC<{ className?: string }> = ({
	className,
}) => {
	const pathname = usePathname()
	const paths = pathname
		.split('/')
		.filter((path) => path)
		.slice(1, pathname.length)

	// // .../dev/blogs/with-an-prisma
	// console.log(pathname.split('/')) // ['', 'dev', 'blogs', 'with-an-prisma']
	// console.log(pathname.split('/').filter((path) => path)) // ['dev', 'blogs', 'with-an-prisma']
	// console.log(
	// 	pathname.split('/').filter((path) => path)
	// 	.slice(1, pathname.length) // ['blogs', 'with-an-prisma']
	// )

	return (
		<Breadcrumb.Root className={className}>
			<Breadcrumb.List className='text-xs font-medium text-sidebar-foreground/70'>
				{/* <Breadcrumb.Item>
					<Breadcrumb.Link asChild className='py-2'>
						<Link href='/'>ndr18</Link>
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					<Breadcrumb.Link asChild className='py-2'>
						<Link href='/me'>me</Link>
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Separator orientation='vertical' className='mx-1 h-4' /> */}
				<Breadcrumb.Item>
					<Breadcrumb.Link
						asChild
						className={cn('py-2', !paths.length && 'font-bold text-foreground')}
					>
						<Link href='/dev'>dev</Link>
					</Breadcrumb.Link>
				</Breadcrumb.Item>

				{paths.map((path, index) => {
					const href = `/${paths.slice(0, index + 1).join('/')}`
					// console.log(`/${paths.slice(0, index + 1).join('/')}`)
					const label = path

					const isLastLink = paths.length === index + 1
					return (
						<Fragment key={index}>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								{!isLastLink ? (
									<Breadcrumb.Link asChild className='py-2'>
										<Link href={`/dev${href}`}>{label}</Link>
									</Breadcrumb.Link>
								) : (
									<Breadcrumb.Page className='py-2 font-bold'>
										{label}
									</Breadcrumb.Page>
								)}
							</Breadcrumb.Item>
						</Fragment>
					)
				})}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	)
}
