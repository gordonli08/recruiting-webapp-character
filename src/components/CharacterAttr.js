import { ATTRIBUTE_LIST } from "../consts";
import { useContext } from "react";
import ChractersContext from "../context/characters";

function CharacterAttr({ index }) {

    const { characters, incrementAttr, decrementAttr, attributeModifier } = useContext(ChractersContext);
    const character = characters[index];

    const handlePlusAttr = (attribute) => {
        incrementAttr(index, attribute);
    }
    const handleMinusAttr = (attribute) => {
        decrementAttr(index, attribute);
    }

    const renderedAttributes = ATTRIBUTE_LIST.map((attr) => (
        <div key={attr}>
            {`${attr}: ${character[attr]}`}
            <button className="stat-button" onClick={() => handlePlusAttr(attr)}>+</button>
            <button className="stat-button" onClick={() => handleMinusAttr(attr)}>-</button>
            {`Modifier: ${attributeModifier(character[attr])}`}
        </div>
    ))


    return (
        <div>
            <h4>Character Attributes</h4>
            <h5>Attribute Points: {character['availableAP']}</h5>
            {renderedAttributes}
        </div>
    );
}

export default CharacterAttr;