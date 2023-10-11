import { userAxios } from "../axios/axios";

export const otpVerification = async ({otp})=>{
    try {
        const response = await userAxios.post('/otp-verification',otp);
        if (response.status === 200 || response.data.message=='success') {
            if(response){
              return true;
            }
          } else {
            return false;
          }
    } catch (error) {
        return false;
    }
}