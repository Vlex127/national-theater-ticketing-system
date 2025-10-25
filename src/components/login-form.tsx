import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (

      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center mb-4">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-gray-400 text-sm">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="text-gray-300">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </Field>
        <Field>
          <div className="flex items-center justify-between mb-2">
            <FieldLabel htmlFor="password" className="text-gray-300">
              Password
            </FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-amber-500"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </Field>
        <Field>
          <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 w-full flex items-center justify-center gap-2">
            {/* Optional icon, if you want to keep it */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 ..."/>
            </svg> */}
            Login with Google
          </Button>
          <FieldDescription className="text-center text-gray-400 mt-2">
            Don't have an account?{" "}
            <a href="/signup" className="underline underline-offset-4 text-amber-500">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
 
  )
}