import React, { useEffect, useState } from "react";
import "./Cart.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


const Cart = ({ setBarState, barState, productId , setProductId }) => {



  const [total , setTotal] = useState(0)

  const handlePrice = () => {
    var ans = 0
    productId.forEach(item => {
      ans += item.quantity * item.price
    })

    setTotal(ans)
  }

  useEffect(() => {
    handlePrice()
  })
  
  const handleChange = (item , d) => {
    let ind = 1

    productId.forEach((data , index) => {
      if(data.id == item){
          ind = index
      }
    })

    const tempArr = productId
    tempArr[ind].quantity += d


    if(tempArr[ind].quantity === 0){
      tempArr[ind].quantity = 1
    }else{
      setProductId([...tempArr])
    }


  
  }


  return (
    <div className="Cart">
      <Navbar setBarState={setBarState} barState={barState} />
      <main>
        <h1>Your shopping cart</h1>
        <div className="cart_box">
          <div className="top_title">
            <p>Product</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          <div className="product_section">


            {
              productId && productId.map((item, i) => {
                
                return <div className="box" key={i}>
                  <div className="img_part">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="info_part">
                    <div className="left_part">
                      <h2 className="name">{item.name}</h2>
                      <p className="description">
                        A timeless ceramic vase with a tri color grey glaze.
                      </p>
                      <p className="price">$ {item.price} </p>
                    </div>
                    <div className="right_part">
                      <div className="quantity_box">
                        <div className="minus" 
                          onClick={() => handleChange(item.id , -1)}
                        >
                          -
                        </div>
                        <p className="quantity">{item.quantity}</p>
                        <div
                          className="plus"
                          onClick={() => handleChange(item.id , +1)}
                        >
                          +
                        </div>
                      </div>
                      <p className="totalProductPrice">$ {item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              })
            }


          </div>
          <div className="bottom">
            <div className="subtotal">
              <h1>Subtotal</h1>
              <p className="totalPrice">${total}</p>
            </div>
            <p>Taxes and shipping are calculated at checkout</p>
            <button>Go to checkout</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
