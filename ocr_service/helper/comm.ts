import axios from "axios";
const calle=async(parsedResponse:any)=>{
    const show=await axios.post("http://normalize-service:5001/normalize", parsedResponse,{headers:{"Content-Type":"application/json"}})
    return show.data
}
export=calle;