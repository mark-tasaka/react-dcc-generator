// Helper function to get a random name from an array
const getRandomName = (nameArray) => {
  const randomIndex = Math.floor(Math.random() * nameArray.length);
  return nameArray[randomIndex];
};