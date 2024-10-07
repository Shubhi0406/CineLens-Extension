
// document.addEventListener('DOMContentLoaded', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "getHighlightedText" }, (response) => {
//         if (response && response.selectedText) {
//           document.getElementById('searchInput').value = response.selectedText;
//         }
//       });
//     });
//   });  

//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     alert("Here");
//     chrome.tabs.sendMessage(tabs[0].id, { action: "getHighlightedText" }, (response) => {
//       alert(response);
//       if (response && response.selectedText) {
//         document.getElementById('searchInput').value = response.selectedText;
//       }
//     });
//   });

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['content.js']
      },
      () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getHighlightedText" }, (response) => {
          if (response && response.selectedText) {
            document.getElementById('searchInput').value = response.selectedText;
          }
        });
      }
    );
  });
  

  document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      document.getElementById('searchButton').click(); // Simulate button click
    }
  });

function handleSearch() { 
    const query = document.getElementById('searchInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    document.getElementById('resultsContainer').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');

    if (query) {
      // If input is not empty, use the input value
      errorMessage.classList.add('hidden');
      performSearch(query);
    } else {
      errorMessage.textContent = 'Please enter a movie title.';
      errorMessage.classList.remove('hidden');
    }
}

function getSelectedText() {
    return window.getSelection().toString().trim();
}

function performSearch(query) {
    document.getElementById('loading').classList.remove('hidden');

    const year = document.getElementById('yearInput').value.trim();
    

    fetchMovieData(query, year)
        .then(data => {
            // Handle the JSON response here
            document.getElementById('loading').classList.add('hidden');
            if (data.Error) {
                errorMessage.textContent = 'Title not found.';
                errorMessage.classList.remove('hidden');
            } else {
                displayResults(data, query);
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            errorMessage.textContent = 'An error occurred while fetching data.';
            errorMessage.classList.remove('hidden');
        });
}

function getSettings(callback) {
    chrome.storage.sync.get([
        'showRottenTomatoesRating', 
        'showReleased', 'showRuntime', 'showDirector', 'showWriters', 
        'showActors', 'showCountry', 'showAwards', 'showMetascore'
    ], (items) => {
        callback(items);
    });
}

function showInfo(data) {
    return (data && data !== 'N/A');
}

function displayResults(data, query) {
    document.getElementById('resultsContainer').classList.remove('hidden');
    const resultsElement = document.getElementById('resultsContainer');
    resultsElement.innerHTML = `
        <h3>Results for "${query}":</h3>
    `;

    if (showInfo(data.Title)) {
        resultsElement.innerHTML += `<p><strong>Title:</strong> ${data.Title}</p>`;
    }
    if (showInfo(data.Year)) {
        resultsElement.innerHTML += `<p><strong>Year:</strong> ${data.Year}</p>`;
    }
    if (showInfo(data.Rated)) {
        resultsElement.innerHTML += `<p><strong>Rated:</strong> ${data.Rated}</p>`;
    }
    if (showInfo(data.Genre)) {
        resultsElement.innerHTML += `<p><strong>Genre:</strong> ${data.Genre}</p>`;
    }
    if (showInfo(data.Plot)) {
        resultsElement.innerHTML += `<p><strong>Plot:</strong> ${data.Plot}</p>`;
    }
    if (showInfo(data.Language)) {
        resultsElement.innerHTML += `<p><strong>Language:</strong> ${data.Language}</p>`;
    }
    if (showInfo(data.imdbRating)) {
        resultsElement.innerHTML += `<p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>`;
    }
    if (showInfo(data.Type)) {
        resultsElement.innerHTML += `<p><strong>Type:</strong> ${data.Type}</p>`;
    }
    // resultsElement.innerHTML += `
    //     <p><strong>Title:</strong> ${data.Title}</p>
    //     <p><strong>Year:</strong> ${data.Year}</p>
    //     <p><strong>Rated:</strong> ${data.Rated}</p>
    //     <p><strong>Genre:</strong> ${data.Genre}</p>
    //     <p><strong>Plot:</strong> ${data.Plot}</p>
    //     <p><strong>Language:</strong> ${data.Language}</p>
    //     <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
    //     <p><strong>Type:</strong> ${data.Type}</p>
    // `;

    handleSettings(data, resultsElement);
    if (showInfo(data.imdbID)) {
        const imdbLink = `https://www.imdb.com/title/${data.imdbID}/`;
        resultsElement.innerHTML += `
            <p><strong>IMDB Link:</strong> <a href="${imdbLink}" target="_blank">${imdbLink}</a></p>
        `;
    }
}

function handleSettings(response, container) {
    getSettings((settings) => {
        if (settings.showRottenTomatoesRating && showInfo(response.Ratings?.find(rating => rating.Source === 'Rotten Tomatoes')?.Value)) {
            container.innerHTML += `<p><strong>Rotten Tomatoes Rating:</strong> ${response.Ratings.find(rating => rating.Source === 'Rotten Tomatoes').Value}</p>`;
        }
        if (settings.showReleased && showInfo(response.Released)) {
            container.innerHTML += `<p><strong>Release Date:</strong> ${response.Released}</p>`;
        }
        if (settings.showRuntime && showInfo(response.Runtime)) {
            container.innerHTML += `<p><strong>Runtime:</strong> ${response.Runtime}</p>`;
        }
        if (settings.showDirector && showInfo(response.Director)) {
            container.innerHTML += `<p><strong>Director:</strong> ${response.Director}</p>`;
        }
        if (settings.showWriters && showInfo(response.Writer)) {
            container.innerHTML += `<p><strong>Writers:</strong> ${response.Writer}</p>`;
        }
        if (settings.showActors && showInfo(response.Actors)) {
            container.innerHTML += `<p><strong>Actors:</strong> ${response.Actors}</p>`;
        }
        if (settings.showCountry && showInfo(response.Country)) {
            container.innerHTML += `<p><strong>Country:</strong> ${response.Country}</p>`;
        }
        if (settings.showAwards && showInfo(response.Awards)) {
            container.innerHTML += `<p><strong>Awards:</strong> ${response.Awards}</p>`;
        }
        if (settings.showMetascore && showInfo(response.Metascore)) {
            container.innerHTML += `<p><strong>Metascore:</strong> ${response.Metascore}</p>`;
        }
        container.innerHTML += `<br><p id="recheck">Not what you were looking for? Recheck the title and year of release.</p>`;
    });
}

document.getElementById('searchButton').addEventListener('click', handleSearch);
  