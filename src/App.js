import React ,{useState,useEffect} from 'react';


import './App.css';

function App() {
  
  // localStorage.clear();
  const [items,createItems]=useState("")
  const[count,setCount]=useState(0);
  const[changeBut,setChangeBut]=useState(true);

  const[getID,setGetID]=useState(-1);
  const list1=JSON.parse(localStorage.getItem('list'));
  const [list,createList]=useState(list1 ? JSON.parse(localStorage.getItem('list')):  [])


  function clearTheList(){
    createList([])
  }

  function editData(id){
    setChangeBut(false)
   const data=   list.find(elem=>elem.id==id)
   createItems(data.value);
   setGetID(data.id)
  }


  function deleteData(id){
    const data=   list.filter(elem=>elem.id!=id)
    createList(data)
   }


function submitData(e){
  e.preventDefault()
if(changeBut==true){
   setCount(prev=>prev+1)
    
     if(items=='')
        createList(prev=>prev)
   else { 
    //  const loda=[{value:items}]
    createList([...list,{id:count,value:items}])
    
   }
} 

else{
 const data= list.map(val=>{
 
  return val.id===getID && items.length>0? {...val,value:items} :val

 }
 
  
  )
  setChangeBut(true)
 createList(data)
}
     createItems("") 
}


useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
},[list])


  // console.log(items)
  return (
    <>
    <div className='Main-Container'>
      <h1>Todo App</h1>
      <form onSubmit={submitData}>
        <input type="text" 
        placeholder='Enter Items'
        className='Input'
        value={items}
        onChange={(e)=>createItems(e.target.value)}
        ></input>
       {changeBut? <input className="Golu" type='submit' value="Enter"></input> :<input className="Golu" type='submit' value="Edit"></input>}
      </form>
    
    <div className='list-butt'>
      { 
      <ol className='Saurav'>
        {list.map(e=><li>{e.value}
        
        
        {/* <button className='' >Delete</button> */}
        

        <i class="" className='fa-solid fa-trash button del-but' onClick={()=>deleteData(e.id)}></i>



        <i className="fa-solid fa-pen-to-square button" onClick={()=>editData(e.id)}></i>
         
        {/* <button className='' >Edit</button> */}
        </li>)}
      </ol>

      
      }

    
    </div>
    {list.length>0 ? <button class="Submit-But" onClick={clearTheList}>Clear List</button>:""}
    </div>

    </>
  );
}

export default App;
