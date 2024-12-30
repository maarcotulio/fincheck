import illustration from "../../assets/images/illustration.svg";
import { Logo } from "../components/Logo";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className=" w-full h-full flex items-center justify-center flex-col lg:w-1/2">
        <Logo className="h-6 text-gray-500" />
        <div className="mt-16 w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className=" w-1/2 h-full hidden  justify-center items-center p-8 relative  lg:flex">
        <img
          src={illustration}
          alt="Ilustration"
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />
        <div className="max-w-[656px] mx-8 bg-white p-10 absolute rounded-b-[32px] bottom-8 ">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
