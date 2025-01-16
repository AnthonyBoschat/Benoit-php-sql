import { useEffect, useState } from "react"


export default function App() {
  
  const [value, setValue] = useState("")
  const [datas, setDatas] = useState([])

  useEffect(() => {
    fetch("http://localhost/getSentence.php")
    .then(response => response.json())
    .then(result => {
      console.log("debug", result)
      setDatas(result)
    })
  }, [])

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
      setDatas(current => [...current, {id:45, texte:result}])
      setValue("")
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
      {datas.map((data, index) => (
        <li key={index}>{data.texte}</li>
      ))}
    </ol>

    </>
  )
}
