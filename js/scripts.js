function isMobile() {
  return window.innerWidth < 768;
}
// Apply logic to all social/contact icons in both hero and contact sections
function handleSocialLinks() {
  // Select all links in .social-icons and .social-list
  var links = document.querySelectorAll('.social-icons a, .social-list a');
  links.forEach(function(link) {
    // Prevent duplicate listeners
    link.removeEventListener('click', link._popupHandler, false);
    link._popupHandler = function(e) {
      var url = link.getAttribute('data-url') || link.getAttribute('href');
      // Do not open popup for email links
      if (url && url.startsWith('mailto:')) {
        return;
      }
      if (!isMobile()) {
        e.preventDefault();
        // Open popup window for desktop, centered relative to current window
        var w = 600;
        var h = 700;
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = dualScreenLeft + (width - w) / 2;
        var top = dualScreenTop + (height - h) / 2;
        window.open(url, '_blank', 'width='+w+',height='+h+',top='+top+',left='+left+',resizable,scrollbars');
      } else {
        // On mobile, let the link open normally, but add a history state so user can go back
        history.pushState(null, '', location.href);
      }
    };
    link.addEventListener('click', link._popupHandler, false);
  });
}

document.addEventListener('DOMContentLoaded', handleSocialLinks);
