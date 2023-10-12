const clientId = '1e497fe7b16440c1843e4caa374be758';
const clientSecret = '6adbf41cef5d4a89b3d8c62001feead1';

const authString = `${clientId}:${clientSecret}`;
const base64AuthString = btoa(authString);
let accessToken;
function getAccessToken() {
    return fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64AuthString}`
      },
      body: 'grant_type=client_credentials'
    })
      .then(response => response.json())
      .then(data => {
        console.log("method callls")
        accessToken = data.access_token;
        const expiresIn = data.expires_in * 1000; // Convert to milliseconds
        setTimeout(getAccessToken, expiresIn - 60000); // Refresh token 1 minute before expiration
      });
  }
  getAccessToken();
function myFunction(){
    
    const artistName=form1.artistname.value;
    const resultsContainer = document.getElementById('resultsContainer');
    console.log(artistName);
    // const accessToken = 'BQDK98959CmZxVJZffE5yTMUH3k_YeINNoSlKrWmZhnssCYklXMm6HrY9MhyKct2qywZhbCzljANrUea1p-fWhn8FF4ISQ-ni3HPo1QBzYnsr4PvYUVG';
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=track`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then((response)=>response.json())
  .then(data => {
    console.log(data)

const tracks = data.tracks.items;
    resultsContainer.innerHTML = '';
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
   
   
    const card=document.createElement("div");
    card.setAttribute("class","card col-lg-4 col-md-6 col-sm-12");
    resultsContainer.append(card);
    const cardBody=document.createElement("div")
    cardBody.setAttribute("class","card-body");
    card.append(cardBody);
    const songtitle=document.createElement("h3");
    songtitle.setAttribute("class","card-title")
    songtitle.innerText=track.name;
    cardBody.append(songtitle)
    const typesong=document.createElement("p");
    typesong.setAttribute("class","card-text");
    const types=document.createTextNode("Type :");
    typesong.append(types,track.type);
    cardBody.append(typesong)
    const releasep=document.createElement("p");
    releasep.setAttribute("class","card-text");
    const relname=document.createTextNode("Release Date :");
    releasep.append(relname,track.album.release_date);
    cardBody.append(releasep)
    const linkdata=document.createTextNode("Preview URL")
    cardBody.append(linkdata)
    const linkw=document.createElement("a");
    linkw.setAttribute("class","card-link");
    linkw.href=track.preview_url;
    linkw.textContent=track.name
    cardBody.append(linkw)
    


    }


})
  .catch((error)=>console.log(error))
}