const API_KEY = 'API_KEY'; // free API KEY omitted
const officeUkVariations = [
    "The Office (UK)",
    "The Office UK",
    "The Office (U.K.)",
    "The Office U.K."
];

const officeUsVariations = [
    "The Office US",
    "The Office U.S."
];

async function fetchMovieData(title, year) {
    // Attempt with the original title
    let response = await fetchMovie(title, year);
    if (response.Response === "False") {
    
        if (officeUkVariations.some(variation => title.toLowerCase() === variation.toLowerCase())) {
            response = await fetchMovie("The Office", year || 2001);
            return response;
        }
        if (officeUsVariations.some(variation => title.toLowerCase() === variation.toLowerCase())) {
            response = await fetchMovie("The Office", year);
            return response;
        }
        // Retry by removing brackets if the first attempt fails
        const bracketContentMatch = title.match(/\(([^)]+)\)/);
        let searchYear = year;
        if (bracketContentMatch) {
            const extractedYear = bracketContentMatch[1];
            // If the content inside brackets is a 4-digit year and the user didn't provide a year
            if (!year && /^\d{4}$/.test(extractedYear)) {
                searchYear = extractedYear;
            }
            // Remove the brackets from the title
            var cleanedTitle = title.replace(/\s*\([^)]*\)/, '').trim();
            response = await fetchMovie(cleanedTitle, searchYear);
        }

    }
    return response;
}

function fetchMovie(title, year) {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}${year ? `&y=${year}` : ''}&plot=full&apikey=${API_KEY}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching data:', error);
            return { Error: 'Unable to fetch data' };
        });
}