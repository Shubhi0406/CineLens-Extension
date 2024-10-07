# CineLens - Chrome Extension

CineLens is a Chrome extension that provides instant access to movie and TV show information while browsing the web. Simply highlight text or open a Netflix title, and CineLens will retrieve detailed information from the OMDb API, including release date, ratings, plot summary, and more.

## Install the Extension

1. Go the the link: https://chromewebstore.google.com/detail/cinelens-fetch-movies-tv/mdnmkbdahgdobcefjfefikdiaehecjlj
2. Click Add to Chrome. You will get a popup for permissions so that it can access the highlighted text.

## Features

- **Highlight Text**: Instantly fetch information based on highlighted text from any webpage.
- **Netflix Integration**: Automatically retrieves details if a title is open on Netflix.
- **Customization Options**: Choose which information to display, such as release date, runtime, director, and more.
- **Keyboard Shortcut**: Press `Alt+S` to quickly open the extension popup.
- **Manual Search**: Enter a movie or TV show title manually for a search, with the option to include the release year.

## How to Use

1. **Highlight Text**: 
   - Highlight any movie or TV show title on a webpage, press `Alt+S` or click the extension icon, and the title will automatically populate in the search field.
   - Hit **Enter** or click **Search** to retrieve information from OMDb.

2. **Netflix Integration**: 
   - When you have a Netflix title open, the extension will automatically fill in the title for you, and you can search directly for the details.

3. **Manual Search**: 
   - Type in a title manually, and optionally, add a release year for more accurate results.
   - Click **Search** or press **Enter** to fetch the data.

4. **Customize Results**:
   - Navigate to the settings page in the extension to customize which information fields you want to display, such as Rotten Tomatoes rating, release date, director, runtime, and more.

## Files and Structure

- **popup.js**: Contains the main logic for handling user input, interacting with the OMDb API, and rendering the results in the popup.
- **content.js**: Handles retrieving highlighted text from the webpage.
- **settings.js**: Saves user settings to allow customization of displayed details.
- **config.js**: Uses the OMDB API to fetch movie/TV show data. The key is omitted in the file for security.
- **popup.html**: The UI layout for the extension popup, where users can input movie/TV titles and view the results.
- **settings.html**: The UI layout for the settings popup, where users can customize the displayed details.
- **styles.css**: Contains the styles for the popup UI to ensure a user-friendly interface.
- **settings.css**: Contains the styles for the settings customization popup.
- **manifest.json**: Defines the extension's permissions, entry points, and metadata.

## Permissions

This extension uses the following Chrome permissions:
- **activeTab**: To interact with the current tab and retrieve highlighted text.
- **storage**: To store user preferences for which movie/TV show details to display.
- **scripting**: To inject scripts for detecting highlighted text and retrieving Netflix titles.
- **Host permissions**: For analyzing webpage content to detect highlighted text and Netflix titles.

## Limitations and Future Updates

- **Non-English Titles**: Currently, the extension may have difficulty handling non-English Netflix titles.
- **Rate Limits**: The OMDb API imposes rate limits, so there may be restrictions on how many requests can be made per day.
- **Bookmarks**: Future versions of the extension may include a bookmarks feature to save favorite titles.

## Contributing

Feel free to open an issue or submit a pull request if you'd like to contribute. All contributions are welcome, whether it's bug fixes, new features, or performance improvements.

---

Thank you for using CineLens! If you have any feedback or suggestions, please don't hesitate to reach out or create an issue in the GitHub repository.
