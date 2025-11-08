"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  
  const callbackUrl = searchParams?.get("callbackUrl") || "/admin/dashboard"

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl)
    }
  }, [status, callbackUrl, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("Attempting sign in...") // Debug
      
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
        callbackUrl
      })

      console.log("Sign in result:", result) // Debug - check this in browser console

      if (result?.error) {
        console.error("Sign in error:", result.error) // Debug
        setError(`Login failed: ${result.error}`)
      } else if (result?.ok) {
        console.log("Sign in successful, redirecting...") // Debug
        window.location.href = callbackUrl
      } else {
        setError("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login exception:", error) // Debug
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center mb-4">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-gray-400 text-sm">
            Enter your credentials to login to your account
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        
        <Field>
          <FieldLabel htmlFor="email" className="text-gray-300">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </Field>
        
        <Field>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 w-full flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Field>
        
        <div className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="/register" className="text-amber-500 hover:underline">
            Sign up
          </a>
        </div>
      </FieldGroup>
    </form>
  )
}