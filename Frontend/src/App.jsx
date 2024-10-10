import { useState } from "react"


export default function App() {
  
  const [value, setValue] = useState("")

  const sendForm = (e) => {
    console.log(0)
    e.preventDefault()
    fetch("http://localhost/index.php")
    .then((response) => response.json())
    .then(result => {
      console.log(result)
    })
  }
  
  return (
    <>
    <main>
      <form onSubmit={sendForm} action="POST">
        <input onChange={(e) => setValue(e.currentTarget.value)} value={value} type="text" />
        <input type="submit" />
      </form>
    </main>
    
    <ol>
      <li>coucou</li>
    </ol>

    </>
  )
}
