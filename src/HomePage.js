import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Buffer } from 'buffer';
import { generateFourCharacters, generateTwoCharacters, CharacterSheetDocument, CharacterSheetLandscapeDocument } from './utils/lv0DccGenerator';
import dccLv0Title from './img/dcc-lv05.png';

window.Buffer = Buffer;

const HomePage = () => {
const defaultFormValues = {
  givenName: 100,     // Random by default
  surname: 100,       // Random by default
  alignment: 1,
  gender: 1,            
  abilityScore: 1,
  hitPoints: 1,
  occupations: 1,
  sheetLayout: 1
};

  // State for form values
  const [formValues, setFormValues] = useState(defaultFormValues);

  // Handle dropdown changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };

  // Handle reset button
  const handleResetClick = () => {
    setFormValues(defaultFormValues);
  };

  const handleGenerateClick = async () => {
    try {
      // Generate characters based on sheet layout selection
      let characters;
      let doc;
      
      if (formValues.sheetLayout === 2) {
        // Generate 2 characters for landscape layout
        characters = generateTwoCharacters(formValues);
        doc = <CharacterSheetLandscapeDocument characters={characters} />;
      } else {
        // Generate 4 characters for portrait layout (default)
        characters = generateFourCharacters(formValues);
        doc = <CharacterSheetDocument characters={characters} />;
      }
      
      console.log('Generated characters:', characters); // Debug log
      
      // Create PDF
      const pdfBlob = await pdf(doc).toBlob();
      
      // Download PDF
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'dcc-zero-level-characters.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating characters. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2><img src={dccLv0Title} alt="DCC Level 0 Character Generator" className="lv0-title"/></h2>
        <p className="generator-description">The Dungeon Crawl Classics Level 0 Character Generator is designed to allow Players and Judges the ability to quickly generate Level 0 Characters. This generator allows for options for increasing the survivability of the characters by modifying the 3d6 ability score rolls and by maximizing the number of hit points the characters start off with.</p>

        {/* Character Generation Options */}
        <div className="form-container">
        
          <div className="form-group">
            <span className="form-label">Given Name:</span>
            <select 
              name="givenName" 
              value={formValues.givenName}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={100}>Random</option>
              <option value={200}>Blank</option>
              <option value={0}>African</option>
              <option value={1}>African American</option>
              <option value={2}>American</option>
              <option value={3}>Arabic</option>
              <option value={4}>Armenian</option>
              <option value={5}>Celtic</option>
              <option value={6}>Chinese</option>
              <option value={7}>Czechoslovakian</option>
              <option value={8}>Danish</option>
              <option value={9}>Dutch</option>
              <option value={10}>Egyptian</option>
              <option value={11}>English</option>
              <option value={12}>Finnish</option>
              <option value={13}>French</option>
              <option value={14}>Gaelic</option>
              <option value={15}>German</option>
              <option value={16}>Greek</option>
              <option value={17}>Hawaiian</option>
              <option value={18}>Hebrew</option>
              <option value={19}>Hindi</option>
              <option value={20}>Hungarian</option>
              <option value={21}>Indian</option>
              <option value={22}>Irish</option>
              <option value={23}>Italian</option>
              <option value={24}>Japanese</option>
              <option value={25}>Korean</option>
              <option value={26}>Latin</option>
              <option value={27}>Middle English</option>
              <option value={28}>Native American</option>
              <option value={29}>Norse</option>
              <option value={30}>Old English</option>
              <option value={31}>Old French</option>
              <option value={32}>Old German</option>
              <option value={33}>Old Norse</option>
              <option value={34}>Persian</option>
              <option value={35}>Polish</option>
              <option value={36}>Polynesian</option>
              <option value={37}>Russian</option>
              <option value={38}>Sanskrit</option>
              <option value={39}>Scandinavian</option>
              <option value={40}>Scottish</option>
              <option value={41}>Slavic</option>
              <option value={42}>Spanish</option>
              <option value={43}>Swahili</option>
              <option value={44}>Swedish</option>
              <option value={45}>Teutonic</option>
              <option value={46}>Turkish</option>
              <option value={47}>Vietnamese</option>
              <option value={48}>Welsh</option>
              <option value={49}>Yiddish</option>
            </select>
          </div>
          
          <div className="form-group">
            <span className="form-label">Surname:</span>
            <select 
              name="surname" 
              value={formValues.surname}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={100}>Random</option>
              <option value={200}>Blank</option>
              <option value={0}>African</option>
              <option value={1}>Arabic</option>
              <option value={2}>Armenian</option>
              <option value={3}>Catalan</option>
              <option value={4}>Chinese</option>
              <option value={5}>Cornish</option>
              <option value={6}>Czechoslovakian</option>
              <option value={7}>Danish</option>
              <option value={8}>Dutch</option>
              <option value={9}>English</option>
              <option value={10}>Finnish</option>
              <option value={11}>French</option>
              <option value={12}>Galician</option>
              <option value={13}>German</option>
              <option value={14}>Greek</option>
              <option value={15}>Hungarian</option>
              <option value={16}>Indian</option>
              <option value={17}>Irish</option>
              <option value={18}>Italian</option>
              <option value={19}>Japanese</option>
              <option value={20}>Jewish</option>
              <option value={21}>Korean</option>
              <option value={22}>Lithuanian</option>
              <option value={23}>Muslim</option>
              <option value={24}>Norwegian</option>
              <option value={25}>Polish</option>
              <option value={26}>Portuguese</option>
              <option value={27}>Russian</option>
              <option value={28}>Scandinavian</option>
              <option value={29}>Scottish</option>
              <option value={30}>Slavic</option>
              <option value={31}>Spanish</option>
              <option value={32}>Swedish</option>
              <option value={33}>Swiss</option>
              <option value={34}>Turkish</option>
              <option value={35}>Ukrainian</option>
              <option value={36}>Vietnamese</option>
              <option value={37}>Welsh</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Alignment:</span>
            <select 
              name="alignment" 
              value={formValues.alignment}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={1}>Random</option>
              <option value={2}>Lawful</option>
              <option value={3}>Neutral</option>
              <option value={4}>Chaotic</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Gender:</span>
            <select 
              name="gender" 
              value={formValues.gender}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={1}>Random</option>
              <option value={2}>Female</option>
              <option value={3}>Male</option>
              <option value={4}>Other</option>
              <option value={5}>Blank</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Ability Score:</span>
            <select 
              name="abilityScore" 
              value={formValues.abilityScore}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={1}>3d6 (Old School)</option>
              <option value={2}>4d6, drop the lowest</option>
              <option value={3}>5d6, use the 3 highest</option>
              <option value={4}>1d5 + 1d6 + 1d7</option>
              <option value={5}>2d6 + 6</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Hit Points:</span>
            <select 
              name="hitPoints" 
              value={formValues.hitPoints}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={1}>1d4</option>
              <option value={2}>Max</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Occupations:</span>
            <select 
              name="occupations" 
              value={formValues.occupations}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={1}>All</option>
              <option value={2}>Humans</option>
              <option value={3}>Demi-Humans</option>
              <option value={4}>Dwarves</option>
              <option value={5}>Elves</option>
              <option value={6}>Halflings</option>
              <option value={7}>With Armour</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Sheets per Page:</span>
            <select 
              name="sheetLayout" 
              value={formValues.sheetLayout}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value={1}>Four Character Sheets</option>
              <option value={2}>Two Character Sheets</option>
            </select>
          </div>
        </div>

        <div className="button-container">
          <button 
            className="App-button-gen"
            onClick={handleGenerateClick}
          >
            Generate Level 0 Character
          </button>
          
          <button 
            className="App-button-reset"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
      </header>
    </div>
  );
};

export default HomePage;