import React from "react"
import { useAddToCart } from "../AddToCart";
import { IPizza } from "../types";

import PizzaCSS from './Pizza.module.css'

interface Props {
    pizza: IPizza
}

const Pizza: React.FC<Props> = ({ pizza }) => {
    const addToCart = useAddToCart()
    const handleAddToCartClick = () => {
        addToCart(pizza);
    };
    return (
        <li className={PizzaCSS.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button onClick={handleAddToCartClick}>Add to Cart</button>
        </li>
    )
}
export default Pizza