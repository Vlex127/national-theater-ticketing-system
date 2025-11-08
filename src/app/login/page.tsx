import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import { Suspense } from "react" // Add this import
import { LoginForm } from "@/components/login-form"
import { Spinner } from "@/components/ui/spinner"

// Add a loading fallback component
function LoginFormSkeleton() {
  return (
    <div className="flex items-center justify-center py-12">
      <Spinner />
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-gray-900 text-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-amber-500 text-gray-900 flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-semibold text-lg">NNTS Inc.</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* Wrap LoginForm in Suspense */}
            <Suspense fallback={<LoginFormSkeleton />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 relative hidden lg:flex">
        <div className="relative w-full h-full overflow-hidden">
          <Image 
            src="/national theatre.jpg" 
            quality={75}
            alt="National Theatre"
            fill // Use fill instead of width/height for better responsive behavior
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}