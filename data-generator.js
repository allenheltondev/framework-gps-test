const { setTimeout } = require('timers/promises');

const BASEURL = 'UPDATE_ME!!!';

const ONE_MILE_IN_DEGREES = 1 / 69;
const sessionId = process.argv[2];

// Generate a random latitude and longitude within the US
function getRandomLocation() {
  const lat = Math.random() * (49.3457868 - 24.396308) + 24.396308; // US latitude range
  const lon = Math.random() * (-66.93457 - -125.00165) + -125.00165; // US longitude range
  return { lat, lon };
}

// Calculate new position
function moveCoordinates({ lat, lon }, direction, distance) {
  const distanceInDegrees = distance * ONE_MILE_IN_DEGREES;

  switch (direction) {
    case 'north':
      lat += distanceInDegrees;
      break;
    case 'south':
      lat -= distanceInDegrees;
      break;
    case 'east':
      lon += distanceInDegrees;
      break;
    case 'west':
      lon -= distanceInDegrees;
      break;
  }

  return { lat, lon };
}

// Get a random direction with slight prioritization toward last direction
function getRandomDirection(lastDirection) {
  const directions = ['north', 'south', 'east', 'west'];
  const prioritizedDirections = [lastDirection, lastDirection, ...directions];
  return prioritizedDirections[Math.floor(Math.random() * prioritizedDirections.length)];
}

async function postCoordinates({ lat, lon }) {
  const postData = { latitude: lat, longitude: lon };

  try {
    const response = await fetch(`${BASEURL}/sessions/${sessionId}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error posting coordinates:', error);
  }
}

// Main function to generate and post coordinates
async function generateCoordinates() {
  let location = getRandomLocation();
  let lastDirection = 'north';

  while (true) {
    // Wait for a random interval between 1-5 seconds
    const waitTime = Math.floor(Math.random() * 5) + 1;
    await setTimeout(waitTime * 100);

    const speed = Math.random() * 79 + 1; // Speed between 1 and 80 mph
    const direction = getRandomDirection(lastDirection);
    const distance = (speed * waitTime) / 3600;
    location = moveCoordinates(location, direction, distance);

    // Post new coordinates
    await postCoordinates(location);

    // Update last direction
    lastDirection = direction;
  }
}

generateCoordinates();
