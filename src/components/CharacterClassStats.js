import { CLASS_LIST } from "../consts";

function CharacterClassStats ({ selectedClass }) {

    const renderedRequirements = Object.keys(CLASS_LIST[selectedClass]).map((stat) => {
        return (<div key={stat}>
            {stat}: {CLASS_LIST[selectedClass][stat]}
        </div>);
    });

    return (<>
        <h5>Class Requirements</h5>
        {renderedRequirements}
    </>);
}

export default CharacterClassStats;