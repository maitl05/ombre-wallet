import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingOverlay from 'components/LoadingOverlay'

//TODO: this page checks for existence of config file for user and if
//TODO: it doesn't find one redirects to welcome page otherwise
//TODO: redirects the wallet-select page in other scenarios it tries
//TODO: to connect to remote node and if fails shows error
//TODO debug

function Index() {
  const [isConnected, setIsConnected] = React.useState(false)
  const router = useRouter()
  //TODO check for config file and redirect
  setTimeout(() => {
    setIsConnected(true)
  }, 3000)

  useEffect(() => {
    if (isConnected) {
      router.push('/wallet/info')
    }
  }, [isConnected])

  return (
    <>
      <div className="flex flex-col justify-center items-center text-2xl w-full h-screen">
        <span>
          connecting to remote node...
          <LoadingOverlay visible={true} />
        </span>
      </div>
    </>
  )
}

export default Index
