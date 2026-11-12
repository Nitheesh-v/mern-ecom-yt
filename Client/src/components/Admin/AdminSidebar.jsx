import React from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { FaLuggageCart } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
export const AdminSidebar = ({ closeSidebar }) => {
  const navigate = useNavigate()
  return (
    <>
      <section className='w-64 border-r-2 bg-amber-200 md:bg-white'>
        <div className='mx-auto 2xl:container '>
          <div className='mx-auto w-[90%] grid grid-cols-1'>

            <div className='p-5 '>
              <div className='' >
                <h1 className=' flex items-center gap-5 text-black text-2xl font-bold'><GrUserAdmin /> Admin Panel</h1>
              </div>

              <div className=' text-neutral-400 mt-6'>

                <button onClick={() => { navigate("/admin/dashboard"); closeSidebar() }} className='flex gap-2 cursor-pointer text-xl  items-center hover:bg-neutral-300 p-2 rounded-xl'> <MdDashboard /> Dashboard</button>
                <button onClick={() => { navigate("/admin/products"); closeSidebar() }} className='flex gap-2 cursor-pointer text-xl  items-center hover:bg-neutral-300 p-2 rounded-xl'> <MdOutlineProductionQuantityLimits /> Products</button>
                <button onClick={() => { navigate("/admin/orders"); closeSidebar() }} className='flex gap-2 cursor-pointer text-xl  items-center hover:bg-neutral-300 p-2 rounded-xl'><FaLuggageCart /> Orders</button>
              </div>

            </div>
          </div>
        </div>
      </section>




    </>
  )
}
