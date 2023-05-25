import { login } from "@/api";
import InputText from "@/components/common/input-text";
import { getToken, setToken } from "@/local-storage";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { push } = useRouter();

  const changeHandler = (fn: (str: string) => void) => (e: ChangeEvent) =>
    fn((e.target as HTMLInputElement).value);

  const onClickHandler = () => {
    login(email, password)
      .then((res) => {
        setToken(res.data.token);
        push("/");
      })
      .catch((err) => console.log("ERRRR", err));
  };

  useEffect(() => {
    if (getToken()) {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center md:flex-row flex-row min-h-screen max-h-screen bg-Lbgimg">
      <div className="flex items-center justify-center w-full md:w-8/12 basis-1/2"></div>
      <div className="flex flex-col	w-full max-w bg-white h-screen basis-1/2">
        <div className="flex h-28 items-center justify-center bg-Chinese-Black-sidebar">
          <span className="font-bold text-sm">
            <Image
              src="/Logowhite 1.svg"
              alt="Divine Logo"
              height={"36"}
              width={"102"}
            />
          </span>
        </div>

        <div className="w-full bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 h-full">
          <div className="w-full max-w-md space-y-8 flex items-center justify-center">
            <div>
              <p className="mt-2 text-gray-600 font-medium">
                Welcome to Divine Solitaires...
              </p>
            </div>
          </div>
          <div className="w-full sm:max-w-md p-5 mx-auto">
            <InputText
              className="w-full"
              htmlFor="email"
              id="email"
              label="Email"
              name="email"
              onChange={changeHandler(setEmail)}
              type="text"
              value={email}
            />
            <InputText
              className="w-full"
              htmlFor="password"
              id="password"
              label="Password"
              name="password"
              onChange={changeHandler(setPassword)}
              type="password"
              value={password}
            />
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Remember Me
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={onClickHandler}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-Chinese-Black-sidebar border border-transparent rounded-md font-semibold capitalize text-white hover:bg-Chinese-Black-sidebar active:bg-Chinese-Black-sidebar focus:outline-none focus:bg-Chinese-Black-sidebar focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              >
                Log In
              </button>
            </div>
            <div className="mt-6 text-center align-baseline">
              <p>
                For queries reach out to{" "}
                <strong>it@divinesolitaires.com</strong> or
                <strong> customercare@divinesolitaires.com</strong>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
