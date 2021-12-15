import { useEffect, useState } from "react";
import helloService from "../services/helloService.js"

//function - arrow function
// function Hello() - normal function "stateless"
const Hello = () => {
    //function hooks
    const [hello, setHello] = useState("walang api, pasensiya ka na")

    //hooks
    useEffect(() => {
        helloService.getHello()
        .then(
            response => {
                setHello(response.data);
            }
        )
        .catch(
            err => {console.log("something went wrong")}
        )
    })
    return hello;
}
export default Hello;