const accessToken = ' BQC7tZu08DHLnPOkjWP4w_2eOhveocAp0_eJ4VmefzTzJwUkGtwu4bzqYoHIVr21x51lQXC4cqyay9P0h90AzQjcVZCNhP61ZuCqV1yCB8KyKItf_29OL9384-FcmTb_SrfndaBjv2I6UL1QhMo39gOR3l6vALG8Monbuj_aeUNE1XZF3Z1gdpesgXxeSl4O8cH-1gD0cqZF_oPWayeXrUWywcAB7g';

async function getsong() {
  // Get the song name from input
  const trackName = document.getElementById("songname").value;
  const rightside = document.getElementById("rightside");

  if (!trackName) {
    console.error('No song name provided!');
    return;
  }

  console.log(`Searching for: ${trackName}`);

  // Fetch the track data from Spotify
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
      const trackId = data.tracks.items[0].id; // Get the track ID of the first search result
      console.log('Track ID:', trackId);

      // Update the iframe with the Spotify embed player
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
