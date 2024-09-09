import { Button } from "@nextui-org/react"

export const PageTitle = ({ title, onNavigate }) =>{
    return(
        <div className="px-2 py-3 flex justify-between">
            <h2>{title}</h2>
            <Button color="primary"
                size="md"
                className="font-bold rounded"
                onClick={() => onNavigate()}
            >
                ADD
            </Button> 
        </div>
    )
}