import React from 'react';


function SignIn() {
  return (
<>
<nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md  shadow ">
 <div className=" bg-base-400 shadow-sm flex justify-center items-stretch text-xl px-10 py-7 "  >
    <span className="text-2xl font-thin-bold ">PERFAURA</span>
    </div>  
</nav>
    <div className='w-full h-150 flex justify-center  items-center' style={{ backgroundImage: `url(${'https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148952495.jpg?semt=ais_items_boosted&w=740'})`}}>
        
    <div className="relative flex flex-col backdrop-blur-sm  shadow-sm border border-slate-200 w-96 rounded-lg ">
      
      
      <div className="relative m-2.5 mt-4 items-center shadow-sm flex justify-center text-slate-800 h-20 rounded-md border border-slate-200 ">

        <span className="text-2xl font-bold font-sans ">Login </span>
    
      </div>
      

     
      <div className="flex flex-col gap-4 px-6 py-4">
        
     
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-sm font-normal text-slate-900">Email</label>
          <input
            type="email"
            className="w-full bg-transparent placeholder:text-slate-500 text-slate-800 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Your Email"
          />
        </div>

        
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-sm font-normal text-slate-900">Password</label>
          <input
            type="password"
            className="w-full bg-transparent placeholder:text-slate-500 text-slate-900 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Your Password"
          />
        </div>

      </div>

      
      <div className="p-6 pt-0">
        <button
          className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Log in
        </button>
        <p className="flex justify-center mt-6 text-sm text-slate-600">
          Don’t have an account?
          <a href="#signup" className="ml-1 text-sm font-semibold text-slate-700 underline">
            Register
          </a>
        </p>
      </div>
    </div>
    </div>
    </>
  );
};

export default SignIn;
