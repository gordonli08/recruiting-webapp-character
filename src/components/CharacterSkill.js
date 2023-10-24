import { useContext } from "react";
import ChractersContext from "../context/characters";


function CharacterSkill({ index }) {
    const { characters, attributeModifier, incrementSkill, decrementSkill } = useContext(ChractersContext);
    const character = characters[index];

    const handlePlusSkill = (skill) => {
        incrementSkill(index, skill);
    }
    const handleMinusSkill = (skill) => {
        decrementSkill(index, skill);
    }
    const renderedSkills = character['skills'].map((skill) => {
        const modifier = skill['attributeModifier'];
        const modifierValue = attributeModifier(character[modifier]);
        const skillTotal = skill['skillPoints'] + modifierValue;

        return (<div key={skill['name']}>
            {`${skill['name']} - points: ${skill['skillPoints']}`}
            <button className="stat-button" onClick={() => { handlePlusSkill(skill['name'])}}>+</button>
            <button className="stat-button" onClick={() => { handleMinusSkill(skill['name'])}}>-</button>
            {`Modifier (${modifier}): ${modifierValue} Total: ${skillTotal}`}
        </div>
        )
    });


    return (
        <div>
            <h4>Character Skills</h4>
            <h5>Skill Points: {character['availableSP']}</h5>
            {renderedSkills}
        </div>
    );
};
export default CharacterSkill;