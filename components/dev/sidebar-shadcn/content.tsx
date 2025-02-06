import * as React from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/shadcn'
import { Routes } from '@/types/index'

const SidebarShadcnContent: React.FC<
	{ routes: Routes[] } & React.ComponentProps<typeof Sidebar.Root>
> = ({ routes, ...props }) => {
	return (
		<Sidebar.Root {...props}>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.Menu>
						{routes.map((path) => (
							<Sidebar.MenuItem key={path.label}>
								<Sidebar.MenuButton asChild>
									<Link href={path.href} className='font-medium'>
										{path.label}
									</Link>
								</Sidebar.MenuButton>
								{path.variants?.length ? (
									<Sidebar.MenuSub>
										{path.variants.map((subPath) => (
											<Sidebar.MenuSubItem key={subPath.label}>
												<Sidebar.MenuSubButton
													asChild /* isActive={subPath.isActive} */
												>
													<Link href={subPath.href}>{subPath.label}</Link>
												</Sidebar.MenuSubButton>
											</Sidebar.MenuSubItem>
										))}
									</Sidebar.MenuSub>
								) : null}
							</Sidebar.MenuItem>
						))}
					</Sidebar.Menu>
				</Sidebar.Group>
			</Sidebar.Content>
			<Sidebar.Rail />
		</Sidebar.Root>
	)
}

export { SidebarShadcnContent as Content }
