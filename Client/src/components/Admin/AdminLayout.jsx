import { useState } from "react";
import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
export const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      <div className={`w-64 md:bg-white  bg-amber-200 ${isOpen ? "block" : "hidden"} md:block`}>
        <AdminSidebar closeSidebar={() => setIsOpen(false)} />
          
      </div>

      <div className="flex-1 flex flex-col">
     
        <AdminHeader 
  toggleSidebar={() => setIsOpen(!isOpen)} 
  isOpen={isOpen}
/>
        <main className="flex-1 bg-gray-200 p-5">
          <Outlet />
        </main>
      </div>

    </div>
  );
};









// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import { AdminSidebar } from './AdminSidebar'
// import { AdminHeader } from './AdminHeader'
// // import { useState } from "react";
// export const AdminLayout = () => {
// //const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className='flex min-h-screen'>

// {/* Sidebar */}
//       <div className="w-64  hidden md:block bg-white border-r-2">
//         <AdminSidebar />
//       </div>

// {/* Right Section */}
//       <div className='flex-1 flex flex-col'>

// {/* Header */}
//         <AdminHeader />

// {/* Content */}
//         <main className='flex-1 bg-neutral-100 p-5'>
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   )
// }
