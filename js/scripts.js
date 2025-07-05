// SEO enhancements are moved to inline scripts in the HTML head for reliability

// SEO Enhancement: Breadcrumb navigation
function updateBreadcrumbs(sectionId) {
  const breadcrumbContainer = document.getElementById('breadcrumb-container');
  const breadcrumbList = document.getElementById('breadcrumb-list');
  const breadcrumbSchema = document.getElementById('breadcrumb-schema');
  
  if (!breadcrumbContainer || !breadcrumbList || !sectionId) return;
  
  // Find the current section name
  const sectionElement = document.getElementById(sectionId);
  if (!sectionElement) return;
  
  const sectionTitle = sectionElement.querySelector('h2')?.textContent || 
                      sectionElement.querySelector('h3')?.textContent || 
                      sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
  
  // Update the visible breadcrumb
  breadcrumbList.innerHTML = `
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">${sectionTitle}</li>
  `;
  
  // Update the structured data
  if (breadcrumbSchema) {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://brotherfemi.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": sectionTitle,
          "item": `https://brotherfemi.org/#${sectionId}`
        }
      ]
    };
    
    breadcrumbSchema.textContent = JSON.stringify(schemaData);
    breadcrumbContainer.classList.remove('d-none');
  }
}

// Enhance navigation links with proper attributes for SEO and analytics
function enhanceNavigationLinks() {
  // Add proper attributes to internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (!link.hasAttribute('data-nav')) {
      link.setAttribute('data-nav', 'internal');
      
      // Add descriptive titles for section links
      const sectionId = link.getAttribute('href').substring(1);
      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTitle = section.querySelector('h2')?.textContent || 
                              section.querySelector('h3')?.textContent ||
                              sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
          if (!link.hasAttribute('title')) {
            link.setAttribute('title', `Navigate to ${sectionTitle} section`);
          }
        }
      }
    }
  });
  
  // Add proper attributes to external links
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Don't change Bible.com links as they have special handling
    if (link.href.includes('bible.com')) return;
    
    // External links should open in new tab with proper security
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Add descriptive title if not present
    if (!link.hasAttribute('title')) {
      link.setAttribute('title', `Visit ${link.textContent.trim() || 'external site'} (opens in new window)`);
    }
  });
}

// Initialize lazy loading for images
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading') && !img.classList.contains('no-lazy')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
}

function isMobile() {
  return window.innerWidth < 768;
}

// Helper function to determine if a URL is a Bible reference link (Bible.com)
function isBibleComLink(url) {
  if (!url) return false;
  try {
    // Handle both string URLs and URL objects
    const urlString = typeof url === 'string' ? url : url.toString();
    // Check for Bible.com links instead of BibleGateway
    return urlString.toLowerCase().includes('bible.com/bible');
  } catch (e) {
    // In case of malformed URLs
    return typeof url === 'string' && url.toLowerCase().includes('bible.com/bible');
  }
}

// Apply logic to all social/contact icons in both hero and contact sections
function handleSocialLinks() {
  // Select all links in .social-icons and .social-list
  var links = document.querySelectorAll(".social-icons a, .social-list a");
  links.forEach(function (link) {
    // Prevent duplicate listeners
    link.removeEventListener("click", link._popupHandler, false);
    link._popupHandler = function (e) {
      var url = link.getAttribute("data-url") || link.getAttribute("href");
      // Do not open popup for email links
      if (url && url.startsWith("mailto:")) {
        return;
      }
      if (!isMobile()) {
        e.preventDefault();
        // Open popup window for desktop, centered relative to current window
        var w = 600;
        var h = 700;
        var dualScreenLeft =
          window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        var dualScreenTop =
          window.screenTop !== undefined ? window.screenTop : window.screenY;
        var width = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : screen.width;
        var height = window.innerHeight
          ? window.innerHeight
          : document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : screen.height;
        var left = dualScreenLeft + (width - w) / 2;
        var top = dualScreenTop + (height - h) / 2;
        window.open(
          url,
          "_blank",
          "width=" +
            w +
            ",height=" +
            h +
            ",top=" +
            top +
            ",left=" +
            left +
            ",resizable,scrollbars"
        );
      } else {
        // On mobile, use native navigation and allow back button to return
        window.location.assign(url);
      }
    };
    link.addEventListener("click", link._popupHandler, false);
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

document.addEventListener("DOMContentLoaded", handleSocialLinks);
document.addEventListener("DOMContentLoaded", function () {
  const howjLink = document.querySelector(
    'a[href="https://www.instagram.com/howj_global"]'
  );
  if (howjLink) {
    howjLink.addEventListener("click", function (e) {
      e.preventDefault();
      const popupWidth = 600;
      const popupHeight = 700;
      const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screenY;
      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;
      const left = dualScreenLeft + (width - popupWidth) / 2;
      const top = dualScreenTop + (height - popupHeight) / 2;
      window.open(
        "https://www.instagram.com/howj_global",
        "howjPopup",
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );
    });
  }
});
function getCenteredPopupSpecs(popupWidth, popupHeight) {
  var dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  var dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;
  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;
  var left = dualScreenLeft + (width - popupWidth) / 2;
  var top = dualScreenTop + (height - popupHeight) / 2;
  return `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`;
}
// Handle popup behavior for About section links and Instagram embed
function handlePopupLinks() {
  // All links in .about-text and Instagram embed
  var aboutLinks = document.querySelectorAll(
    ".about-text a, .instagram-embed-responsive a"
  );
  aboutLinks.forEach(function (link) {
    // Skip Bible.com links - they're handled by our dedicated handler
    const href = link.getAttribute("href") || link.href;
    if (isBibleComLink(href)) {
      return;
    }
    
    link.removeEventListener("click", link._popupHandler, false);
    link._popupHandler = function (e) {
      if (!isMobile()) {
        e.preventDefault();
        var url = link.getAttribute("href");
        var specs = getCenteredPopupSpecs(600, 700);
        window.open(url, "_blank", specs);
      }
    };
    link.addEventListener("click", link._popupHandler, false);
  });
  // For Instagram iframe, overlay a transparent div to capture click
  var instaIframe = document.querySelector(
    ".instagram-embed-responsive iframe"
  );
  if (instaIframe && !isMobile()) {
    var overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.cursor = "pointer";
    overlay.style.zIndex = 10;
    overlay.style.background = "transparent";
    overlay.title = "Open Instagram Post";
    overlay.addEventListener("click", function (e) {
      e.preventDefault();
      var specs = getCenteredPopupSpecs(600, 700);
      window.open(instaIframe.src, "_blank", specs);
    });
    var parent = instaIframe.parentElement;
    parent.style.position = "relative";
    parent.appendChild(overlay);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  // Handle popup links, but avoid Bible.com links
  handlePopupLinks();
});
// Blog iframe modal logic
function handleBlogReadMore() {
  const modal = document.getElementById("blog-iframe-modal");
  if (!modal) return; // Prevent error if modal is missing
  const iframe = modal.querySelector("iframe");
  const closeBtn = modal.querySelector(".blog-iframe-close");
  const backdrop = modal.querySelector(".blog-iframe-backdrop");
  if (!iframe || !closeBtn || !backdrop) return;
  document.querySelectorAll(".read-more-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const blogFile = btn.getAttribute("data-blog");
      if (blogFile) {
        iframe.src = "blog/" + blogFile;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });
  function closeModal() {
    modal.style.display = "none";
    iframe.src = "";
    document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (
      modal.style.display === "flex" &&
      (e.key === "Escape" || e.key === "Esc")
    ) {
      closeModal();
    }
  });
}
document.addEventListener("DOMContentLoaded", handleBlogReadMore);
// Blog Modal logic
const blogModal = document.getElementById("blogModal");
const blogModalIframe = document.getElementById("blogModalIframe");
const blogModalClose = document.querySelector(".blog-modal-close");
const blogModalBackdrop = document.querySelector(".blog-modal-backdrop");

function closeBlogModal() {
  blogModal.style.display = "none";
  blogModalIframe.src = "";
  document.body.style.overflow = "";
}

function openBlogPopupWindow(blogFile) {
  const popupWidth = 900;
  const popupHeight = 700;
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;
  const left = dualScreenLeft + (width - popupWidth) / 2;
  const top = dualScreenTop + (height - popupHeight) / 2;
  const popup = window.open(
    `/blog/${blogFile}?popup=1`,
    "blogPopup",
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable,scrollbars=yes`
  );
  if (popup) {
    popup.focus();
  }
}

// Open popup window on Read More click
const readMoreBtns = document.querySelectorAll(".read-more-btn");
readMoreBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const blogFile = this.getAttribute("data-blog");
    openBlogPopupWindow(blogFile);
  });
});

// Close modal on X or backdrop click
blogModalClose.addEventListener("click", closeBlogModal);
blogModalBackdrop.addEventListener("click", closeBlogModal);

// Close modal on Escape key
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && blogModal.style.display === "block") {
    closeBlogModal();
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Remove allowfullscreen from all YouTube iframes (for any legacy iframes)
  var ytIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
  ytIframes.forEach(function (iframe) {
    iframe.removeAttribute("allowfullscreen");
  });
});

// --- Robust YouTube one-at-a-time playback using IFrame API ---
// Remove any previous static iframe logic for pausing
(function () {
  // Playlist IDs for each section
  var ytSections = [
    { id: "yt-worship", playlist: "PL9GoCpwDjkCU10rmhe9Y1Lw4ckTci4RvK" },
    { id: "yt-word", playlist: "PL9GoCpwDjkCVmKkD32sPz78wI8IBvYkZ5" },
    { id: "yt-hymns", playlist: "PL9GoCpwDjkCX5gXgnt6Xb0gQi0gCRfVgN" },
    // Christian Life as a playlist
    { id: "yt-christian-life", playlist: "PL9GoCpwDjkCVHSesG3mJ4qmLDWratKeg8" },
    { id: "yt-warfare", playlist: "PL9GoCpwDjkCVHSesG3mJ4qmLDWratKeg8" },
  ];
  var ytPlayers = [];
  var currentlyPlaying = null;

  // Load the YouTube IFrame API if not already present
  if (!window.YT || !window.YT.Player) {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  window.onYouTubeIframeAPIReady = function () {
    ytSections.forEach(function (section, idx) {
      var el = document.getElementById(section.id);
      if (!el) return;
      var playerConfig = {
        height: "315",
        width: "560",
        playerVars: {
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: function (event) {
            if (event.data === YT.PlayerState.PLAYING) {
              currentlyPlaying = event.target;
              ytPlayers.forEach(function (other) {
                if (other && other !== event.target) {
                  other.pauseVideo();
                }
              });
            }
          },
          onReady: function (event) {
            var iframe = event.target.getIframe();
            if (iframe) {
              iframe.removeAttribute("allowfullscreen");
              // Set accessible title attribute for screen readers
              var titles = [
                "Worship & Adoration",
                "The Word",
                "Hymns",
                "Christian Life",
              ];
              iframe.setAttribute("title", titles[idx] || "YouTube Playlist");
              iframe.style.borderRadius = "12px";
              iframe.style.boxShadow = "0 2px 12px rgba(2,136,209,0.08)";
              iframe.style.maxWidth = "100%";
            }
            // Try to overlay a div over the fullscreen button
            setTimeout(function () {
              try {
                var parent = iframe.parentElement;
                if (
                  parent &&
                  !parent.querySelector(".ytp-fullscreen-button-cover")
                ) {
                  var cover = document.createElement("div");
                  cover.className = "ytp-fullscreen-button-cover";
                  parent.appendChild(cover);
                }
              } catch (e) {}
            }, 1000); // Wait for YouTube controls to render
          },
        },
      };
      if (section.playlist) {
        playerConfig.playerVars.listType = "playlist";
        playerConfig.playerVars.list = section.playlist;
      } else if (section.video) {
        playerConfig.videoId = section.video;
      }
      ytPlayers[idx] = new YT.Player(section.id, playerConfig);
    });
    // MutationObserver to keep removing allowfullscreen from all YouTube iframes
    var observer = new MutationObserver(function () {
      document
        .querySelectorAll(
          'iframe[src*="youtube.com/embed/"], .ytp-fullscreen-button-cover'
        )
        .forEach(function (iframe) {
          if (iframe.hasAttribute && iframe.hasAttribute("allowfullscreen")) {
            iframe.removeAttribute("allowfullscreen");
          }
        });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["allowfullscreen"],
    });
  };
})();
// --- Dynamic Mentors Rendering ---
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/mentors.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var mentors = Array.isArray(data) ? data : data.mentors || [];
      var container = document.getElementById("mentors-list");
      if (!container) return;
      container.innerHTML = "";
      if (Array.isArray(mentors) && mentors.length > 0) {
        mentors.forEach(function (mentor) {
          var col = document.createElement("div");
          col.className = "col";
          var card = document.createElement("div");
          card.className = "mentor-card card p-3 h-100 text-center";
          var name = document.createElement("h5");
          name.className = "card-title mb-0";
          name.textContent = mentor.name || "";
          card.appendChild(name);
          // Render Ministry as clickable link (without the label) if both Ministry and minstry_url exist
          if (mentor.Ministry && mentor.minstry_url) {
            var p = document.createElement("p");
            p.className = "mentor-detail";
            var a = document.createElement("a");
            a.href = mentor.minstry_url;
            a.textContent = mentor.Ministry;
            a.target = "_blank";
            a.rel = "noopener";
            a.style.wordBreak = "break-word";
            a.addEventListener("click", function (e) {
              if (!isMobile()) {
                e.preventDefault();
                var w = 600;
                var h = 700;
                var dualScreenLeft =
                  window.screenLeft !== undefined
                    ? window.screenLeft
                    : window.screenX;
                var dualScreenTop =
                  window.screenTop !== undefined
                    ? window.screenTop
                    : window.screenY;
                var width = window.innerWidth
                  ? window.innerWidth
                  : document.documentElement.clientWidth
                  ? document.documentElement.clientWidth
                  : screen.width;
                var height = window.innerHeight
                  ? window.innerHeight
                  : document.documentElement.clientHeight
                  ? document.documentElement.clientHeight
                  : screen.height;
                var left = dualScreenLeft + (width - w) / 2;
                var top = dualScreenTop + (height - h) / 2;
                window.open(
                  mentor.minstry_url,
                  "_blank",
                  "width=" +
                    w +
                    ",height=" +
                    h +
                    ",top=" +
                    top +
                    ",left=" +
                    left +
                    ",resizable,scrollbars"
                );
              } else {
                // On mobile, use native navigation and allow back button to return home
                window.location.assign(mentor.minstry_url);
              }
            });
            p.appendChild(a);
            card.appendChild(p);
          }
          // Render all other properties except name, Ministry, minstry_url
          Object.keys(mentor).forEach(function (key) {
            if (key !== "name" && key !== "Ministry" && key !== "minstry_url") {
              var p = document.createElement("p");
              p.className = "mentor-detail";
              p.textContent =
                key.charAt(0).toUpperCase() + key.slice(1) + ": " + mentor[key];
              card.appendChild(p);
            }
          });
          col.appendChild(card);
          container.appendChild(col);
        });
      } else {
        container.innerHTML =
          '<div class="col"><div class="mentor-card card p-3 h-100 text-center">No mentors found.</div></div>';
      }
    })
    .catch(function () {
      var container = document.getElementById("mentors-list");
      if (container) {
        container.innerHTML =
          '<div class="col"><div class="mentor-card card p-3 h-100 text-center">Unable to load mentors.</div></div>';
      }
    });
});
// Dynamic rendering of contact/social links in the contact section
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/brotherfemi.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var contactList =
        data && data.brotherFemi && Array.isArray(data.brotherFemi.contact)
          ? data.brotherFemi.contact
          : [];
      var container = document.getElementById("contact-social-list");
      if (!container) return;
      container.innerHTML = "";
      var iconMap = {
        Email: "bi-envelope",
        Instagram: "bi-instagram",
        Thread: "bi-threads",
        Tiktok: "bi-tiktok",
        Youtube: "bi-youtube",
        Facebook: "bi-facebook",
        Website: "bi-globe",
      };
      contactList.forEach(function (item) {
        if (!item.url) return;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.url;
        a.title = item.type;
        a.target = item.type !== "Email" ? "_blank" : "";
        a.rel = item.type !== "Email" ? "noopener" : "";
        var i = document.createElement("i");
        i.className = "bi " + (iconMap[item.type] || "bi-link");
        a.appendChild(i);
        // Popup logic for all except Email
        if (item.type !== "Email") {
          a.addEventListener("click", function (e) {
            if (!isMobile()) {
              e.preventDefault();
              var w = 600;
              var h = 700;
              var dualScreenLeft =
                window.screenLeft !== undefined
                  ? window.screenLeft
                  : window.screenX;
              var dualScreenTop =
                window.screenTop !== undefined
                  ? window.screenTop
                  : window.screenY;
              var width = window.innerWidth
                ? window.innerWidth
                : document.documentElement.clientWidth
                ? document.documentElement.clientWidth
                : screen.width;
              var height = window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight
                ? document.documentElement.clientHeight
                : screen.height;
              var left = dualScreenLeft + (width - w) / 2;
              var top = dualScreenTop + (height - h) / 2;
              window.open(
                item.url,
                "_blank",
                "width=" +
                  w +
                  ",height=" +
                  h +
                  ",top=" +
                  top +
                  ",left=" +
                  left +
                  ",resizable,scrollbars"
              );
            }
          });
        }
        li.appendChild(a);
        container.appendChild(li);
      });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/brotherfemi.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var hero = data && data.brotherFemi ? data.brotherFemi : {};
      var heroTitle = document.querySelector(".hero .display-4");
      var heroDetails = document.querySelector(".hero .lead");
      if (heroTitle && hero.title) heroTitle.textContent = hero.title;
      if (heroDetails && hero.details) heroDetails.textContent = hero.details;
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/brotherfemi.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var heartCry =
        data && data.brotherFemi && Array.isArray(data.brotherFemi.heartCry)
          ? data.brotherFemi.heartCry
          : [];
      var heartCryList = document.getElementById("heart-cry-list");
      if (heartCryList) {
        heartCryList.innerHTML = "";
        heartCry.forEach(function (item) {
          var li = document.createElement("li");
          li.textContent = item;
          heartCryList.appendChild(li);
        });
      }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/brotherfemi.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var coreValues =
        data && data.brotherFemi && Array.isArray(data.brotherFemi.coreValues)
          ? data.brotherFemi.coreValues
          : [];
      var coreValuesList = document.getElementById("core-values-list");
      if (coreValuesList) {
        coreValuesList.innerHTML = "";
        coreValues.forEach(function (item) {
          var li = document.createElement("li");
          var span = document.createElement("span");
          span.className = "gold";
          span.textContent = item;
          li.appendChild(span);
          coreValuesList.appendChild(li);
        });
      }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/brotherfemi.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var vision =
        data && data.brotherFemi && data.brotherFemi.vision
          ? data.brotherFemi.vision
          : "";
      var mission =
        data && data.brotherFemi && data.brotherFemi.mission
          ? data.brotherFemi.mission
          : "";
      var visionEl = document.getElementById("vision-text");
      var missionEl = document.getElementById("mission-text");
      if (visionEl && vision) visionEl.textContent = vision;
      if (missionEl && mission) missionEl.textContent = mission;
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/brotherfemi.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var testimony =
        data && data.brotherFemi && data.brotherFemi.testimony
          ? data.brotherFemi.testimony
          : {};
      var textArr = Array.isArray(testimony.text) ? testimony.text : [];
      var urlObj = testimony.url || {};
      var iframeObj = testimony.iframe || {};
      var textContainer = document.getElementById("testimony-text");
      var iframeContainer = document.getElementById(
        "testimony-iframe-container"
      );
      if (textContainer) {
        textContainer.innerHTML = "";
        textArr.forEach(function (paragraph, idx) {
          var p = document.createElement("p");
          p.className = "about-text";
          // Insert the link only in the first paragraph if urlObj exists
          if (idx === 0 && urlObj && urlObj.href) {
            var howjIdx = paragraph.indexOf("HOWJ Atlanta");
            if (howjIdx !== -1) {
              var before = paragraph.substring(0, howjIdx);
              var after = paragraph.substring(howjIdx + "HOWJ Atlanta".length);
              p.append(document.createTextNode(before));
              var a = document.createElement("a");
              a.href = urlObj.href;
              a.target = urlObj.target || "_blank";
              a.rel = urlObj.rel || "noopener";
              a.textContent = "HOWJ Atlanta";
              a.style.wordBreak = "break-word";
              a.addEventListener("click", function (e) {
                if (!isMobile()) {
                  e.preventDefault();
                  var w = 600;
                  var h = 700;
                  var dualScreenLeft =
                    window.screenLeft !== undefined
                      ? window.screenLeft
                      : window.screenX;
                  var dualScreenTop =
                    window.screenTop !== undefined
                      ? window.screenTop
                      : window.screenY;
                  var width = window.innerWidth
                    ? window.innerWidth
                    : document.documentElement.clientWidth
                    ? document.documentElement.clientWidth
                    : screen.width;
                  var height = window.innerHeight
                    ? window.innerHeight
                    : document.documentElement.clientHeight
                    ? document.documentElement.clientHeight
                    : screen.height;
                  var left = dualScreenLeft + (width - w) / 2;
                  var top = dualScreenTop + (height - h) / 2;
                  window.open(
                    urlObj.href,
                    "_blank",
                    "width=" +
                      w +
                      ",height=" +
                      h +
                      ",top=" +
                      top +
                      ",left=" +
                      left +
                      ",resizable,scrollbars"
                  );
                }
              });
              p.append(a);
              p.append(document.createTextNode(after));
            } else {
              p.textContent = paragraph;
            }
          } else {
            p.textContent = paragraph;
          }
          textContainer.appendChild(p);
          if (idx < textArr.length - 1) {
            textContainer.appendChild(document.createElement("br"));
          }
        });
      }
      if (iframeContainer && iframeObj && iframeObj.src) {
        iframeContainer.innerHTML = "";
        var iframe = document.createElement("iframe");
        iframe.src = iframeObj.src;
        if ("allowtransparency" in iframeObj)
          iframe.allowTransparency = iframeObj.allowtransparency;
        if ("allowfullscreen" in iframeObj)
          iframe.allowFullscreen = iframeObj.allowfullscreen;
        if ("frameborder" in iframeObj)
          iframe.frameBorder = iframeObj.frameborder;
        if ("scrolling" in iframeObj) iframe.scrolling = iframeObj.scrolling;
        iframeContainer.appendChild(iframe);
      }
    });
});
function addInstagramPopupOverlay() {
  var igIframeContainer = document.getElementById("testimony-iframe-container");
  if (igIframeContainer) {
    var iframe = igIframeContainer.querySelector("iframe");
    if (iframe && !igIframeContainer.querySelector(".ig-popup-overlay")) {
      igIframeContainer.style.position = "relative";
      var overlay = document.createElement("div");
      overlay.className = "ig-popup-overlay";
      overlay.style.position = "absolute";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.cursor = "pointer";
      overlay.style.zIndex = 10;
      overlay.style.background = "transparent";
      overlay.title = "Open Instagram Post";
      overlay.addEventListener("click", function (e) {
        e.preventDefault();
        var w = 600;
        var h = 700;
        var dualScreenLeft =
          window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        var dualScreenTop =
          window.screenTop !== undefined ? window.screenTop : window.screenY;
        var width = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : screen.width;
        var height = window.innerHeight
          ? window.innerHeight
          : document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : screen.height;
        var left = dualScreenLeft + (width - w) / 2;
        var top = dualScreenTop + (height - h) / 2;
        window.open(
          iframe.src,
          "_blank",
          "width=" +
            w +
            ",height=" +
            h +
            ",top=" +
            top +
            ",left=" +
            left +
            ",resizable,scrollbars"
        );
      });
      igIframeContainer.appendChild(overlay);
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Add overlay after any dynamic rendering
  setTimeout(addInstagramPopupOverlay, 500);
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      // --- Footer Logic ---
      if (data.footer) {
        var footer = document.querySelector("footer.footer .container");
        if (footer) {
          footer.innerHTML = "";
          // Get current year
          var year =
            data.footer.year && !isNaN(data.footer.year)
              ? data.footer.year
              : new Date().getFullYear();
          // Replace {year} in copyright string
          var copyright = data.footer.copyright
            ? data.footer.copyright.replace(/\{year\}/g, year)
            : "";
          if (copyright) {
            var p = document.createElement("p");
            p.className = "mb-1";
            p.textContent = copyright;
            footer.appendChild(p);
          }
          if (data.footer.subtitle) {
            var small = document.createElement("small");
            small.textContent = data.footer.subtitle;
            footer.appendChild(small);
          }
        }
      }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      // --- Worship Section Logic (already present) ---
      // --- The Word Section Logic ---
      var wordSection = sections.find(function (s) {
        return s.id === "the-word";
      });
      if (wordSection) {
        var wordSectionEl = document.getElementById("the-word");
        if (wordSectionEl) {
          // Remove existing static text nodes
          var titleEl = wordSectionEl.querySelector(".section-title");
          var aboutTexts = wordSectionEl.querySelectorAll(".about-text");
          aboutTexts.forEach(function (el) {
            el.remove();
          });
          // Insert bible verse in quotes first if present
          var lastInserted = titleEl;
          if (wordSection.bibleVerse) {
            var pVerse = document.createElement("p");
            pVerse.className = "about-text";
            pVerse.textContent = '"' + wordSection.bibleVerse + '"';
            if (lastInserted && lastInserted.nextSibling) {
              wordSectionEl.insertBefore(pVerse, lastInserted.nextSibling);
            } else {
              wordSectionEl.appendChild(pVerse);
            }
            lastInserted = pVerse;
          }
          // Insert reference if present
          if (wordSection.reference) {
            var ref;
            if (wordSection.bible_url) {
              ref = document.createElement("a");
              ref.href = wordSection.bible_url;
              ref.target = "_blank";
              ref.rel = "noopener";
              ref.style.fontSize = "1rem";
              ref.style.color = "#0288d1";
              ref.textContent = "\u2014 " + wordSection.reference;
              ref.addEventListener("click", function (e) {
                if (!isMobile()) {
                  e.preventDefault();
                  var w = 600;
                  var h = 700;
                  var dualScreenLeft =
                    window.screenLeft !== undefined
                      ? window.screenLeft
                      : window.screenX;
                  var dualScreenTop =
                    window.screenTop !== undefined
                      ? window.screenTop
                      : window.screenY;
                  var width = window.innerWidth
                    ? window.innerWidth
                    : document.documentElement.clientWidth
                    ? document.documentElement.clientWidth
                    : screen.width;
                  var height = window.innerHeight
                    ? window.innerHeight
                    : document.documentElement.clientHeight
                    ? document.documentElement.clientHeight
                    : screen.height;
                  var left = dualScreenLeft + (width - w) / 2;
                  var top = dualScreenTop + (height - h) / 2;
                  window.open(
                    wordSection.bible_url,
                    "_blank",
                    "width=" +
                      w +
                      ",height=" +
                      h +
                      ",top=" +
                      top +
                      ",left=" +
                      left +
                      ",resizable,scrollbars"
                  );
                }
              });
            } else {
              ref = document.createElement("span");
              ref.style.fontSize = "1rem";
              ref.style.color = "#0288d1";
              ref.textContent = "\u2014 " + wordSection.reference;
            }
            // Insert after the verse
            if (lastInserted) {
              lastInserted.appendChild(document.createElement("br"));
              lastInserted.appendChild(ref);
            } else {
              wordSectionEl.appendChild(ref);
            }
          }
          // Insert dynamic text
          if (Array.isArray(wordSection.text)) {
            wordSection.text.forEach(function (paragraph) {
              var p = document.createElement("p");
              p.className = "about-text";
              p.textContent = paragraph;
              wordSectionEl.appendChild(p);
            });
          } else if (typeof wordSection.text === "string") {
            var p = document.createElement("p");
            p.className = "about-text";
            p.textContent = wordSection.text;
            wordSectionEl.appendChild(p);
          }
          // YouTube iframe is already present in the HTML after dynamic text
        }
      }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      // --- Worship Section Logic (already present) ---
      // --- The Word Section Logic (already present) ---
      // --- Hymns Section Logic ---
      var hymnsSection = sections.find(function (s) {
        return s.id === "hymns";
      });
      if (hymnsSection) {
        var hymnsSectionEl = document.getElementById("hymns");
        if (hymnsSectionEl) {
          // Remove existing static text nodes
          var titleEl = hymnsSectionEl.querySelector(".section-title");
          var aboutTexts = hymnsSectionEl.querySelectorAll(".about-text");
          aboutTexts.forEach(function (el) {
            el.remove();
          });
          // Insert bible verse in quotes first if present
          var lastInserted = titleEl;
          if (hymnsSection.bibleVerse) {
            var pVerse = document.createElement("p");
            pVerse.className = "about-text";
            pVerse.textContent = '"' + hymnsSection.bibleVerse + '"';
            if (lastInserted && lastInserted.nextSibling) {
              hymnsSectionEl.insertBefore(pVerse, lastInserted.nextSibling);
            } else {
              hymnsSectionEl.appendChild(pVerse);
            }
            lastInserted = pVerse;
          }
          // Insert reference if present
          if (hymnsSection.reference) {
            var ref;
            if (hymnsSection.bible_url) {
              ref = document.createElement("a");
              ref.href = hymnsSection.bible_url;
              ref.target = "_blank";
              ref.rel = "noopener";
              ref.style.fontSize = "1rem";
              ref.style.color = "#0288d1";
              ref.textContent = "\u2014 " + hymnsSection.reference;
              ref.addEventListener("click", function (e) {
                if (!isMobile()) {
                  e.preventDefault();
                  var w = 600;
                  var h = 700;
                  var dualScreenLeft =
                    window.screenLeft !== undefined
                      ? window.screenLeft
                      : window.screenX;
                  var dualScreenTop =
                    window.screenTop !== undefined
                      ? window.screenTop
                      : window.screenY;
                  var width = window.innerWidth
                    ? window.innerWidth
                    : document.documentElement.clientWidth
                    ? document.documentElement.clientWidth
                    : screen.width;
                  var height = window.innerHeight
                    ? window.innerHeight
                    : document.documentElement.clientHeight
                    ? document.documentElement.clientHeight
                    : screen.height;
                  var left = dualScreenLeft + (width - w) / 2;
                  var top = dualScreenTop + (height - h) / 2;
                  window.open(
                    hymnsSection.bible_url,
                    "_blank",
                    "width=" +
                      w +
                      ",height=" +
                      h +
                      ",top=" +
                      top +
                      ",left=" +
                      left +
                      ",resizable,scrollbars"
                  );
                }
              });
            } else {
              ref = document.createElement("span");
              ref.style.fontSize = "1rem";
              ref.style.color = "#0288d1";
              ref.textContent = "\u2014 " + hymnsSection.reference;
            }
            if (lastInserted) {
              lastInserted.appendChild(document.createElement("br"));
              lastInserted.appendChild(ref);
            } else {
              hymnsSectionEl.appendChild(ref);
            }
          }
          // Insert dynamic text
          if (Array.isArray(hymnsSection.text)) {
            hymnsSection.text.forEach(function (paragraph) {
              var p = document.createElement("p");
              p.className = "about-text";
              p.textContent = paragraph;
              hymnsSectionEl.appendChild(p);
            });
          } else if (typeof hymnsSection.text === "string") {
            var p = document.createElement("p");
            p.className = "about-text";
            p.textContent = hymnsSection.text;
            hymnsSectionEl.appendChild(p);
          }
          // YouTube iframe is already present in the HTML after dynamic text
        }
      }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // --- Footer Logic ---
      if (data.footer) {
        var footer = document.querySelector("footer.footer .container");
        if (footer) {
          footer.innerHTML = "";
          // Get current year
          var year =
            data.footer.year && !isNaN(data.footer.year)
              ? data.footer.year
              : new Date().getFullYear();
          // Replace {year} in copyright string
          var copyright = data.footer.copyright
            ? data.footer.copyright.replace(/\{year\}/g, year)
            : "";
          if (copyright) {
            var p = document.createElement("p");
            p.className = "mb-1";
            p.textContent = copyright;
            footer.appendChild(p);
          }
          if (data.footer.subtitle) {
            var small = document.createElement("small");
            small.textContent = data.footer.subtitle;
            footer.appendChild(small);
          }
        }
      }
    });
});
// --- Blog Section Dynamic Rendering ---
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      // --- Footer Logic ---
      if (data.footer) {
        var footer = document.querySelector("footer.footer .container");
        if (footer) {
          footer.innerHTML = "";
          // Get current year
          var year =
            data.footer.year && !isNaN(data.footer.year)
              ? data.footer.year
              : new Date().getFullYear();
          // Replace {year} in copyright string
          var copyright = data.footer.copyright
            ? data.footer.copyright.replace(/\{year\}/g, year)
            : "";
          if (copyright) {
            var p = document.createElement("p");
            p.className = "mb-1";
            p.textContent = copyright;
            footer.appendChild(p);
          }
          if (data.footer.subtitle) {
            var small = document.createElement("small");
            small.textContent = data.footer.subtitle;
            footer.appendChild(small);
          }
        }
      }
      // --- Blog Section Dynamic Rendering ---
      var blogSection = sections.find(function (s) {
        return s.id === "blog";
      });
      if (blogSection) {
        var blogSectionEl = document.getElementById("blog");
        if (blogSectionEl) {
          // Update intro text
          var aboutText = blogSectionEl.querySelector(".about-text");
          if (aboutText && blogSection.text) {
            aboutText.textContent = blogSection.text;
          }
          // Render blog accordion
          var blogAccordion = document.getElementById("blogAccordion");
          if (blogAccordion && Array.isArray(blogSection.blogtitles)) {
            blogAccordion.innerHTML = "";
            blogSection.blogtitles.forEach(function (entry, idx) {
              var item = document.createElement("div");
              item.className = "accordion-item";
              var headerId = "blog" + idx + "-heading";
              var collapseId = "blog" + idx;
              var iconClass =
                [
                  "bi-moon-stars",
                  "bi-feather",
                  "bi-lightbulb",
                  "bi-music-note",
                ][idx] || "bi-journal-text";
              item.innerHTML =
                '<h2 class="accordion-header" id="' +
                headerId +
                '">' +
                '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' +
                collapseId +
                '" aria-expanded="false" aria-controls="' +
                collapseId +
                '">' +
                '<i class="bi ' +
                iconClass +
                '"></i> ' +
                entry.title +
                "</button></h2>" +
                '<div id="' +
                collapseId +
                '" class="accordion-collapse collapse" aria-labelledby="' +
                headerId +
                '" data-bs-parent="#blogAccordion">' +
                '<div class="accordion-body">' +
                (entry.short_details ? entry.short_details : "") +
                '<div class="text-end mt-3">' +
                '<a href="#" class="btn btn-outline-primary btn-sm read-more-btn" data-blog="' +
                (entry.read_more_url || "") +
                '">Read More</a>' +
                "</div></div></div>";
              blogAccordion.appendChild(item);
            });
            // Re-attach read more logic if needed
            document.querySelectorAll(".read-more-btn").forEach(function (btn) {
              btn.addEventListener("click", function (e) {
                e.preventDefault();
                var blogFile = btn.getAttribute("data-blog");
                if (blogFile) {
                  if (!isMobile()) {
                    // Desktop: open in popup
                    var w = 900;
                    var h = 700;
                    var dualScreenLeft =
                      window.screenLeft !== undefined
                        ? window.screenLeft
                        : window.screenX;
                    var dualScreenTop =
                      window.screenTop !== undefined
                        ? window.screenTop
                        : window.screenY;
                    var width = window.innerWidth
                      ? window.innerWidth
                      : document.documentElement.clientWidth
                      ? document.documentElement.clientWidth
                      : screen.width;
                    var height = window.innerHeight
                      ? window.innerHeight
                      : document.documentElement.clientHeight
                      ? document.documentElement.clientHeight
                      : screen.height;
                    var left = dualScreenLeft + (width - w) / 2;
                    var top = dualScreenTop + (height - h) / 2;
                    window.open(
                      blogFile,
                      "_blank",
                      "width=" +
                        w +
                        ",height=" +
                        h +
                        ",top=" +
                        top +
                        ",left=" +
                        left +
                        ",resizable,scrollbars=yes"
                    );
                  } else {
                    // Mobile: use native navigation and allow back button to return
                    window.location.assign(blogFile);
                  }
                }
              });
            });
          }
        }
      }
    });
});
// BLOG SECTION DYNAMIC RENDERING
function renderBlogSection(sections) {
  const blogSection = sections.find((sec) => sec.id === "blog");
  if (!blogSection || !Array.isArray(blogSection.blogtitles)) return;
  const blogContainer = document.getElementById("blog-list");
  if (!blogContainer) return;
  blogContainer.innerHTML = "";
  blogSection.blogtitles.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";
    blogCard.innerHTML = `
      <h3 class="blog-title">${blog.title}</h3>
      <p class="blog-short-details">${blog.short_details}</p>
      <a class="blog-read-more cta-link" href="${blog.read_more_url}">Read More</a>
    `;
    blogContainer.appendChild(blogCard);
  });
}

// Fetch and render all sections
fetch("text/sections.json")
  .then((response) => response.json())
  .then((data) => {
    renderBlogSection(data.sections);
  });
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      // --- Worship & Adoration Section Logic (like The Word) ---
      var worshipSection = sections.find(function (s) {
        return s.id === "worship";
      });
      if (worshipSection) {
        var worshipSectionEl = document.getElementById("worship");
        if (worshipSectionEl) {
          // Remove existing static text nodes
          var titleEl = worshipSectionEl.querySelector(".section-title");
          var aboutTexts = worshipSectionEl.querySelectorAll(".about-text");
          aboutTexts.forEach(function (el) {
            el.remove();
          });
          // Insert bible verse in quotes first if present
          var lastInserted = titleEl;
          if (worshipSection.bibleVerse) {
            var pVerse = document.createElement("p");
            pVerse.className = "about-text";
            pVerse.textContent = '"' + worshipSection.bibleVerse + '"';
            if (lastInserted && lastInserted.nextSibling) {
              worshipSectionEl.insertBefore(pVerse, lastInserted.nextSibling);
            } else {
              worshipSectionEl.appendChild(pVerse);
            }
            lastInserted = pVerse;
          }
          // Insert reference if present
          if (worshipSection.reference) {
            var ref;
            if (worshipSection.bible_url) {
              ref = document.createElement("a");
              ref.href = worshipSection.bible_url;
              ref.target = "_blank";
              ref.rel = "noopener";
              ref.style.fontSize = "1rem";
              ref.style.color = "#02888d1";
              ref.textContent = "\u2014 " + worshipSection.reference;
              ref.addEventListener("click", function (e) {
                if (!isMobile()) {
                  e.preventDefault();
                  var w = 600;
                  var h = 700;
                  var dualScreenLeft =
                    window.screenLeft !== undefined
                      ? window.screenLeft
                      : window.screenX;
                  var dualScreenTop =
                    window.screenTop !== undefined
                      ? window.screenTop
                      : window.screenY;
                  var width = window.innerWidth
                    ? window.innerWidth
                    : document.documentElement.clientWidth
                    ? document.documentElement.clientWidth
                    : screen.width;
                  var height = window.innerHeight
                    ? window.innerHeight
                    : document.documentElement.clientHeight
                    ? document.documentElement.clientHeight
                    : screen.height;
                  var left = dualScreenLeft + (width - w) / 2;
                  var top = dualScreenTop + (height - h) / 2;
                  window.open(
                    worshipSection.bible_url,
                    "_blank",
                    "width=" +
                      w +
                      ",height=" +
                      h +
                      ",top=" +
                      top +
                      ",left=" +
                      left +
                      ",resizable,scrollbars"
                  );
                }
              });
            } else {
              ref = document.createElement("span");
              ref.style.fontSize = "1rem";
              ref.style.color = "#02888d1";
              ref.textContent = "\u2014 " + worshipSection.reference;
            }
            // Insert after the verse
            if (lastInserted) {
              lastInserted.appendChild(document.createElement("br"));
              lastInserted.appendChild(ref);
            } else {
              worshipSectionEl.appendChild(ref);
            }
          }
          // Insert dynamic text
          if (Array.isArray(worshipSection.text)) {
            worshipSection.text.forEach(function (paragraph) {
              var p = document.createElement("p");
              p.className = "about-text";
              p.textContent = paragraph;
              worshipSectionEl.appendChild(p);
            });
          } else if (typeof worshipSection.text === "string") {
            var p = document.createElement("p");
            p.className = "about-text";
            p.textContent = worshipSection.text;
            worshipSectionEl.appendChild(p);
          }
        }
      }
    });
});
// --- Warfare Section Rendering ---
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      var warfare = sections.find(function (s) {
        return s.id === "warfare";
      });
      if (warfare) {
        var mainContent = document.getElementById("warfare-content");
        if (mainContent) {
          mainContent.innerHTML = "";
          // Render bible verse and reference centered at the top if present
          var lastInserted = null;
          if (warfare.bibleVerse) {
            var verseWrapper = document.createElement("div");
            verseWrapper.className = "about-text text-center mb-2";
            verseWrapper.style.maxWidth = "600px";
            verseWrapper.style.margin = "0 auto 0.5rem auto";
            var pVerse = document.createElement("span");
            pVerse.textContent = '"' + warfare.bibleVerse + '"';
            verseWrapper.appendChild(pVerse);
            mainContent.appendChild(verseWrapper);
            lastInserted = verseWrapper;
          }
          if (warfare.reference) {
            var refWrapper = document.createElement("div");
            refWrapper.className = "about-text text-center mb-3";
            refWrapper.style.maxWidth = "600px";
            refWrapper.style.margin = "0 auto 1.2rem auto";
            var ref;
            if (warfare.bible_url) {
              ref = document.createElement("a");
              ref.href = warfare.bible_url;
              ref.target = "_blank";
              ref.rel = "noopener";
              ref.style.fontSize = "1rem";
              ref.style.color = "#02888d1";
              ref.textContent = "\u2014 " + warfare.reference;
            } else {
              ref = document.createElement("span");
              ref.style.fontSize = "1rem";
              ref.style.color = "#02888d1";
              ref.textContent = "\u2014 " + warfare.reference;
            }
            refWrapper.appendChild(ref);
            mainContent.appendChild(refWrapper);
          }
          // Add YouTube embed after verse/reference, matching other sections
          var ytDiv = document.createElement("div");
          ytDiv.className = "youtube-playlist-embed mb-4 playlist-animate";
          ytDiv.innerHTML =
            '<div id="yt-warfare"></div>' +
            '<div class="youtube-playlist-label">' +
            '<span class="youtube-playlist-label-text">' +
            '<i class="bi bi-youtube" style="color: #ff0000"></i> Warfare' +
            "</span>" +
            "</div>";
          mainContent.appendChild(ytDiv);
          // Render the iframe for the video
          setTimeout(function () {
            var ytContainer = document.getElementById("yt-warfare");
            if (ytContainer && !ytContainer.querySelector("iframe")) {
              var iframe = document.createElement("iframe");
              iframe.width = "420";
              iframe.height = "236";
              // Embed the playlist
              iframe.src =
                "https://www.youtube.com/embed/videoseries?list=PL9GoCpwDjkCVHSesG3mJ4qmLDWratKeg8&rel=0";
              iframe.title = "Warfare Playlist";
              iframe.frameBorder = "0";
              iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
              iframe.allowFullscreen = true;
              iframe.style.borderRadius = "12px";
              iframe.style.boxShadow = "0 2px 12px rgba(2,136,209,0.08)";
              iframe.style.maxWidth = "100%";
              ytContainer.appendChild(iframe);
            }
          }, 0);
          // Render headings for certain lines
          (warfare.text || []).forEach(function (txt, idx) {
            if (idx === 0) {
              var h3 = document.createElement("h3");
              h3.className = "mb-3 gradient-text";
              h3.textContent = txt;
              mainContent.appendChild(h3);
            } else if (txt === "Core Beliefs:" || txt === "In Practice:" || txt === "Simply put:") {
              var h5 = document.createElement("h5");
              h5.className = "mt-3 mb-2 gold";
              h5.textContent = txt;
              mainContent.appendChild(h5);
            } else if (txt.startsWith("• ")) {
              var ul = mainContent.lastElementChild && mainContent.lastElementChild.tagName === "UL" ? mainContent.lastElementChild : null;
              if (!ul) {
                ul = document.createElement("ul");
                ul.style.marginBottom = "0.5rem";
                mainContent.appendChild(ul);
              }
              var li = document.createElement("li");
              li.textContent = txt.replace(/^• /, "");
              ul.appendChild(li);
            } else if (txt === "A Christian is a forgiven sinner, made new by Christ, and committed to following Him.") {
              var p = document.createElement("p");
              p.className = "about-text mb-2 warfare-highlight";
              p.innerHTML = '<em>' + txt + '</em>';
              p.style.background = "#fffbe6";
              p.style.border = "1.5px solid #ffe066";
              p.style.borderRadius = "8px";
              p.style.padding = "0.75rem 1rem";
              p.style.fontWeight = "bold";
              p.style.opacity = "0";
              mainContent.appendChild(p);
              setTimeout(function() {
                p.style.opacity = "1";
                p.style.animation = "fadeInOut 6s ease-in-out 1";
              }, 100);
            } else if (txt.includes("spiritual warfare")) {
              var p = document.createElement("p");
              p.className = "about-text mb-2";
              // Make 'spiritual warfare' bold, italic, and an anchor link to the spiritualWarfare sub-section
              p.innerHTML = txt.replace(/spiritual warfare/gi, '<a href="#spiritual-warfare-section" class="fw-bold fst-italic text-decoration-underline">spiritual warfare</a>');
              mainContent.appendChild(p);
            } else {
              var p = document.createElement("p");
              p.className = "about-text mb-2";
              p.textContent = txt;
              mainContent.appendChild(p);
            }
          });
          // Render spiritualWarfare sub-section if present
          if (warfare.spiritualWarfare && Array.isArray(warfare.spiritualWarfare.text)) {
            var swSection = document.createElement("section");
            swSection.className = "mt-4 mb-4 p-3 rounded bg-light border spiritual-warfare-section";
            swSection.id = "spiritual-warfare-section";
            var swTitle = document.createElement("h4");
            swTitle.className = "royal mb-2";
            swTitle.textContent = "Spiritual Warfare";
            swSection.appendChild(swTitle);
            // Render each text line, and if it's the 'key scriptures' line, insert the bible references right after
            (warfare.spiritualWarfare.text || []).forEach(function (txt) {
              var p = document.createElement("p");
              p.className = "about-text mb-2";
              p.textContent = txt;
              swSection.appendChild(p);
              if (txt.toLowerCase().includes("key scriptures") && Array.isArray(warfare.spiritualWarfare.bibleReferences) && warfare.spiritualWarfare.bibleReferences.length > 0 && typeof warfare.spiritualWarfare.bibleReferences[0] === "object") {
                var refsDiv = document.createElement("div");
                refsDiv.className = "mb-3";
                refsDiv.style.textAlign = "center";
                refsDiv.style.marginTop = "-0.5rem";
                refsDiv.style.marginBottom = "1.5rem";
                warfare.spiritualWarfare.bibleReferences.forEach(function (refObj, i) {
                  var a = document.createElement("a");
                  a.href = "javascript:void(0);"; // Use javascript:void(0) to prevent default navigation
                  a.setAttribute('data-bible-url', refObj.url || "#"); // Store the actual URL as data attribute
                  a.rel = "noopener";
                  a.style.fontSize = "1rem";
                  a.style.color = "#0288d1";
                  // Remove bold fontWeight
                  // a.style.fontWeight = "bold";
                  a.textContent = refObj.reference;
                  // We'll add our own click handler
                  a.setAttribute('data-ref-type', 'warfare-bible-ref');
                  refsDiv.appendChild(a);
                  // Add retractable quote container after each link
                  var quoteDiv = document.createElement("div");
                  quoteDiv.className = "bible-quote-retract";
                  quoteDiv.setAttribute("data-ref", refObj.reference);
                  quoteDiv.setAttribute("data-href", refObj.url);
                  // Close button
                  var closeBtn = document.createElement("button");
                  closeBtn.className = "bible-quote-close";
                  closeBtn.innerHTML = "&times;";
                  closeBtn.title = "Close";
                  closeBtn.onclick = function(e) {
                    e.stopPropagation();
                    quoteDiv.classList.remove("active");
                  };
                  quoteDiv.appendChild(closeBtn);
                  // Iframe for Bible passage
                  var iframe = document.createElement("iframe");
                  iframe.src = refObj.url;
                  iframe.title = refObj.reference + " (Bible.com)";
                  iframe.setAttribute("loading", "lazy");
                  quoteDiv.appendChild(iframe);
                  // Store the URL for easy reference
                  quoteDiv.setAttribute('data-bible-url', refObj.url);
                  refsDiv.appendChild(quoteDiv);
                  
                  // Add click handler to show the retractable quote
                  a.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Close any other open quotes
                    document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
                      openQuote.classList.remove('active');
                    });
                    // Open this one
                    quoteDiv.classList.add('active');
                    // Scroll into view
                    setTimeout(function() {
                      quoteDiv.scrollIntoView({behavior: 'smooth', block: 'center'});
                    }, 100);
                    return false;
                  };
                  // Store the handler for potential reference
                  a._retractHandler = a.onclick;
                  
                  // Make sure this link doesn't trigger the default browser behavior
                  a.setAttribute("target", "");
                  a.setAttribute("data-original-url", a.href);
                  // Remove any default browser behaviors
                  a.removeAttribute("target");
                  
                  // Mark links as already having retractable quotes and ensure they're processed
                  a.setAttribute('data-has-retractable', 'true');
                  a.setAttribute('data-bible-warfare-ref', 'true');
                  if (i < warfare.spiritualWarfare.bibleReferences.length - 1) {
                    refsDiv.appendChild(document.createTextNode(" | "));
                  }
                });
                swSection.appendChild(refsDiv);
              }
            });
            mainContent.appendChild(swSection);
          }
        }
        // Children sections
        var childrenContent = document.getElementById("warfare-children");
        if (childrenContent && Array.isArray(warfare.children)) {
          childrenContent.innerHTML = "";
          warfare.children.forEach(function (child) {
            var div = document.createElement("div");
            div.className = "mb-4 pb-2 border-bottom";
            var h4 = document.createElement("h4");
            h4.className = "royal mb-2";
            h4.textContent = child.title;
            div.appendChild(h4);
            (child.text || []).forEach(function (txt) {
              if (txt.trim() === "") {
                var br = document.createElement("div");
                br.className = "paragraph-break";
                div.appendChild(br);
              } else {
                var p = document.createElement("p");
                p.className = "about-text mb-2";
                p.textContent = txt;
                div.appendChild(p);
              }
            });
            childrenContent.appendChild(div);
          });
        }
      }
    });
});
// --- Prevent global popup logic from affecting Bible.com links ---
document.addEventListener("DOMContentLoaded", function () {
  function removePopupFromBibleComLinks() {
    document.querySelectorAll('a[href]').forEach(function(a) {
      if (isBibleComLink(a.getAttribute('href') || a.href)) {
        // Remove any existing popup handler
        if (a._popupHandler) {
          a.removeEventListener('click', a._popupHandler, false);
          a._popupHandler = null;
        }
        
        // Remove any other click handlers that might interfere
        const newLink = a.cloneNode(true);
        newLink.addEventListener = a.addEventListener;
        newLink.removeEventListener = a.removeEventListener;
        newLink._retractHandler = a._retractHandler;
        a.parentNode.replaceChild(newLink, a);
      }
    });
  }
  // Run after all dynamic content is rendered but before our retractable quotes are applied
  removePopupFromBibleComLinks();
  setTimeout(removePopupFromBibleComLinks, 800);
  setTimeout(removePopupFromBibleComLinks, 1500);
});
// Handle Bible.com links with retractable quotes globally
function handleBibleComLinks() {
  // First, specifically handle Spiritual Warfare Bible references
  const spiritualWarfareSection = document.querySelector('.spiritual-warfare-section');
  if (spiritualWarfareSection) {
    const warfareLinks = spiritualWarfareSection.querySelectorAll('a[href]');
    warfareLinks.forEach(function(link) {
      const href = link.getAttribute('href') || link.href;
      if (isBibleComLink(href)) {
        // Remove target="_blank" to prevent opening in a new tab
        link.removeAttribute('target');
        
        // Make sure the retractable quotes work properly
        const quoteDiv = Array.from(spiritualWarfareSection.querySelectorAll('.bible-quote-retract')).find(
          div => div.getAttribute('data-ref') === href || div.getAttribute('data-bible-url') === href || div.getAttribute('data-href') === href
        );
        
        if (quoteDiv && !link._retractHandler) {
          link._retractHandler = function(e) {
            e.preventDefault();
            // Close any other open quotes
            document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
              openQuote.classList.remove('active');
            });
            // Open this one
            quoteDiv.classList.add('active');
            // Scroll into view
            setTimeout(function() {
              quoteDiv.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 100);
          };
          
          // Remove existing listeners first to avoid duplicates
          if (link._oldRetractHandler) {
            link.removeEventListener('click', link._oldRetractHandler);
          }
          link._oldRetractHandler = link._retractHandler;
          link.addEventListener('click', link._retractHandler);
          link.setAttribute('data-has-retractable', 'true');
        }
      }
    });
  }
  
  // Then handle all other Bible.com links
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(function(link) {
    const href = link.getAttribute('href') || link.href;
    
    if (isBibleComLink(href)) {
      // Mark this link so we know it's been processed
      link.setAttribute('data-bible-com-link', 'true');
      
      // Skip links that already have retractable quotes
      if (link.getAttribute('data-has-retractable') === 'true') {
        return;
      }
      
      // Remove any existing popup handlers
      if (link._popupHandler) {
        link.removeEventListener('click', link._popupHandler, false);
        link._popupHandler = null;
      }
      
      // Remove any existing retractable handlers to avoid duplicates
      if (link._retractHandler) {
        link.removeEventListener('click', link._retractHandler, false);
      }
      
      // Check if this link already has a retractable quote
      const existingQuote = document.querySelector(`.bible-quote-retract[data-href="${href}"]`);
      if (existingQuote) {
        // If it exists, just update the click handler
        link._retractHandler = function(e) {
          e.preventDefault();
          // Close any other open quotes
          document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
            openQuote.classList.remove('active');
          });
          // Open this one
          existingQuote.classList.add('active');
          // Scroll into view
          setTimeout(function() {
            existingQuote.scrollIntoView({behavior: 'smooth', block: 'center'});
          }, 100);
        };
        link.addEventListener('click', link._retractHandler);
        return;
      }
      
      // Create a new retractable quote container
      const quoteContainer = document.createElement('div');
      quoteContainer.className = 'bible-quote-retract';
      quoteContainer.setAttribute('data-href', href);
      quoteContainer.setAttribute('data-ref', link.textContent || 'Bible Verse');
      
      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'bible-quote-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.title = 'Close';
      closeBtn.onclick = function(e) {
        e.stopPropagation();
        quoteContainer.classList.remove('active');
      };
      quoteContainer.appendChild(closeBtn);
      
      // Add iframe for Bible passage
      const iframe = document.createElement('iframe');
      iframe.src = href;
      iframe.title = (link.textContent || 'Bible Verse') + ' (Bible.com)';
      iframe.setAttribute('loading', 'lazy');
      quoteContainer.appendChild(iframe);
      
      // Insert the quote container after the link's parent paragraph or div
      let targetElement = link.parentElement;
      while (targetElement && 
             !['P', 'DIV', 'LI', 'TD', 'SECTION'].includes(targetElement.nodeName)) {
        targetElement = targetElement.parentElement;
      }
      
      if (targetElement) {
        targetElement.parentNode.insertBefore(quoteContainer, targetElement.nextSibling);
      } else {
        // Fallback: insert after the link itself
        link.parentNode.insertBefore(quoteContainer, link.nextSibling);
      }
      
      // Add click handler to link
      link._retractHandler = function(e) {
        e.preventDefault();
        // Close any other open quotes
        document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
          openQuote.classList.remove('active');
        });
        // Open this one
        quoteContainer.classList.add('active');
        // Scroll into view
        setTimeout(function() {
          quoteContainer.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 100);
      };
      
      link.addEventListener('click', link._retractHandler);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Initial handling - run immediately and again after a delay to catch all dynamic content
  handleBibleComLinks();
  setTimeout(handleBibleComLinks, 500);
  setTimeout(handleBibleComLinks, 1000);
  
  // Set up a mutation observer to handle dynamically added links
  const observer = new MutationObserver(function(mutations) {
    let shouldProcess = false;
    
    mutations.forEach(function(mutation) {
      // Check for attribute changes that might add href to links
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'href' && 
          mutation.target.tagName === 'A') {
        const href = mutation.target.getAttribute('href') || mutation.target.href;
        if (isBibleComLink(href) && !mutation.target.getAttribute('data-has-retractable')) {
          shouldProcess = true;
        }
      }
      
      // Check for new nodes added
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === 1) { // Element node
            if (node.tagName === 'A') {
              if (!node.getAttribute('data-has-retractable') && isBibleComLink(node.href)) {
                shouldProcess = true;
              }
            } else {
              const links = node.querySelectorAll('a:not([data-has-retractable])');
              if (links.length > 0) {
                links.forEach(link => {
                  if (isBibleComLink(link.href)) {
                    shouldProcess = true;
                  }
                });
              }
            }
          }
        }
      }
    });
    
    if (shouldProcess) {
      handleBibleComLinks();
      removePopupFromBibleComLinks();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href']
  });
});
// Function to specifically handle the Spiritual Warfare Bible references
function fixWarfareReferences() {
  // Target the specific section
  const warfareSection = document.querySelector('#spiritual-warfare-section');
  if (!warfareSection) return;
  
  // Find all Bible references (including those with javascript:void(0) as href)
  const bibleLinks = warfareSection.querySelectorAll('a[data-ref-type="warfare-bible-ref"]');
  
  bibleLinks.forEach(function(link) {
    // Remove any default browser behaviors that might cause navigation
    link.removeAttribute('target');
    
    // Get the corresponding quote div
    const ref = link.textContent;
    const href = link.getAttribute('data-bible-url') || link.getAttribute('href');
    const quoteDiv = Array.from(warfareSection.querySelectorAll('.bible-quote-retract')).find(
      div => div.getAttribute('data-ref') === ref || div.getAttribute('data-bible-url') === href || div.getAttribute('data-href') === href
    );
    
    if (quoteDiv) {
      // Replace the click handler completely
      link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close any other open quotes
        document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
          openQuote.classList.remove('active');
        });
        
        // Open this one
        quoteDiv.classList.add('active');
        
        // Scroll into view
        setTimeout(function() {
          quoteDiv.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 100);
        
        return false; // Ensure the browser doesn't follow the link
      };
    }
  });
}

// Call our fix function after the content is loaded and after a delay to ensure it runs after dynamic content is rendered
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(fixWarfareReferences, 1000);
  setTimeout(fixWarfareReferences, 2000);
});

// Also add a mutation observer specifically for the Spiritual Warfare section
document.addEventListener("DOMContentLoaded", function() {
  const observer = new MutationObserver(function(mutations) {
    if (document.querySelector('#spiritual-warfare-section')) {
      fixWarfareReferences();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
// Add a global click event handler to catch any Bible references that still might open in a new tab
document.addEventListener('click', function(e) {
  // Check if we're inside the spiritual warfare section
  const warfareSection = document.getElementById('spiritual-warfare-section');
  if (!warfareSection) return;
  
  // Check if the click is inside this section
  if (!warfareSection.contains(e.target)) return;
  
  // Check if we clicked on a link or inside one
  let link = e.target;
  while (link && link.tagName !== 'A' && link !== warfareSection) {
    link = link.parentElement;
  }
  
  // If this is a Bible reference link
  if (link && link.tagName === 'A') {
    const href = link.getAttribute('href');
    const dataBibleUrl = link.getAttribute('data-bible-url');
    
    // If this is a Bible.com link or has data-bible-url attribute
    if ((href && href.includes('bible.com')) || dataBibleUrl) {
      // Find the corresponding quote div
      const ref = link.textContent;
      const bibleUrl = dataBibleUrl || href;
      const quoteDiv = Array.from(warfareSection.querySelectorAll('.bible-quote-retract')).find(
        div => div.getAttribute('data-ref') === ref || 
               div.getAttribute('data-href') === bibleUrl || 
               div.getAttribute('data-bible-url') === bibleUrl
      );
      
      if (quoteDiv) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close any other open quotes
        document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
          openQuote.classList.remove('active');
        });
        
        // Open this one
        quoteDiv.classList.add('active');
        
        // Scroll into view
        setTimeout(function() {
          quoteDiv.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 100);
        
        return false;
      }
    }
  }
}, true); // Use capturing to intercept the event before it reaches the link

// Initialize SEO features when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Apply SEO enhancements
  enhanceNavigationLinks();
  initLazyLoading();
  
  // Handle section navigation for updating breadcrumbs
  window.addEventListener('hashchange', function() {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      updateBreadcrumbs(sectionId);
    }
  });
  
  // Check if there's an initial hash
  if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);
    updateBreadcrumbs(sectionId);
  }

  // The rest of your initialization code will continue below...
});
