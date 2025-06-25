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
function getCenteredPopupSpecs(popupWidth, popupHeight) {
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  var left = dualScreenLeft + (width - popupWidth) / 2;
  var top = dualScreenTop + (height - popupHeight) / 2;
  return `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`;
}
// Handle popup behavior for About section links and Instagram embed
function handlePopupLinks() {
  // All links in .about-text and Instagram embed
  var aboutLinks = document.querySelectorAll('.about-text a, .instagram-embed-responsive a');
  aboutLinks.forEach(function(link) {
    link.removeEventListener('click', link._popupHandler, false);
    link._popupHandler = function(e) {
      if (!isMobile()) {
        e.preventDefault();
        var url = link.getAttribute('href');
        var specs = getCenteredPopupSpecs(600, 700);
        window.open(url, '_blank', specs);
      }
    };
    link.addEventListener('click', link._popupHandler, false);
  });
  // For Instagram iframe, overlay a transparent div to capture click
  var instaIframe = document.querySelector('.instagram-embed-responsive iframe');
  if (instaIframe && !isMobile()) {
    var overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.cursor = 'pointer';
    overlay.style.zIndex = 10;
    overlay.style.background = 'transparent';
    overlay.title = 'Open Instagram Post';
    overlay.addEventListener('click', function(e) {
      e.preventDefault();
      var specs = getCenteredPopupSpecs(600, 700);
      window.open(instaIframe.src, '_blank', specs);
    });
    var parent = instaIframe.parentElement;
    parent.style.position = 'relative';
    parent.appendChild(overlay);
  }
}
document.addEventListener('DOMContentLoaded', handlePopupLinks);
// Blog iframe modal logic
function handleBlogReadMore() {
  const modal = document.getElementById('blog-iframe-modal');
  if (!modal) return; // Prevent error if modal is missing
  const iframe = modal.querySelector('iframe');
  const closeBtn = modal.querySelector('.blog-iframe-close');
  const backdrop = modal.querySelector('.blog-iframe-backdrop');
  if (!iframe || !closeBtn || !backdrop) return;
  document.querySelectorAll('.read-more-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const blogFile = btn.getAttribute('data-blog');
      if (blogFile) {
        iframe.src = 'blog/' + blogFile;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  function closeModal() {
    modal.style.display = 'none';
    iframe.src = '';
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeModal();
    }
  });
}
document.addEventListener('DOMContentLoaded', handleBlogReadMore);
// Blog Modal logic
const blogModal = document.getElementById('blogModal');
const blogModalIframe = document.getElementById('blogModalIframe');
const blogModalClose = document.querySelector('.blog-modal-close');
const blogModalBackdrop = document.querySelector('.blog-modal-backdrop');

function closeBlogModal() {
  blogModal.style.display = 'none';
  blogModalIframe.src = '';
  document.body.style.overflow = '';
}

function openBlogPopupWindow(blogFile) {
  const popupWidth = 900;
  const popupHeight = 700;
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  const left = dualScreenLeft + (width - popupWidth) / 2;
  const top = dualScreenTop + (height - popupHeight) / 2;
  const popup = window.open(
    `/blog/${blogFile}?popup=1`,
    'blogPopup',
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable,scrollbars=yes`
  );
  if (popup) {
    popup.focus();
  }
}

// Open popup window on Read More click
const readMoreBtns = document.querySelectorAll('.read-more-btn');
readMoreBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const blogFile = this.getAttribute('data-blog');
    openBlogPopupWindow(blogFile);
  });
});

// Close modal on X or backdrop click
blogModalClose.addEventListener('click', closeBlogModal);
blogModalBackdrop.addEventListener('click', closeBlogModal);

// Close modal on Escape key
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && blogModal.style.display === 'block') {
    closeBlogModal();
  }
});
document.addEventListener('DOMContentLoaded', function () {
  // Remove allowfullscreen from all YouTube iframes (for any legacy iframes)
  var ytIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
  ytIframes.forEach(function(iframe) {
    iframe.removeAttribute('allowfullscreen');
  });
});

// --- Robust YouTube one-at-a-time playback using IFrame API ---
// Remove any previous static iframe logic for pausing
(function() {
  // Playlist IDs for each section
  var ytSections = [
    {id: 'yt-worship', playlist: 'PL9GoCpwDjkCU10rmhe9Y1Lw4ckTci4RvK'},
    {id: 'yt-word', playlist: 'PL9GoCpwDjkCVmKkD32sPz78wI8IBvYkZ5'},
    {id: 'yt-hymns', playlist: 'PL9GoCpwDjkCX5gXgnt6Xb0gQi0gCRfVgN'}
  ];
  var ytPlayers = [];
  var currentlyPlaying = null;

  // Load the YouTube IFrame API if not already present
  if (!window.YT || !window.YT.Player) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  window.onYouTubeIframeAPIReady = function() {
    ytSections.forEach(function(section, idx) {
      var el = document.getElementById(section.id);
      if (!el) return;
      ytPlayers[idx] = new YT.Player(section.id, {
        height: '315',
        width: '560',
        playerVars: {
          listType: 'playlist',
          list: section.playlist,
          rel: 0,
          modestbranding: 1
        },
        events: {
          'onStateChange': function(event) {
            if (event.data === YT.PlayerState.PLAYING) {
              currentlyPlaying = event.target;
              ytPlayers.forEach(function(other) {
                if (other && other !== event.target) {
                  other.pauseVideo();
                }
              });
            }
          },
          'onReady': function(event) {
            var iframe = event.target.getIframe();
            if (iframe) {
              iframe.removeAttribute('allowfullscreen');
              // Set accessible title attribute for screen readers
              var titles = ['Worship & Adoration', 'The Word', 'Hymns'];
              iframe.setAttribute('title', titles[idx] || 'YouTube Playlist');
            }
            // Try to overlay a div over the fullscreen button
            setTimeout(function() {
              try {
                var parent = iframe.parentElement;
                if (parent && !parent.querySelector('.ytp-fullscreen-button-cover')) {
                  var cover = document.createElement('div');
                  cover.className = 'ytp-fullscreen-button-cover';
                  parent.appendChild(cover);
                }
              } catch (e) {}
            }, 1000); // Wait for YouTube controls to render
          }
        }
      });
    });
    // MutationObserver to keep removing allowfullscreen from all YouTube iframes
    var observer = new MutationObserver(function() {
      document.querySelectorAll('iframe[src*="youtube.com/embed/"], .ytp-fullscreen-button-cover').forEach(function(iframe) {
        if (iframe.hasAttribute && iframe.hasAttribute('allowfullscreen')) {
          iframe.removeAttribute('allowfullscreen');
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['allowfullscreen'] });
  };
})();
