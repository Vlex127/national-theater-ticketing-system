import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NNTS Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:flex">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/national theatre.jpg"
            alt="Theater background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover dark:brightness-[0.2] dark:grayscale"
            quality={80}
          />
        </div>
      </div>
    </div>
  )
}
