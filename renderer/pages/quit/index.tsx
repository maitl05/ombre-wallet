import React from 'react'
import { NextPage } from 'next'
import LoadingOverlay from 'components/LoadingOverlay'

const Quit: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-2xl w-full h-screen gap-2">
      <span>Closing...</span>
      <LoadingOverlay visible={true} />
    </div>
  )
}

export default Quit
