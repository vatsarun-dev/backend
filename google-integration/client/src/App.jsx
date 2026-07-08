import { Eye } from "lucide-react";

export default function Register() {
  const handleGoogleSubmit = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-[#5b5b5b] flex items-center justify-center p-8">
      <div className="w-full max-w-7xl h-[760px] bg-black rounded-3xl overflow-hidden shadow-2xl grid grid-cols-2">
        {/* Left Side */}
        <div className="relative p-10">
          <div className="absolute inset-6 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-300 via-purple-600 to-black"></div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.25),transparent_45%)]"></div>

            <div className="relative h-full flex flex-col justify-end items-center text-white pb-16">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                <span className="text-lg font-semibold">OnlyPipe</span>
              </div>

              <h2 className="text-5xl font-bold text-center">
                Get Started with Us
              </h2>

              <p className="mt-4 text-center text-gray-300 text-lg">
                Complete these easy steps to register
                <br />
                your account.
              </p>

              <div className="mt-12 space-y-4 w-[420px]">
                <div className="bg-white text-black rounded-xl p-5 flex items-center gap-5">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                    1
                  </div>
                  <span className="font-semibold">Sign up your account</span>
                </div>

                <div className="bg-[#2A2A2A] rounded-xl p-5 flex items-center gap-5 text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-[#404040] flex items-center justify-center text-sm">
                    2
                  </div>
                  <span>Set up your workspace</span>
                </div>

                <div className="bg-[#2A2A2A] rounded-xl p-5 flex items-center gap-5 text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-[#404040] flex items-center justify-center text-sm">
                    3
                  </div>
                  <span>Set up your profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center">
          <div className="w-[420px]">
            <h2 className="text-4xl font-bold text-white text-center">
              Sign Up Account
            </h2>

            <p className="text-gray-400 text-center mt-3">
              Enter your personal data to create your account.
            </p>

            {/* Social Buttons */}

            <div className="grid grid-cols-2 gap-4 mt-10">
              <button
                onClick={handleGoogleSubmit}
                className="border border-gray-700 rounded-xl h-14 text-white flex justify-center items-center gap-3 hover:border-white transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5"
                />
                Google
              </button>

              <button className="border border-gray-700 rounded-xl h-14 text-white flex justify-center items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.88 10.96.58.1.79-.25.79-.56v-2.17c-3.2.69-3.88-1.38-3.88-1.38-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.17a10.9 10.9 0 0 1 5.8 0c2.2-1.48 3.17-1.17 3.17-1.17.64 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.38-5.25 5.66.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                Github
              </button>
            </div>

            {/* Divider */}

            <div className="flex items-center my-8">
              <div className="flex-1 border-b border-gray-700"></div>
              <span className="mx-4 text-gray-500">Or</span>
              <div className="flex-1 border-b border-gray-700"></div>
            </div>

            {/* Names */}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white">First Name</label>

                <input
                  className="mt-2 w-full h-14 rounded-xl bg-[#1d1d1d] px-4 text-white outline-none border border-transparent focus:border-purple-500"
                  placeholder="eg. John"
                />
              </div>

              <div>
                <label className="text-sm text-white">Last Name</label>

                <input
                  className="mt-2 w-full h-14 rounded-xl bg-[#1d1d1d] px-4 text-white outline-none border border-transparent focus:border-purple-500"
                  placeholder="eg. Francisco"
                />
              </div>
            </div>

            {/* Email */}

            <div className="mt-6">
              <label className="text-sm text-white">Email</label>

              <input
                className="mt-2 w-full h-14 rounded-xl bg-[#1d1d1d] px-4 text-white outline-none border border-transparent focus:border-purple-500"
                placeholder="eg. johnfrans@gmail.com"
              />
            </div>

            {/* Password */}

            <div className="mt-6">
              <label className="text-sm text-white">Password</label>

              <div className="relative mt-2">
                <input
                  type="password"
                  className="w-full h-14 rounded-xl bg-[#1d1d1d] px-4 pr-12 text-white outline-none border border-transparent focus:border-purple-500"
                  placeholder="Enter your password"
                />

                <Eye
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Must be at least 8 characters.
              </p>
            </div>

            {/* Button */}

            <button className="w-full h-14 mt-8 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
              Sign Up
            </button>

            <p className="text-center text-gray-400 mt-8">
              Already have an account?
              <span className="text-white font-semibold cursor-pointer ml-2">
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
