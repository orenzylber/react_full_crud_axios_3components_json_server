// this is the last version that Eyal updated from 02:27:00
// In 03:07:00 he shows how to add a third component, that counts the total number of items in the cart
import React, { useEffect, useState } from 'react'

const DisCart = (props) => {
    const [total, settotal] = useState(0)
    useEffect(() => {
        let temp = 0
        console.log("update")
        props.myCart.forEach(element => {
            console.log(element.price);
            temp += (element.price * element.amount)
        });
        settotal(temp)
    }, [props.updCart])

    return (
        <div style={{backgroundColor:"orange"}}>
            My Cart
            {props.myCart.map((prod, ind) => <div key={ind}>
                <button onClick={() => props.add2Cart(prod, -1)} className='btn btn-danger'> - </button>
                Desc: {prod.desc},  Price: {prod.price},Amount: {prod.amount} 'Total {prod.price * prod.amount}
                <button onClick={() => props.add2Cart(prod, 1)} className='btn btn-success'>+ </button>
            </div>)}
            <h1>Only {total}</h1>
        </div>
    )
}

export default DisCart
