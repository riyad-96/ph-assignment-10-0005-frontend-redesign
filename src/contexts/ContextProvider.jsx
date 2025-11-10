import FunctionContext from "./FunctionContext";
import GlobalContext from "./GlobalContext"

function ContextProvider({children}) {
  return (
    <GlobalContext>
      <FunctionContext>
        {children}
      </FunctionContext>
    </GlobalContext>
  )
}

export default ContextProvider;