import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserActions } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../store/ProductService";
import { toast } from "sonner";
import { GetAuctions } from "../../store/AuctionSlice";
import { useLoginMutation } from "../../store/UserService";
import { Alert } from "@mui/material";

const Login = () => {
  const disptach = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const [isError, setIsError] = useState(false);
  // const [err, setErr] = useState("");

  // const { isLoading, isSuccess, data } = useLoginMutation();

  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  // const { products, data1 } = useGetProductsQuery();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };
  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    // setIsLoading(true);

    // const postUser = async () => {
    //   try {
    //     // const response = await fetch(
    //     //     "https://auctionwars.onrender.com/api/auth/login",
    //     //     {
    //     //         method: 'POST',
    //     //         headers: {
    //     //             'Content-Type': 'application/json'
    //     //         },
    //     //         body: JSON.stringify(User)
    //     //     }
    //     // )
    //     const response = await axios.post(
    //       "https://auctionwars.onrender.com/api/auth/login",
    //       User
    //     );

    //     // if (!response) {
    //     //     throw new Error('Error:', response);
    //     //   }
    //     // const responseData = await response.json();

    //     document.cookie = `jwtToken=${response.data.token}; path=/;`;
    //     disptach(UserActions.login(response.data));
    //     localStorage.setItem("userInfo", JSON.stringify(response.data));
    //     await disptach(GetAuctions());
    //     // setIsLoading(false);
    //     navigate("/");
    //   } catch (error: any) {
    //     // setIsError(true);
    //     // setIsLoading(false);
    //     // setErr(error.response.data.message);
    //   }
    // };
    // postUser();

    login(User)
      .unwrap()
      .then((response) => {
        document.cookie = `jwtToken=${response.token}; path=/;`;
        disptach(UserActions.login(response));
        console.log(response);
        localStorage.setItem("userInfo", JSON.stringify(response));
        toast.success("Login Successfull");
        // disptach(GetAuctions());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(data);
  };

  return (
    <div className="w-full h-screen flex   justify-center items-center  ">
      {/* <div className="absolute top-0 left-0 bg-amber-600 h-full w-[30vw]"></div> */}
      {/* <div className="absolute top-0 right-0 bg-amber-600 h-full w-[30vw]"></div> */}
      <div className="w-[400px] bg-[#2a2e35] p-10 rounded-2xl">
        <h1 className="text-2xl">Login with you deatails</h1>
        {/* {isError && (
          <Alert className="my-2" variant="filled" severity="error">
            {error?.message}
          </Alert>
        )} */}

        {isError && toast.error("Invalid Credentials")}
        <form onSubmit={submitHandler} className="flex flex-col text-black">
          <input
            className="my-3 p-1"
            type="email"
            onChange={emailChangeHandler}
            placeholder="Enter your email"
          />
          <input
            className="my-3 p-1"
            type="password"
            onChange={passwordChangeHandler}
            placeholder="Enter your password"
          />
          <button
            disabled={isLoading}
            className={`${isLoading && "bg-amber-700"} my-4 p-2 bg-amber-600`}
            type="submit"
          >
            Login
          </button>
        </form>
        <p>
          New to the website ,{" "}
          <Link className="text-blue-500" to="/register">
            {" "}
            regiter here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
