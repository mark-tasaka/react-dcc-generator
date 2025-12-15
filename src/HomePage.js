import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { generateFourCharacters, CharacterSheetDocument } from './utils/lv0DccGenerator';

const HomePage = () => {
  
  const handleGenerateClick = async () => {
    try {
      // Generate 4 characters
      const characters = generateFourCharacters();
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