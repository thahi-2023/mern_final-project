import React, { useState} from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

function Card(props) {
    let dispatch = useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options)

    //pass this data so user can store it
 const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
   // let foodItem = props.foodItems;

    const handleAddToCart = async ()=> {
        await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name,price:props.findPrice,qty: qty, size:size})

    }
  return (
    <div>
         <div>
        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "360"}}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill"}}/>
            <div classNmae="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                
                
                <div className='container w-100'>
                <select classname='m-2 h-100 bg-success rounded'>
                    {Array.from(Array(5), (e,i)=> {
                        return(
                            <option key={i+1} value={i+1}> {i+1}</option>
                        )
                    })}
                </select>
                <select className='m-2 h-100 bg-success rounded'>
                   
                   {priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                   })}

                </select>
                <div className='d-inline h-100 fs-5'>
                    Total Price
                </div>
                </div>
                <hr>
                </hr>
                <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}> Add to Cart</button>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Card