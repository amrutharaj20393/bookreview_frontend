import React, { createContext, useState } from 'react'
  export const addBookStatusContext = createContext("")

function ContextShare({children}) {

   const [addBookStatus, setAddBookStatus] = useState({})
  return (
     

            <addBookStatusContext.Provider value={{addBookStatus, setAddBookStatus }}>
                {
                    children
                }

            </addBookStatusContext.Provider>
      
  )
}

export default ContextShare