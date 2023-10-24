import './App.css';
import CharacterList from './components/CharacterList';
import { useContext, useEffect } from "react";
import ChractersContext from "./context/characters";


function App() {
	const { createCharacter, saveCharacters, fetchCharacters } = useContext(ChractersContext);

	const handleAddChar = () => {
		createCharacter();
	};

  const handleSaveChar = () => {
    saveCharacters();
  }

  useEffect(() => {
    fetchCharacters();
  }, []);


	return (
		<div className="App">
			<header>
				<h1>React Coding Exercise</h1>
			</header>
			<button onClick={handleAddChar} >Create New Character</button>
			<button onClick={handleSaveChar} >Save</button>
			<CharacterList />
		</div>
	);
}

export default App;