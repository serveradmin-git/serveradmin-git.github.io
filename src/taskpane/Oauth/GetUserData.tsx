import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    data: {
        userId: string;
        userName: string;
        currency: string;
    };
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
}

export const GetUserData = () => {
    const LoginToken = localStorage.getItem("API_Token");
    const decodedToken: JwtPayload = jwtDecode(LoginToken);
    const User_Name = decodedToken.data.userName;
    const User_ID = decodedToken.data.userId;
    const userCurrencyName = decodedToken.data.currency;
    const API_Key = "14FF3618556206C62CAD177EC037C952"

    return {
        User_Name,
        User_ID,
        API_Key,
        userCurrencyName
    };
}
