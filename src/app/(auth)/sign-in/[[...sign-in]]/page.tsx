import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex size-full min-h-screen flex-col items-center justify-center bg-foreground">
      <SignIn />
    </div>
  )
}
