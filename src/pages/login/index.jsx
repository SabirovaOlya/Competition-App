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
                  className="max-w-xs" 
                  type="email" 
                  label="Email"
                  variant="bordered"
               />
               <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                     <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                        <FaRegEye />
                        ) : (
                           <FaEyeSlash />
                        )}
                     </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs mt-3"
               />
            </div>
            <Button>Submit</Button>
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