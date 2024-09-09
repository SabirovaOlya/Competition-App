import { memo, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import './style.scss'


const AuthForm = memo(({ onLogin }) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false);
   const [isVisible, setIsVisible] = useState(false);

   const toggleVisibility = () => setIsVisible(!isVisible);

   const handleLogin = (e) => {
      e.preventDefault();
      const data = { email, password }
      onLogin(data)
   };
 
 
   return (
      <div className="w-full login_form_wrapper">
         <form onSubmit={handleLogin}>
            <h2>Welcome</h2>
            <div>
               <Input 
                  className="max-w-xs bg-white rounded" 
                  placeholder="Enter your email"
                  type="email" 
                  label="Email"
                  value={email}
                  onChange={(e)=>{
                     setEmail(e.target.value)
                  }}
               />
               <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>{
                     setPassword(e.target.value)
                  }}
                  endContent={
                     <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                        <FaRegEye className="text-black"/>
                        ) : (
                           <FaEyeSlash className="text-black"/>
                        )}
                     </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs mt-3 bg-white rounded"
               />
            </div>
            <Button 
               type="submit"
               className="bg-blue-600 px-16 py-4 text-white font-semibold text-base"
            >Submit</Button>
         </form>
      </div>
   )
})

function Login({ onLogin }) {

   return (
      <section className='w-full h-full flex items-center justify-center login_element_wrapper'>
         <div className="login_form_container">
            <AuthForm onLogin={onLogin} />
         </div>
      </section>
   )
}

export default Login