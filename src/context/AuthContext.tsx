// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { User } from '../types';
// import { users } from '../data/mockData';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   register: (email: string, username: string, password: string, role: 'supplier' | 'buyer') => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // const login = async (email: string, password: string): Promise<boolean> => {
//   //   // Mock login
//   //   try {
//   //     // In a real app, we would make an API call here
//   //     const foundUser = users.find(u => u.email === email);
      
//   //     if (foundUser) {
//   //       setUser(foundUser);
//   //       return true;
//   //     }
//   //     return false;
//   //   } catch (error) {
//   //     console.error("Login error:", error);
//   //     return false;
//   //   }
//   // };
//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
  
//       if (response.ok) {
//         // You can also extract more user data here if the backend sends it
//         const data = await response.json(); // Assuming backend sends user object
        
//         const loggedInUser: User = {
//           id: data.id || 'unknown-id',
//           username: data.username || 'unknown-username',
//           email: email,
//           role: data.role || 'buyer' // fallback role
//         };
  
//         setUser(loggedInUser);
//         return true;
//       } else {
//         console.error("Login failed:", await response.text());
//         return false;
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       return false;
//     }
//   };
  

//   const register = async (
//     email: string, 
//     username: string, 
//     password: string, 
//     role: 'supplier' | 'buyer'
//   ): Promise<boolean> => {
//     // Mock registration
//     try {
//       // In a real app, we would make an API call here
//       // For demo, we'll just simulate success
//       const newUser: User = {
//         id: `${users.length + 1}`,
//         username,
//         email,
//         role
//       };
      
//       setUser(newUser);
//       return true;
//     } catch (error) {
//       console.error("Registration error:", error);
//       return false;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       isAuthenticated: !!user, 
//       login, 
//       register, 
//       logout 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string, role: 'supplier' | 'buyer') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser: User = {
          id: data.id || 'unknown-id',
          username: data.username || 'unknown-username',
          email: email,
          role: data.role || 'buyer'
        };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser)); // Persist user data in localStorage
        return true;
      } else {
        console.error("Login failed:", await response.text());
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
    role: 'supplier' | 'buyer'
  ): Promise<boolean> => {
    try {
      const newUser: User = {
        id: `${Date.now()}`,  // Simulating unique ID generation
        username,
        email,
        role
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser)); // Persist new user in localStorage
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage on logout
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
