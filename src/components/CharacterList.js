import { useContext } from "react";
import ChractersContext from "../context/characters";
import CharacterAttr from "./CharacterAttr";
import CharacterClass from "./CharacterClass";
import CharacterSkill from "./CharacterSkill";

function CharacterList () {

    const { characters } = useContext(ChractersContext);

    const renderedCharacters = characters.map((_, index) => {
        return (<div className="character" key={index}>
            <h2>Character {index+1}</h2>
            <CharacterAttr index={index} />
            <CharacterClass index={index} />
            <CharacterSkill index={index} />
        </div>);
        })
    return (<div >
        {renderedCharacters}
        </div>);
}

export default CharacterList;