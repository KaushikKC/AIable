import ClientProvider from "../components/ClientProvider";
import SideBar from "../components/SideBar";
import "../styles/globals.css";
import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body className="">
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* Sidebar */}
              

              <ClientProvider />

              {/* Content */}
              <div className="bg-[#163242] border-yellow-400/40 border-2 drop-shadow-xl  flex-1">{children}</div>
              <div className="bg-[#2d3443] md:min-w-[20rem] max-w-xs overflow-y-auto h-screen">
                <SideBar />
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
