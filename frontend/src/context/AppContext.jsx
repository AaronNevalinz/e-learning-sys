/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { API_URL } from "@/config";
import axios from "axios";
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    const [user, setUser]= useState(JSON.parse(localStorage.getItem('user')))
    const [userCourses, setUserCourses] = useState([]);

      const fetchUserCourses = () => {
        var options = {
          method: "GET",
          url: `${API_URL}/enrollments/me`,
          headers: {
            Authorization:`Bearer ${token}`
          },
        };
    
        axios
          .request(options)
          .then(function (response) {
            const data = response.data
            setUserCourses(data.result)
            console.log(data);
          })
          .catch(function (error) {
            console.error(error);
          });
      };
    return <AppContext.Provider value={{token,fetchUserCourses, setToken, userRole, setUserRole, user, userCourses, setUserCourses, setUser}}>
        {children}
    </AppContext.Provider>
}