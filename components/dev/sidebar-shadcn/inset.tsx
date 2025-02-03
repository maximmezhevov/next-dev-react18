import { Separator, Sidebar } from '@/components/shadcn'
// import { SidebarBreadcrumb } from '../sidebar-breadcrumb'

const SidebarShadcnInset: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Sidebar.Inset>
			<SidebarShadcnInsetHeader />
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
	)
}

const SidebarShadcnInsetHeader: React.FC = () => {
	return (
		<header className='sticky top-[3rem] h-[3rem] shrink-0 border-b bg-background/50 backdrop-blur-sm'>
			<div className='flex h-[inherit] items-center gap-2 px-3'>
				<Sidebar.Trigger />
				<Separator orientation='vertical' className='mr-2 h-4' />
				{/* <SidebarBreadcrumb /> */}
			</div>
		</header>
	)
}

export { SidebarShadcnInset as Inset }
