import { CLASS_LIST } from "../consts";
import { useContext, useState } from "react";
import ChractersContext from "../context/characters";
import CharacterClassStats from "./CharacterClassStats";

function CharacterClass({ index }) {
    const [ selectedClass, setSelectedClass ] = useState('')
    const { classCheck } = useContext(ChractersContext);

    let statReq = '';
    if (selectedClass) {
        statReq = <CharacterClassStats selectedClass={selectedClass} />
    }

    const toggleClassReqs = (charClass) => {
        setSelectedClass(charClass);
    }

    const renderedClasses = Object.keys(CLASS_LIST).map((charClass) => {
        const applicableClass = classCheck(index, charClass);

        return (<div
            key={charClass}
            className={applicableClass ? "applicable-class" : ""}
            onClick={() => toggleClassReqs(charClass)}
        >
            {charClass}
        </div>
        )
    });

    return (
        <div>
            <h4>Class List</h4>
            {renderedClasses}
            {statReq}
        </div>
    );
}

export default CharacterClass;