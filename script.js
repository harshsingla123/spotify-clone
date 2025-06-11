const accessToken = ' ';

async function getsong() {

  const trackName = document.getElementById("songname").value;
  const rightside = document.getElementById("rightside");

  if (!trackName) {
    console.error('No song name provided!');
    return;
  }

  console.log(`Searching for: ${trackName}`);

 
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.tracks && data.tracks.items.length > 0) {
      const trackId = data.tracks.items[0].id;
      console.log('Track ID:', trackId);

    
      rightside.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${trackId}" width="1000" height="1000"  frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    } else {
      console.log('No track found for:', trackName);
      rightside.innerHTML = `<p>No track found for ${trackName}</p>`;
    }
  } catch (error) {
    console.error('Error fetching track:', error);
    rightside.innerHTML = `<p>Error fetching track: ${error.message}</p>`;
  }
}
