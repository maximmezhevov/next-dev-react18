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
		<header className='sticky top-[3rem] h-[3rem] shrink-0 border-b bg-background/50 backdrop-blur-sm'>
			<div className='inline-flex h-[inherit] w-full items-center px-2'>
				<Sidebar.Trigger variant='ghost-secondary' size='32-i' />
				<Separator orientation='vertical' className='mx-2 h-4' />
				<SidebarBreadcrumb className='mx-2 flex-1' />
				<Separator orientation='vertical' className='mx-2 h-4' />
				<DevLayoutVariantToggleDropdown triggerVariant='icon' />
			</div>
		</header>
	)
}

export { SidebarShadcnInset as Inset }
