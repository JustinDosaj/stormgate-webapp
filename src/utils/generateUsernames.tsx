export const generateRandomUsername = () => {
    const adjectives = ['Brave', 'Swift', 'Mighty', 'Clever', 'Fierce'];
    const animals = ['Lion', 'Tiger', 'Eagle', 'Wolf', 'Bear'];
    const randomNumber = Math.floor(Math.random() * 1000);
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  
    return `${randomAdjective}${randomAnimal}${randomNumber}`;
};