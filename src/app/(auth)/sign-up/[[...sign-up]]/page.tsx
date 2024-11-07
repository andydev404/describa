import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex size-full min-h-screen flex-col items-center justify-center bg-foreground">
      <SignUp />
    </div>
  )
}
