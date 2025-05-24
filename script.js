function getCardIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('card');
}

async function loadAudio() {
  const cardId = getCardIdFromUrl();
  const messageDiv = document.getElementById('message');
  const audioPlayer = document.getElementById('audioPlayer');

  if (!cardId) {
    messageDiv.innerText = "❌ No card ID provided in the URL.";
    return;
  }

  try {
    const res = await fetch('audio-map.json');
    const map = await res.json();

    if (map[cardId]) {
      audioPlayer.src = map[cardId];
      audioPlayer.style.display = 'block';
      messageDiv.innerHTML = `<p>Card ID: <strong>${cardId}</strong></p>`;
    } else {
      messageDiv.innerHTML = `
        <h3>⏳ Voice Message Not Found</h3>
        <p>No message found for card ID <strong>${cardId}</strong>. Please try again later.</p>
      `;
    }
  } catch (error) {
    messageDiv.innerText = "❌ Failed to load audio map or play audio.";
    console.error(error);
  }
}

window.onload = loadAudio;
