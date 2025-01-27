import type { Path } from '@/types'
// import { AppSidebar } from "@/components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui"
import { Sidebar, Separator } from '@/components/shadcn'
import { Sidebar2 } from './sidebar'

export const DevSidebarShadcn: React.FC<{
	children: React.ReactNode
	routes: Path[]
}> = ({ children }) => {
	return (
		<Sidebar.Provider>
			<Sidebar2 />
			<Sidebar.Inset>
				<header className='sticky top-[3rem] flex h-[3rem] shrink-0 items-center gap-2 border-b'>
					<div className='flex items-center gap-2 px-3'>
						<Sidebar.Trigger />
						<Separator orientation='vertical' className='mr-2 h-4' />
						...
						{/* <Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">
									Building Your Application
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Fetching</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb> */}
					</div>
				</header>
				{children}
				{/* <div className='flex flex-1 flex-col gap-4 p-4'>
					<div className='grid auto-rows-min gap-4 md:grid-cols-3'>
						<div className='aspect-video rounded-xl bg-muted/50' />
						<div className='aspect-video rounded-xl bg-muted/50' />
						<div className='aspect-video rounded-xl bg-muted/50' />
					</div>
					<div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
				</div> */}
			</Sidebar.Inset>
		</Sidebar.Provider>
	)
}
