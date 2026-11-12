
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
const Home=() =>{
    return (
        <>
      <div>
        <h1>E-Commerce</h1>
       <Link to="/auth/login"> <button >Login</button></Link> 
       <Link to="/auth/register"> <button >Register</button></Link>
      </div>
      </> 
    ) 
  }

  export default Home