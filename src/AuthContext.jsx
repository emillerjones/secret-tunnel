import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async(formData)=>{
    const username = formData.get("name")

    const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', 
              { 
                method: "POST", 
                headers: { 
                  "Content-Type": "application/json" 
                }, 
                body: JSON.stringify({ 
                  username: username
                }) 
              })   
    const data = await response.json();
    console.log(data.token);
    setToken(data.token);
    setLocation("TABLET");
  }


  // TODO: authenticate
  const authenticate = async()=>{
    if (token){
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', 
                { 
                  method: "GET", 
                  headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                  }
                })
      if (!response.ok){
        throw new Error("Bad token");
      }
      setLocation("TUNNEL");
    }
    else{
      throw new Error("No token");
    }
  }





  const value = { location, signup, authenticate};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
