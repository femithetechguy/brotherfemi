function isMobile() {
  return window.innerWidth < 768;
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
document.addEventListener("DOMContentLoaded", handlePopupLinks);
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
      ytPlayers[idx] = new YT.Player(section.id, {
        height: "315",
        width: "560",
        playerVars: {
          listType: "playlist",
          list: section.playlist,
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
              var titles = ["Worship & Adoration", "The Word", "Hymns"];
              iframe.setAttribute("title", titles[idx] || "YouTube Playlist");
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
      });
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
                        ",resizable,scrollbars"
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
