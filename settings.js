const checkboxes = document.querySelectorAll('input[type="checkbox"]');

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        showRottenTomatoesRating: false,
        showReleased: false,
        showRuntime: false,
        showDirector: false,
        showWriters: false,
        showActors: false,
        showCountry: false,
        showAwards: false,
        showMetascore: false
    }, function(items) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = items[checkbox.id];
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            document.getElementById('statusMessage').classList.add('hidden');
        });
      });

    // Save settings
    document.getElementById('saveSettings').addEventListener('click', function() {
        document.getElementById('statusMessage').classList.add('hidden');
        const settings = {};
        checkboxes.forEach(checkbox => {
            settings[checkbox.id] = checkbox.checked;
        });
        chrome.storage.sync.set(settings, function() {
            document.getElementById('statusMessage').classList.remove('hidden');
        });
    });
});
