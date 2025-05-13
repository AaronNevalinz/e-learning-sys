import { AppContext } from "@/context/AppContext"
import { useContext } from "react"
import { useLocation } from "react-router-dom"

export default function SearchReturnComponent() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get("q")
  const {token} = useContext(AppContext)

  return (
    <div className="mt-6">
      <div>
        <h1 className="text-4xl font-semibold">Results for: {query}</h1>
      </div>
      <div>
        
      </div>
    </div>
  )
}
