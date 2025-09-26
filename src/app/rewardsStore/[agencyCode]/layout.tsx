import HeaderUser from "@/features/rewardsStore/components/HeaderUser/HeaderUser";

interface LayoutProps {
 children: React.ReactNode;
 params: Promise<{ agencyCode: string }>;
}

const Layout = async ({ children, params}: LayoutProps) => {
 const { agencyCode } = await params;

 return (
  <div className="h-screen flex flex-col overflow-hidden ">
   <HeaderUser agencyCode={agencyCode} />
   <main className="flex-1  pt-3 pb-2 overflow-hidden flex flex-col">
    {children}
   </main>
  </div>
 );
};
export default Layout;
