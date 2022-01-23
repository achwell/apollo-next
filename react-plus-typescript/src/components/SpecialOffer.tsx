import React, { FC } from "react";
import { WithAddToCartProps } from "../AddToCart";
import { IPizza } from "../types";
import SpecialOfferCSS from './SpecialOffer.module.css'

interface Props {
    pizza: IPizza
}

const SpecialOffer: FC<Props> = ({ pizza }) => {
    return (
        <div className={SpecialOfferCSS.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <WithAddToCartProps>
                {({ addToCart }) => <button onClick={() => addToCart({ id: pizza.id, name: pizza.name, price: pizza.price })}>Add to Cart</button>}
            </WithAddToCartProps>
        </div>
    )

}

export default SpecialOffer