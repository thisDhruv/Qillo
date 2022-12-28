import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../qillologo.png";
const host = "http://localhost:4500";
let alertOn = false;

export const Login = () => {
  let navigate = useNavigate();
  const onLoginPressed = async (e) => {
    e.preventDefault();
    console.log(e.target.elements["email"].value);
    const credentials = {
      email: e.target.elements["email"].value,
      password: e.target.elements["password"].value,
    };
    const response = await fetch(host + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if ( response.status === 200) {
      //user login redirect
      const json = await response.json();
      console.log(response.status + " "+json.authToken);
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      //alert show
      if (!alertOn) {
        document.getElementById("loginFail").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("loginFail").classList.add("hidden");
          alertOn = false;
        }, 4500);
        alertOn = true;
      }
    }
  };

  useEffect(() => {
    if(localStorage.getItem('token'))navigate('/');
})

  return (
    <>
      <div class="flex flex-col items-center justify-center px-6 py-1 mx-auto md:h-screen lg:py-0">
        <div
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
          Qillo
        </div>

        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" onSubmit={onLoginPressed}>
            <div
              id="loginFail"
              class="hidden p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span class="font-medium">Invalid Credentials!</span> Change a few
              things up and try Logging in again.
            </div>
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="flex items-start">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="/signup"
                class="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
