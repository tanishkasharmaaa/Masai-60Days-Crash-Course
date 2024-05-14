import { useEffect } from "react"

export function UpdateTitle(){
    function update(){
        document.title='Update Title'
    }
    useEffect(()=>{
        update()
        return()=> document.title='React App'
    },[])
    return (
        <div>
            <div>
                <h2>Document Title Updated!</h2>
            </div>
        </div>
    )
}