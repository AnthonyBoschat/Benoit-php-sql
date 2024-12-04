import { useState } from "react"


export default function App() {
  
  const [value, setValue] = useState("")

  const sendForm = (e) => {
    e.preventDefault()
    fetch("http://localhost/", {
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({input:value}) 
    })
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
