import { GalleryVerticalEnd } from "lucide-react"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-gray-900 text-white">
      {/* Left side with header and form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo and company name */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium text-amber-500">
            <div className="bg-amber-500 text-amber-900 flex h-6 w-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="w-4 h-4" />
            </div>
            <span className="text-lg font-semibold">Acme Inc.</span>
          </a>
        </div>
        {/* Signup form container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      
      {/* Right side with background image */}
      <div className="bg-gray-800 relative hidden lg:block">
        <img
          src="/national theatre.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover brightness-75 grayscale"
        />
      </div>
    </div>
  )
}