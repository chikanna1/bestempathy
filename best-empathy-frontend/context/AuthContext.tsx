import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config";

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const router = useRouter();

  // useEffect(() => {
  //   checkUserLoggedIn(user);
  // }, []);

  //Register User

  const register = async (
    {
      title,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      classification,
      membershipType,
      professionalTitle,
    },
    address,
    formattedAddress,
    city,
    state,
    country,
    coordinates
  ) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        formattedAddress,
        classification,
        professionalTitle,
        membershipType,
        city,
        state,
        country,
        coordinates,
      }),
    });

    const registerData = await res.json();
    console.log(registerData);
    setData(registerData);

    if (res.ok) {
      // setUser(registerData.user);
      return {
        message: "Registration Successful",
        registrationSuccessful: true,
      };
    } else {
      return { message: registerData.message, registrationSuccessful: false };
    }
  };

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();
    setData(data);

    if (res.ok) {
      setUser(data.user);
      return { message: "Login Successful", loginSuccessful: true };
    } else {
      if (data.message === "Your account email is not confirmed") {
        return {
          message:
            "Your Account Email is Not Confirmed. Please Check Your Confirmation Email and Confirm Your Account",
          loginSuccessful: false,
        };
      } else {
        return {
          message: "Invalid Email/Password Combination",
          loginSuccessful: false,
        };
      }
    }
  };

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  const checkUserLoggedIn = async (user: any) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setUser(null);
      // router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        setError,
        data,
        checkUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
