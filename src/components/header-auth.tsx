import {
    RegisterLink,
    LoginLink,
    LogoutLink,
  } from "@kinde-oss/kinde-auth-nextjs/components"
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
  
  import { signOutAction } from "@/app/actions"
  import { hasEnvVars } from "@/utils/supabase/check-env-vars"
  import { Badge } from "./ui/badge"
  import { Button } from "./ui/button"
  
  export default async function AuthButton() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
  
    if (!hasEnvVars) {
      return (
        <>
          <div className='flex gap-4 items-center'>
            <div>
              <Badge
                variant={"default"}
                className='font-normal pointer-events-none'
              >
                Please update .env.local file with anon key and url
              </Badge>
            </div>
            <div className='flex gap-2'>
              <Button
                asChild
                size='sm'
                variant={"outline"}
                disabled
                className='opacity-75 cursor-none pointer-events-none'
              >
                <LoginLink className='btn btn-ghost sign-in-btn'>
                  Sign in
                </LoginLink>
              </Button>
              <Button
                asChild
                size='sm'
                variant={"default"}
                disabled
                className='opacity-75 cursor-none pointer-events-none'
              >
                <RegisterLink className='btn btn-dark'>Sign up</RegisterLink>
              </Button>
            </div>
          </div>
        </>
      )
    }
    return user ? (
      <div className='flex items-center gap-4'>
        Hey, {user.given_name}!
        <form action={signOutAction}>
          <Button type='submit' variant={"outline"}>
            <LogoutLink className='text-subtle'>Log out</LogoutLink>
          </Button>
        </form>
      </div>
    ) : (
      <div className='flex gap-2'>
        <Button asChild size='sm' variant={"outline"}>
          <LoginLink className='btn btn-ghost sign-in-btn'>Sign in</LoginLink>
        </Button>
        <Button asChild size='sm' variant={"default"}>
          <RegisterLink className='btn btn-dark'>Sign up</RegisterLink>
        </Button>
      </div>
    )
  }