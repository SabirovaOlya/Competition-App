import { useNavigate } from "react-router-dom"
import { Button } from "@nextui-org/react"
import { IoIosBackspace } from "react-icons/io";


export const BackButton = ({ path }) =>{
    const navigate = useNavigate()

    return(
        <div>
            <Button
                className="text-lg"
                onClick={(e) =>{
                    navigate(path, { replace: true})
                }}
                color="danger" variant="bordered" startContent={<IoIosBackspace />}
            >
                Back
            </Button>
        </div>
    )
}