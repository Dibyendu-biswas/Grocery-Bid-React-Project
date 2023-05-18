import { useEffect, useState } from 'react'
import List from './component/List'
import Alert from './component/Alert'

const localstr=localStorage.getItem("list") ?JSON.parse(localStorage.getItem("list")):[];
function App() {
const [name,setName]=useState("")
const [alert,setAlert]=useState({show:false,type:"",msg:""})
const [list,setList]=useState(localstr)
const [isEding,setisEding]=useState(false)
const [editId,setEditId]=useState(null)

const handeler=(e)=>{
  e.preventDefault()
  if(!name){
    showAlert(true,"danger","please enter some text")
  }
  else if(name && isEding){
   setList(list.map((item)=>{
    if(item.id===editId){
      return {...item,title:name}
    }
    return item
   }))
   setName("")
   setEditId(null)
   setisEding(false)
   showAlert(true,"success","value changed")


  }
  else{
    showAlert(true,"success","Item is Added")
    const newId={id:new Date().getTime().toString(),title:name}
    setList([...list,newId])
    setName("")
  }
}

const showAlert=(show=false,type="",msg="")=>{
  setAlert({show,type,msg})
}
const clearList=()=>{
  showAlert(true,"danger","Clear all item")
  setList([])
}
const removeItem=(id)=>{
  showAlert(true,"danger","Remove item form the list")
 setList(list.filter((item)=>item.id !==id))


}
const editItem=(id)=>{
const editList =list.find((item)=>item.id === id)
setisEding(true)
setEditId(id)
setName(editList.title)

}

useEffect(()=>{
localStorage.setItem("list",JSON.stringify(list))
},[list])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handeler} >
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input type="text" className='grocery' value={name} onChange={(e)=>setName(e.target.value)}/>
          <button type='submit' className='submit-btn'>
            {isEding ? "edit" :"submit"}
          </button>
        </div>
      </form>
   {
    list.length>0 && (
      <div className='grocery-container'>
        <List item={list} removeItem={removeItem} editItem={editItem} />
       <button className='clear-btn' onClick={clearList}>clear items</button>
     </div>
    )
   }
    </section>
  )
}

export default App
