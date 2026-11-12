import React from 'react'
import { AdminSidebar } from './AdminSidebar'
import { RiMenu2Fill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { LogoutUser } from '../../store/authThunk/asyncThunk';
import { useDispatch} from "react-redux";
//<RxCross1 />
export const AdminHeader = ({ toggleSidebar , isOpen}) => {


  const dispatch=useDispatch()
  const handlelogout=()=>{
    dispatch(LogoutUser())
  }
  return (
    <>
      <header className='w-full bg-white p-3 border-b-2'>
        <div className='2xl:container mx-auto'>
          <div className='mx-auto w-[90%] grid grid-cols-1'>
            <div className='flex items-center justify-between'>
              <button onClick={toggleSidebar} className=""   >   {isOpen? <RxCross1 className=' block sm:hidden'  />:<RiMenu2Fill className=' block sm:hidden' /> }    </button>
              <div>
                <button onClick={handlelogout}  className='flex  gap-2 rounded-xl bg-black text-white px-3 py-3 items-center'> <LuLogOut className='' /> Logout</button>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  )
}
