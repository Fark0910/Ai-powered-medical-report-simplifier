import axios from "axios";
const calle=async(parsedResponse:any)=>{
    const show=await axios.post("http://patient-service:5002/patient", parsedResponse,{headers:{"Content-Type":"application/json"}})
    return show.data
}
export=calle;