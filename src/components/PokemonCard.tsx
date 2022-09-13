import React, { useEffect, useState } from 'react'
import { Detail } from '../App'
import './pokemon.css'
interface Props {
  abilities: {
    ability: {
      name: string
    }
  }[] | undefined,
  viewDetail: Detail,
  setDetail: React.Dispatch<React.SetStateAction<Detail>>,
  id: number,
  name: string,
  img: string
}
const PokemonCard: React.FC<Props> = ({ id, name, img, abilities, setDetail, viewDetail }) => {
  const [isSelected, setSelected] = useState<boolean>(false)
  useEffect(() => {
    setSelected(id === viewDetail?.id)
  }, [viewDetail])
  return (
    <div className="wrapper">
      {
        isSelected ? <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p onClick={() => setDetail({ id: 0, isOpened: false })} className="detail-close">
              x
            </p>
            <div className="detail-info">
              <img src={img} alt="pokemon" className="detail-img" />
              <p className="detail-name" >{name}</p>

            </div>
            <div className="detail-skill">
              <div className="detail-ability">
                ablities:
                {abilities?.map((ability, index) => {
                  return (<div key={index} >{ability.ability.name}</div>)
                })}
              </div>
            </div>
          </div>
        </section> : <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={img} alt="pokemon_img" />

        </section>
      }

    </div>
  )
}

export default PokemonCard
