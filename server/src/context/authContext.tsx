// import { createContext, useContext } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const logout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   return (
//     <Auth.Provider value={{ logout }}>
//       {children}
//     </Auth.Provider>
//   );
// };