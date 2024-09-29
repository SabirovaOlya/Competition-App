import { Button } from "@nextui-org/react"

export const PageTitle = ({ title, onNavigate, is_exclude_form }) =>{
    return(
        <div className="px-2 pt-3 pb-2 flex justify-between">
            <h2>{title}</h2>
            {
                is_exclude_form ?
                <></> :
                <Button color="primary"
                    size="md"
                    className="font-bold rounded"
                    onClick={() => onNavigate()}
                >
                    ADD
                </Button> 
            }
        </div>
    )
}