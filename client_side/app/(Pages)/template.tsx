import Navbar from "../Components/SideNav/Navbar"
import { UserDataProvider } from "../Providers/UserDataProvider"

export default  function Template({ children }: { children: React.ReactNode }) {
    return ( 
    <>
        <main className="w-full h-full grid grid-cols-12 overflow-x-hidden">
            <Navbar/>
            <UserDataProvider>
              {children}
            </UserDataProvider>
        </main>
    </>)
  }