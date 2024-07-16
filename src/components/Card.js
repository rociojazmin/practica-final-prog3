import React from 'react'

const Card = ({ actualShow }) => {
    const { show } = actualShow;
    const { name, id, image } = show;
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <Image src={image?.medium} width={272} height={400} alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <ButtonLink id={id} />
            </div>
        </div>
    )
}

export default Card