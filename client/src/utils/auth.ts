
import { type JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // Decode the JSON Web Token (JWT) using the jwtDecode function, specifying the expected payload type as UserData.
    // The getToken() method is called to retrieve the JWT, which is then passed to jwtDecode to extract and return its payload.
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();

    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // If the token is expired, return true indicating that it is expired.
        return true;
      }
    } catch (err) {
      
      return false;
    }
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.assign('/home'); 
  }

  logout() {
    localStorage.removeItem('token');

    
    

    window.location.assign('/');
  }
}

export default new AuthService();
