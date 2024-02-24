import '@/app/ui/global.css';
import SideNav from '../ui/components/sidenav';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-shrink-0 md:w-64 md:flex-shrink-0 md:flex-grow-0 md:overflow-y-auto md:overflow-x-hidden">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
