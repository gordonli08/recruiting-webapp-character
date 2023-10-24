import { useState, createContext } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts";
import axios from 'axios';

const ChractersContext = createContext();

function Provider({ children }) {
    const [characters, setCharacters] = useState([]);

    const saveCharacters = async () => {
        await axios.post('https://recruiting.verylongdomaintotestwith.ca/api/{gordonli08}/character',
            { characters: characters }
        );
    }

    const fetchCharacters = async () => {
        const response = await axios.get('https://recruiting.verylongdomaintotestwith.ca/api/{gordonli08}/character');
        setCharacters(response.data.body.characters);
    }

    const createCharacter = () => {
        setCharacters([
            ...characters,
            {
                ...Object.fromEntries(ATTRIBUTE_LIST.map(k => [k, 0])),
                skills: SKILL_LIST.map((obj) => ({ ...obj, skillPoints: 0 })),
                availableSP: 10,
                availableAP: 70,
            }
        ])
    }

    const incrementAttr = (charIndex, attribute) => {
        if (characters[charIndex]['availableAP'] < 1) {
            alert('Insufficient attribute points');
        } else {
            setCharacters(characters.map((character, index) => {
                if (index === charIndex) {
                    let calculatedSP = character['availableSP'];
                    if (attribute === 'Intelligence') {
                        const skillModifier = attributeModifier(characters[charIndex][attribute] + 1)
                        calculatedSP = 10 + (4 * skillModifier)
                    }
                    return {
                        ...character,
                        [attribute]: character[attribute] + 1,
                        availableAP: character['availableAP'] - 1,
                        availableSP: calculatedSP,
                    };
                };
                return character;
            }));
        }
    }

    const decrementAttr = (charIndex, attribute) => {
        if (characters[charIndex][attribute] < 1) {
            alert(`Cannot decrement ${attribute} further`);
        } else {
            setCharacters(characters.map((character, index) => {
                let calculatedSP = character['availableSP'];
                if (attribute === 'Intelligence') {
                    const skillModifier = attributeModifier(characters[charIndex][attribute] + 1)
                    calculatedSP = 10 + (4 * skillModifier)
                }
                if (index === charIndex) {
                    return {
                        ...character,
                        [attribute]: character[attribute] - 1,
                        availableAP: character['availableAP'] + 1,
                        availableSP: calculatedSP,
                    }
                };
                return character;
            }));
        }
    }

    const classCheck = (charIndex, charClass) => {
        const character = characters[charIndex];
        for (const [key, value] of Object.entries(CLASS_LIST[charClass])) {
            if (character[key] < value) return false;
        }
        return true;
    }

    const attributeModifier = (attrValue) => {
        return Math.floor((attrValue - 10) / 2);
    }

    const incrementSkill = (charIndex, skillName) => {
        if (characters[charIndex]['availableSP'] < 1) {
            alert('Insufficient skill points');
        } else {
            setCharacters(characters.map((character, index) => {
                if (index === charIndex) {
                    return {
                        ...character,
                        skills: character['skills'].map((skill) => {
                            if (skill['name'] === skillName) {
                                return {
                                    ...skill,
                                    skillPoints: skill['skillPoints'] + 1,
                                }
                            }
                            return skill;
                        }),
                        availableSP: character['availableSP'] - 1,
                    }
                }
                return character;
            }));
        }
    }

    const decrementSkill = (charIndex, skillName) => {
        if (characters[charIndex]['skills'].find((el) => el['name'] === skillName)['skillPoints'] < 1) {
            alert(`Cannot decrement ${skillName} further`);
        } else {
            setCharacters(characters.map((character, index) => {
                if (index === charIndex) {
                    return {
                        ...character,
                        skills: character['skills'].map((skill) => {
                            if (skill['name'] === skillName) {
                                return {
                                    ...skill,
                                    skillPoints: skill['skillPoints'] - 1,
                                }
                            }
                            return skill;
                        }),
                        availableSP: character['availableSP'] + 1,
                    }
                }
                return character;
            }));
        }
    }

    const sharedValues = {
        characters,
        createCharacter,
        incrementAttr,
        decrementAttr,
        classCheck,
        attributeModifier,
        incrementSkill,
        decrementSkill,
        saveCharacters,
        fetchCharacters,
    }

    return <ChractersContext.Provider value={sharedValues}>
        {children}
    </ChractersContext.Provider>
}

export { Provider };
export default ChractersContext;