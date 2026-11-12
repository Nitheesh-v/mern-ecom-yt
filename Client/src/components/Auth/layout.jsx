import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <>


            <div className="2xl:container mx-auto ">
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-row  justify-around items-center min-h-screen  bg-black  ">
                        <h1 className="text-blue-700 text-3xl">Auth</h1>
                    </div>

                    <div className="flex flex-row justify-center items-center" >

                        <div className="" >
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default AuthLayout