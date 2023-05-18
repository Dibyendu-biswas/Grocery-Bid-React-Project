import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({item,removeItem,editItem}) => {
  return (
    <section className='grocey-list'>
      {
        item.map((items)=>{
            const {id,title}=items
            return(
                <div className="grocery-item" key={id}>
                <p className='title'> {title}</p>
                <div className='btn-container'>
                    <button className='edit-btn' onClick={()=>editItem(id)}><FaEdit/></button>
                    <button className='delete-btn' onClick={()=>removeItem(id)}><FaTrash/></button>
                </div>
            </div>
            )
        })
      }

    </section>
  )
}

export default List