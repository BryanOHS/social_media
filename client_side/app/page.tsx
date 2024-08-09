import LoginForm from "./Components/LoginForm";
import MTBackground from "./Components/MTBackground";
import RegisterForm from "./Components/RegisterForm";

export default function Home() {
  return (
    <main className=" w-screen h-screen relative grid">
      <MTBackground/>
      <section className="w-[60%] h-[70%] translate-y-20 bg-black relative z-10 place-self-center grid grid-cols-2 text-white">
        <div className="p-4 w-full h-full flex flex-col text-center justify-center">
          <h1 className="text-5xl">Register</h1>
          <RegisterForm/>
        </div>
        <div className="p-4 w-full h-full flex flex-col text-center justify-center">
          <h1 className="text-5xl">Login</h1>

          <LoginForm/>


        </div>

      </section>


      
    </main>
  );
}
