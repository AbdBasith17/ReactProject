import React, { useState } from 'react';
import axios from 'axios';

function Register() {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReg = async () => {

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
      if (!emailCheck.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    
    if (password.length < 4) {
  alert('Password must be at least 4 characters long.');
  return;
}

    try {
      await axios.post('http://localhost:3000/users', {
        name,
        email,
        password
      });

      alert('User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error posting user:', error);
      alert('Error registering user.');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md shadow">
        <div className="bg-base-400 shadow-sm flex justify-center items-stretch text-xl px-10 py-7">
          <span className="text-2xl font-thin-bold">PERFAURA</span>
        </div>
      </nav>

      <div
        className="w-full h-150 flex justify-center items-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148952495.jpg?semt=ais_items_boosted&w=740')`,
        }}
      >
        <div className="relative flex flex-col backdrop-blur-sm shadow-xl border border-slate-200 w-96 rounded-lg">
          <div className="relative m-2.5 mt-4 items-center shadow-sm flex justify-center text-green-800 h-15 rounded-md border border-slate-200">
            <span className="text-2xl font-bold font-sans">Register</span>
          </div>

          <div className="flex flex-col gap-4 px-6 mt-1 mb-4">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm font-normal text-slate-900">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-500 text-slate-800 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Name"
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm font-normal text-slate-900">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-500 text-slate-800 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Email"
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm font-normal text-slate-900">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-500 text-slate-900 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter Password"
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm font-normal text-slate-900">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-500 text-slate-900 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Re-enter Password"
              />
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              onClick={handleReg}
              className="w-full rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-slate-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Register
            </button>

            <p className="flex justify-center mt-6 text-sm text-slate-600">
              Already have an account?
              <a href="/signin" className="ml-1 text-sm font-semibold text-slate-700 underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
