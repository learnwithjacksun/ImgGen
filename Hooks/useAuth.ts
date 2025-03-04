import { AuthContext } from "@/Context/AuthContext";
import { useContext } from "react";



const useAuth = () => {
  const context = useContext(AuthContext);  

    if(!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return {...context}
}

export default useAuth