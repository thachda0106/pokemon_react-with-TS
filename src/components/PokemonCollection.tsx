import React from 'react'
import './pokemon.css'
import { PokemonDetail } from '../interface'
import PokemonCard from './PokemonCard'
import { Detail } from '../App'
interface Props {
    pokemons: PokemonDetail[],
    viewDetail: Detail,
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}
const PokemonCollection: React.FC<Props> = ({ pokemons, viewDetail, setDetail }) => {
    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpened) {
            setDetail({
                id: id,
                isOpened: true
            })
        }


    }
    return (
        <>
            <section className={viewDetail.isOpened ? "collection-container-active" : "collection-container"}>
                {viewDetail.isOpened ?
                    <div className="overlay" ></div> :
                    <div className="" ></div>

                }
                {pokemons.map((pokemon: PokemonDetail) => {
                    return <div onClick={() => selectPokemon(pokemon.id)} key={pokemon.id} className="wrapper">
                        <PokemonCard
                            viewDetail={viewDetail}
                            setDetail={setDetail}
                            abilities={pokemon.abilities}
                            id={pokemon.id}
                            name={pokemon.name}
                            img={pokemon.sprites.front_default} />
                    </div>
                })}
            </section>
        </>
    )
}

export default PokemonCollection