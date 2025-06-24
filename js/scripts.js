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
        history.pushState({mobileSocial: true}, '', location.href);
        // Listen for popstate to reload the page when user returns
        window.addEventListener('popstate', function popHandler(e) {
          if (e.state && e.state.mobileSocial) {
            window.location.reload();
            window.removeEventListener('popstate', popHandler);
          }
        });
      }
    };
    link.addEventListener('click', link._popupHandler, false);
  });
}

// Section entrance animation on scroll
function animateSectionsOnScroll() {
  const sections = document.querySelectorAll(".animate-section");
  const trigger = window.innerHeight * 0.85;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < trigger) {
      section.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", animateSectionsOnScroll);
window.addEventListener("DOMContentLoaded", animateSectionsOnScroll);

// Parallax effect for hero SVG
const heroImg = document.querySelector('.hero img[src$="holybible.svg"]');
if (heroImg) {
  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.08}px) scale(1)`;
  });
}

document.addEventListener('DOMContentLoaded', handleSocialLinks);
document.addEventListener('DOMContentLoaded', function () {
  const howjLink = document.querySelector('a[href="https://www.instagram.com/howj_global"]');
  if (howjLink) {
    howjLink.addEventListener('click', function (e) {
      e.preventDefault();
      const popupWidth = 600;
      const popupHeight = 700;
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
      const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      const left = dualScreenLeft + (width - popupWidth) / 2;
      const top = dualScreenTop + (height - popupHeight) / 2;
      window.open(
        'https://www.instagram.com/howj_global',
        'howjPopup',
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );
    });
  }
});
