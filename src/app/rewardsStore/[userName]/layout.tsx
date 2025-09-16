import HeaderUser from "@/features/rewardsStore/components/HeaderUser";

interface LayoutProps {
 children: React.ReactNode;
 params: Promise<{ userName: string }>;
 searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Layout = async ({ children, params, searchParams }: LayoutProps) => {
 const { userName } = await params;

 return (
  <div className="h-screen flex flex-col overflow-hidden ">
   <HeaderUser userName={userName} />
   <main className="flex-1  pt-3 pb-2 overflow-hidden flex flex-col">
    {children}
   </main>
  </div>
 );
};
export default Layout;
