import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { Window } from '@/components/design-system/window';
import { useTheme } from '@/components/design-system/utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  return (
    <Window 
      theme={theme} 
      title="Imaginify" 
      showSidebar={false} 
      showTitlebar={true} 
      showToolbar={false}
    >
      <div className="flex h-full">
        <Sidebar />
        <MobileNav />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </Window>
  )
}

export default Layout