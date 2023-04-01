import React, { useState, useEffect } from 'react'

const TotalItems = (props) => {
    console.table(props.cart)
    const [Total, setTotal] = useState(0)
    useEffect(() => {
        let temp = 0
        props.cart.forEach(element => {
            temp += element.amount
        });
        setTotal(temp)
    }, [props.updCart])
    
  return (
    <div style={{backgroundColor:"blue"}}>Total Items - {Total}</div>
  )
}

export default TotalItems