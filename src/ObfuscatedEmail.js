import React from 'react';

/**
 * Assembles the email from char codes at click-time.
 * Prevents simple HTML-scraping bots from harvesting the address.
 * 'dccfanforlife@gmail.com' as char codes:
 */
const CHAR_CODES = [
  100,99,99,102,97,110,102,111,114,108,105,102,101, // dccfanforlife
  64,                                                 // @
  103,109,97,105,108,                                 // gmail
  46,                                                 // .
  99,111,109                                          // com
];

const getEmail = () =>
  CHAR_CODES.map(c => String.fromCharCode(c)).join('');

const ObfuscatedEmail = ({ className }) => {

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${getEmail()}`;
  };

  return (
    <a
      href="#contact"
      onClick={handleClick}
      className={className}
      aria-label="Send me an email"
    >
      {getEmail()}
    </a>
  );
};

export default ObfuscatedEmail;