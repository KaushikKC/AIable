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
              <div className="bg-[#4d4c4c]  flex-1">{children}</div>
              <div className="bg-[#202123] md:min-w-[20rem] max-w-xs overflow-y-auto h-screen">
                <SideBar />
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
