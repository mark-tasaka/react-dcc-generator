import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { generateFourCharacters, generateTwoCharacters, CharacterSheetDocument, CharacterSheetLandscapeDocument } from './utils/lv0DccGenerator';

const HomePage = () => {
  // Default form values
  const defaultFormValues = {
    alignment: 1,
    sex: 1,
    abilityScore: 1,
    hitPoints: 1,
    occupations: 1,
    sheetLayout: 1  // 1 = Four Characters, 2 = Two Characters
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
        <h1>DCC PDF CharacterGenerator</h1>
        <p>This is a placeholder for the DCC Generator application.</p>

        {/* Character Generation Options */}
        <div className="form-container">
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
            <span className="form-label">Sex:</span>
            <select 
              name="sex" 
              value={formValues.sex}
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
            <span className="form-label">Sheet per Page:</span>
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