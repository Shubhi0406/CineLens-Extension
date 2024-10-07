chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getHighlightedText") {
      var selectedText = window.getSelection().toString().trim();
      if (!selectedText && window.location.hostname.startsWith('www.netflix.com')) {
        try {
            selectedText = document.getElementsByClassName('about-header')[0].getElementsByTagName('h3')[0].getElementsByTagName('strong')[0].outerText;
        } catch (error) { }
      }
      sendResponse({ selectedText });
    }
  });
  