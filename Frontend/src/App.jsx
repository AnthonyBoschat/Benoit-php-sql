import { useEffect, useState } from "react"


export default function App() {
  
  const [value, setValue] = useState("")
  const [datas, setDatas] = useState([])

  useEffect(() => {
    fetch("http://localhost/getSentence.php")
    .then(response => response.json())
    .then(result => {
      setDatas(result)
    })
  }, [])

  useEffect(() => {
    console.table(datas)
  }, [datas])

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
      setDatas(current => [...current, result])
      setValue("")
    })
  }

  const deleteItem = async (itemID) => {
    const response = await fetch("http://localhost/deleteItem.php", {
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({itemID}) 
    })
    const result = await response.json()
    setDatas(datas.filter(data => data.id !== result))
    console.log("delete result",result)

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
          <li key={index}>
            {data.texte}
            <button onClick={() => deleteItem(data.id)} style={{marginLeft:"1rem"}}>Supprimer</button>  
          </li>
      ))}
    </ol>

    </>
  )
}
