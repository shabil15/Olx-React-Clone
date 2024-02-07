import {createContext,useState,useEffect} from 'react'
import {auth} from './Config';
import {onAuthStateChanged} from 'firebase/auth'

export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user,setUser] = useState(null);
  console.log('user',user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user)=> {
      setUser(user);
    })
  
    return () => unsubscribe();
  }, [])

  return(
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
  
}