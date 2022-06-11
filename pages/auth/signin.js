import { useState } from "react"
import { getProviders, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function SignIn({ providers }) {
  const router = useRouter()
  const { callbackUrl } = router.query
  const [email, setEmail] = useState("")
  const { data: session, status } = useSession()

  return (
    <>
      {Object.values(providers).map((provider) => {
        if (provider.id === "workos") {
          return (
            <div key={provider.id}>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <button
                onClick={() =>
                  signIn(provider.id, undefined, {
                    domain: email.split("@")[1],
                  })
                }
              >
                Sign in with SSO
              </button>
            </div>
          )
        }

        return (
          <div key={provider.id}>
            <button onClick={() => signIn(provider.id, {
                callbackUrl: callbackUrl,
            })}>
              Sign in with ss {provider.name}
            </button>
          </div>
        )
      })}
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}