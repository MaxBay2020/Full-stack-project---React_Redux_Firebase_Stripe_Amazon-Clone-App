import React, {useState, useEffect} from 'react'
import NumberFormat from 'react-number-format'
import '../styles/CheckoutPanel.css'
import { useSelector } from 'react-redux'

const CheckoutPanel = () => {

    const cart = useSelector( state => state.user.cart)
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(cart?.reduce((total, item) => total + item.price * item.amount, 0))
    }, [cart]);


    return (
        <div className='checkoutPanel'>
            <p className='total'>Subtotal ({cart.length} items):&nbsp;
                <NumberFormat
                    value={total}
                    className="total"
                    displayType={'text'}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(value, props) => <strong {...props}>{value}</strong>}
                />
                {/*<strong>$ {total}</strong>*/}
            </p>
            <p className='gift'>
                <input type="checkbox"/>
                <span>This order contains a gift</span>
            </p>
            <p className='proceed-btn'>
                <button>Proceed to Checkout</button>
            </p>
        </div>
    );
};

export default CheckoutPanel;
