// this is the last version that Eyal updated from 02:27:00
// In 03:07:00 he shows how to add a third component, that counts the total number of items in the cart

// It has a list of products with crud
// it has a cart that you can add products to, or remove them
// it counts how many products taken from each kind and the total amount to pay
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisCart from './DisCart';
import TotalItems from './TotalItems';

const App = () => {
  const [products, setproducts] = useState([])
  const [desc, setdesc] = useState("")
  const [price, setprice] = useState(0)
  const [refreshFlag, setrefreshFlag] = useState(true)
  const MY_SERVER = 'http://localhost:5000/products'
  const [updCart, setupdCart] = useState(false)
  const getData = async () => {
    axios.get(MY_SERVER).then(res => setproducts(res.data))
    // console.table(products);
  }

  const delItem = (id) => {
    axios.delete(`${MY_SERVER}/${id}`)
    // setproducts(products.filter(item => item.id != id))
    setrefreshFlag(!refreshFlag)
  }

  const AddProduct = () => {
    axios.post(MY_SERVER, { desc, price })
    setrefreshFlag(!refreshFlag)
  }
  const updItem = async (prod) => {
    let res = await axios.put(`${MY_SERVER}/${prod.id}`, { desc, price })
    setrefreshFlag(!refreshFlag)
  }
  useEffect(() => {
    getData()
  }, [refreshFlag])

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem('cart'))
    // console.log(temp)
    if (temp) {
      if (temp.length > 0)
        setCart(temp)
    }
  }, [])

  //////////////////////////////////////////
  // //////////////////////////cart Start
  const [cart, setCart] = useState([])
  const [Total, setTotal] = useState(0)
  const add2Cart = async (prod, amount) => {
    const temp = cart.filter(item => item.id === prod.id)[0]
    console.log(cart.filter(item => item.id === prod.id))
    if (temp) {
      console.log(`found - ${temp.amount}`); //already in cart 
      if (temp.amount + amount === 0) {
        console.log("del item")
        setCart(cart.filter(item => item.id !== prod.id))
      }
      else {
        temp.amount += amount
        setCart([...cart])
      }
    }
    else {
      console.log("not found"); //not in cart
      const newItemInMyCart = { id: prod.id, desc: prod.desc, price: prod.price, amount: 1 }
      let res = await setCart([...cart, newItemInMyCart])
      localStorage.setItem('cart', JSON.stringify([...cart, newItemInMyCart]))
      console.log([...cart, newItemInMyCart])
    }
    setupdCart(!updCart)


    let tempTotal = 0 // here we add the top tatal to pay (with line 91 to show it)
    cart.forEach(element => {
      console.log(element.price);
      tempTotal += (element.price * element.amount)
    });
    setTotal(tempTotal)
  }
  // //////////////////////////cart END
  //////////////////////////////////////////

  return (
    <div className="App">
      <header className="App-header">
        <TotalItems cart={cart} updCart={updCart}></TotalItems>
        <h1>Total to pay: {Total}</h1>
        Desc<input onChange={(e) => setdesc(e.target.value)} />
        Price<input onChange={(e) => setprice(+e.target.value)} />
        Desc:{desc} &nbsp;
        price:{price}
        <button onClick={() => AddProduct()}>add</button>
        <hr></hr>
        we have a total of {products.length} items
        {products.map((prod) => <div key={prod.id}> Desc: {prod.desc},  Price: {prod.price}
          <button onClick={() => delItem(prod.id)}>Del - {prod.id}</button>
          <button onClick={() => updItem(prod)}>Upd - {prod.id}</button>
          <button onClick={() => add2Cart(prod, 1)}>Buy- {prod.id}</button>
        </div>)}
        <hr />
        <DisCart myCart={cart} add2Cart={add2Cart} updCart={updCart}></DisCart>
        <hr />
      </header>
    </div>
  );
}

export default App;
// npm install -g json-server
// json-server --watch db.json -p=5000

// {
//     "products": [
//       {
//         "id": 2,
//         "desc": "krembo",
//         "price": 2
//       },
//       {
//         "id": 3,
//         "desc": "jahnoon",
//         "price": 10
//       },
//       {
//         "id": 4,
//         "desc": "pizza",
//         "price": 9
//       },
//       {
//         "desc": "bisly",
//         "price": 8,
//         "id": 5
//       },
//       {
//         "desc": "bamba",
//         "price": 7,
//         "id": 6
//       }
//     ]
//   }