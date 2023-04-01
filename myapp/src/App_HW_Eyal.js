// this is Eyal's solution to the HW given on the 26032023. recording time: 29033023 01:28:00
// A list of products and a cart with the items needed and amount of products.
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
    const [products, setproducts] = useState([])
    const [desc, setdesc] = useState("")
    const [price, setprice] = useState(0)
    const [refreshFlag, setrefreshFlag] = useState(true)
    const MY_SERVER = 'http://localhost:5000/products'

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
            const newItemInMyCart = { id: prod.id, desc: prod.desc, Price: prod.price, amount: 1 }
            let res = await setCart([...cart, newItemInMyCart])
            localStorage.setItem('cart', JSON.stringify([...cart, newItemInMyCart]))
            console.log([...cart, newItemInMyCart])
        }
    }
    // //////////////////////////cart END
    //////////////////////////////////////////
    return (
        <div className="App">
            <header className="App-header">
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
                <hr>
                </hr>
                My Cart
                {cart.map((prod, ind) => <div key={ind}>
                <button onClick={() => add2Cart(prod, -1)} className='btn btn-danger'> - </button>
                    Desc: {prod.desc},  Price: {prod.price},Amount: {prod.amount}
                    
                    <button onClick={() => add2Cart(prod, 1)} className='btn btn-success'>+ </button>

                </div>)}
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
//         "id": 1,
//         "desc": "pasta",
//         "price": 12
//       },
//       {
//           "id": 2,
//           "desc": "krembo",
//           "price": 2
//         }, {
//           "id": 3,
//           "desc": "jahnoon",
//           "price": 10
//         }
//     ]
//   }