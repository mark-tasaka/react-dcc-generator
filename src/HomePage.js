import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { generateFourCharacters, CharacterSheetDocument } from './utils/lv0DccGenerator';

const HomePage = () => {
  // State for form values
  const [formValues, setFormValues] = useState({
    alignment: 1,
    sex: 1,
    abilityScore: 1,
    hitPoints: 1,
    occupations: 1
  });

  // Handle dropdown changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };

  const handleGenerateClick = async () => {
    try {
      // Generate 4 characters with form parameters
      const characters = generateFourCharacters(formValues);
      console.log('Generated characters:', characters); // Debug log
      
      // Create PDF
      const doc = <CharacterSheetDocument characters={characters} />;
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
        <div className="character-options">
          <div className="form-row">
            <span className="formIputDescription1b">Alignment:</span>
            <select 
              name="alignment" 
              value={formValues.alignment}
              onChange={handleInputChange}
            >
              <option value={1}>Random</option>
              <option value={2}>Lawful</option>
              <option value={3}>Neutral</option>
              <option value={4}>Chaotic</option>
            </select>
          </div>

          <div className="form-row">
            <span className="formIputDescription1b">Sex:</span>
            <select 
              name="sex" 
              value={formValues.sex}
              onChange={handleInputChange}
            >
              <option value={1}>Random</option>
              <option value={2}>Female</option>
              <option value={3}>Male</option>
              <option value={4}>Other</option>
              <option value={5}>Blank</option>
            </select>
          </div>

          <br />
          <br />

          <div className="form-row">
            <span className="formIputDescription1b">Ability Score:</span>
            <select 
              name="abilityScore" 
              value={formValues.abilityScore}
              onChange={handleInputChange}
            >
              <option value={1}>3d6 (Old School)</option>
              <option value={2}>4d6, drop the lowest</option>
              <option value={3}>5d6, use the 3 highest</option>
              <option value={4}>1d5 + 1d6 + 1d7</option>
              <option value={5}>2d6 + 6</option>
            </select>
          </div>

          <br />
          <br />

          <div className="form-row">
            <span className="formIputDescription1b">Hit Points:</span>
            <select 
              name="hitPoints" 
              value={formValues.hitPoints}
              onChange={handleInputChange}
            >
              <option value={1}>1d4</option>
              <option value={2}>Max</option>
            </select>
          </div>

          <div className="form-row">
            <span className="formIputDescription1b">Occupations:</span>
            <select 
              name="occupations" 
              value={formValues.occupations}
              onChange={handleInputChange}
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
        </div>

        <button 
          className="App-button-gen"
          onClick={handleGenerateClick}
        >
          Generate Level 0 Character
        </button>
      </header>
    </div>
  );
};

export default HomePage;