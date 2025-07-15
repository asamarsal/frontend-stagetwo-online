import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function About() {
  return (
    <div className="flex flex-col items-center mt-6 min-h-svh select-none">
      <h1 className="text-3xl font-bold mb-4 text-black">Using of Shadcn</h1>
        <Card className="w-full max-w-[400px]">
            <CardHeader>
                <CardTitle className="text-3xl text-center">About</CardTitle>
            </CardHeader>

            <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>

            <CardContent className="flex justify-center gap-2">
                <Link to="/">
                    <Button className="bg-blue-500">Home</Button>
                </Link>
                <Link to="/posts">
                    <Button className="bg-green-500">Post Detail</Button>
                </Link>
            </CardContent>
      </Card>
    </div>
  )
}