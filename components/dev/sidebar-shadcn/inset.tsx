import { Separator, Sidebar } from '@/components/shadcn'
import { SidebarBreadcrumb } from '../sidebar-breadcrumb'
import { DevLayoutVariantToggleDropdown } from '../layout-variant'

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
		<aside className='sticky top-[3rem] h-[3rem] bg-background/50 backdrop-blur-sm'>
			<div className='flex h-full flex-col'>
				<div className='mx-auto h-full w-full max-w-screen-xl'>
					<div className='h-full shrink-0 grow px-2'>
						<div className='grid h-full grid-cols-[auto_1fr_auto] content-center'>
							<div className='inline-flex items-center'>
								<Sidebar.Trigger />
								<Separator orientation='vertical' className='mx-2 h-4' />
							</div>
							<div className='overflow-hidden'>
								<div className='overflow-x-scroll'>
									<SidebarBreadcrumb className='mx-2 h-full' />
								</div>
							</div>
							<div className='inline-flex items-center'>
								<Separator orientation='vertical' className='mx-2 h-4' />
								<DevLayoutVariantToggleDropdown triggerVariant='icon' />
							</div>
						</div>
					</div>
				</div>
				<Separator orientation='horizontal' className='shrink-0' />
			</div>
		</aside>
	)
}

export { SidebarShadcnInset as Inset }
