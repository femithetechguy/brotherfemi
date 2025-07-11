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
    // Remove any existing popup handlers
    link.removeEventListener("click", link._popupHandler, false);
    
    var url = link.getAttribute("data-url") || link.getAttribute("href");
    // For email links, leave default behavior
    if (url && url.startsWith("mailto:")) {
      return;
    }
    
    // For all other social links, open in new tab
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    
    // Remove any popup handlers
    link._popupHandler = null;
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
    // Remove any existing popup handlers and make it open in new tab
    howjLink.removeEventListener("click", howjLink._popupHandler);
    howjLink.setAttribute("target", "_blank");
    howjLink.setAttribute("rel", "noopener noreferrer");
    howjLink._popupHandler = null;
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
    
    // Remove any existing popup handlers
    link.removeEventListener("click", link._popupHandler, false);
    
    // For all other links, open in new tab
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    
    // Remove any popup handlers
    link._popupHandler = null;
  });
  // For Instagram iframe, overlay a transparent div to capture click
  var instaIframe = document.querySelector(
    ".instagram-embed-responsive iframe"
  );
  if (instaIframe) {
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
      e.stopPropagation();
      
      var url = instaIframe.src;
      
      // Check if this link already has a retractable quote
      const existingQuote = document.querySelector(`.bible-quote-retract[data-href="${url}"]`);
      if (existingQuote) {
        // If it exists, just activate it
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
        return;
      }
      
      // Create a new retractable quote container
      const quoteContainer = document.createElement('div');
      quoteContainer.className = 'bible-quote-retract';
      quoteContainer.setAttribute('data-href', url);
      quoteContainer.setAttribute('data-ref', 'Instagram Post');
      
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
      
      // Add iframe for social content
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.title = 'Instagram Post - Brother Femi';
      iframe.setAttribute('loading', 'lazy');
      
      // Create fallback message for iframe loading failures
      const fallbackMessage = document.createElement('div');
      fallbackMessage.className = 'iframe-fallback-message';
      fallbackMessage.style.display = 'none';
      fallbackMessage.innerHTML = `
        <div class="fallback-content">
          <h3>Content Cannot Be Displayed</h3>
          <p>This content cannot be displayed in a popup due to security restrictions.</p>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="fallback-link">
            <i class="fa fa-external-link"></i> Open in New Tab
          </a>
        </div>
      `;
      
      // Add error handling for iframe loading
      iframe.addEventListener('error', function() {
        showFallbackMessage();
      });
      
      // Also handle cases where iframe loads but is restricted
      iframe.addEventListener('load', function() {
        // Check if the iframe is actually blocked by X-Frame-Options
        setTimeout(function() {
          try {
            // Try to access the iframe's content - this will fail if blocked
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (!iframeDoc || iframeDoc.body.innerHTML === '') {
              showFallbackMessage();
            }
          } catch (e) {
            // X-Frame-Options blocking detected
            showFallbackMessage();
          }
        }, 2000); // Wait 2 seconds for content to load
      });
      
      function showFallbackMessage() {
        iframe.style.display = 'none';
        fallbackMessage.style.display = 'block';
      }
      
      quoteContainer.appendChild(iframe);
      quoteContainer.appendChild(fallbackMessage);
      
      // Insert the quote container after the Instagram embed
      let targetElement = instaIframe.parentElement;
      while (targetElement && 
             !['P', 'DIV', 'LI', 'TD', 'SECTION'].includes(targetElement.nodeName)) {
        targetElement = targetElement.parentElement;
      }
      
      if (targetElement) {
        targetElement.parentNode.insertBefore(quoteContainer, targetElement.nextSibling);
      } else {
        // Fallback: insert after the iframe itself
        instaIframe.parentNode.insertBefore(quoteContainer, instaIframe.nextSibling);
      }
      
      // Close any other open quotes and activate this one
      document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
        openQuote.classList.remove('active');
      });
      quoteContainer.classList.add('active');
      
      // Scroll into view
      setTimeout(function() {
        quoteContainer.scrollIntoView({behavior: 'smooth', block: 'center'});
      }, 100);
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
    { id: "yt-newlife", playlist: "PL9GoCpwDjkCVHSesG3mJ4qmLDWratKeg8" },
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
            a.href = "javascript:void(0);";
            a.textContent = mentor.Ministry;
            a.setAttribute('data-mentor-url', mentor.minstry_url);
            a.setAttribute('data-mentor-name', mentor.name || 'Mentor');
            a.className = "mentor-link";
            a.style.wordBreak = "break-word";
            a.style.color = "#0288d1";
            a.style.textDecoration = "underline";
            a.style.cursor = "pointer";
            
            // Add click handler for retractable popup
            a.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              
              // Create or get the popup
              var popupId = 'mentor-popup-' + mentor.name.replace(/\s+/g, '-').toLowerCase();
              var existingPopup = document.getElementById(popupId);
              
              if (!existingPopup) {
                // Create new popup
                var popup = document.createElement("div");
                popup.id = popupId;
                popup.className = "mentor-popup-retract";
                
                var popupContent = document.createElement("div");
                popupContent.className = "mentor-popup-content";
                
                var closeBtn = document.createElement("button");
                closeBtn.className = "mentor-popup-close";
                closeBtn.innerHTML = "&times;";
                closeBtn.title = "Close";
                closeBtn.onclick = function(e) {
                  e.stopPropagation();
                  popup.classList.remove("active");
                };
                
                var iframe = document.createElement("iframe");
                iframe.src = mentor.minstry_url;
                iframe.title = mentor.name + " Ministry";
                iframe.setAttribute("loading", "lazy");
                
                // Create fallback message for iframe loading failures
                var fallbackMessage = document.createElement("div");
                fallbackMessage.className = "iframe-fallback-message";
                fallbackMessage.style.display = "none";
                fallbackMessage.innerHTML = `
                  <div class="fallback-content">
                    <h3>Content Cannot Be Displayed</h3>
                    <p>This content cannot be displayed in a popup due to security restrictions.</p>
                    <a href="${mentor.minstry_url}" target="_blank" rel="noopener noreferrer" class="fallback-link">
                      <i class="fa fa-external-link"></i> Open in New Tab
                    </a>
                  </div>
                `;
                
                // Add error handling for iframe loading
                iframe.addEventListener('error', function() {
                  showFallbackMessage();
                });
                
                // Also handle cases where iframe loads but is restricted
                iframe.addEventListener('load', function() {
                  // Check if the iframe is actually blocked by X-Frame-Options
                  setTimeout(function() {
                    try {
                      // Try to access the iframe's content - this will fail if blocked
                      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                      if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                        showFallbackMessage();
                      }
                    } catch (e) {
                      // X-Frame-Options blocking detected
                      showFallbackMessage();
                    }
                  }, 2000); // Wait 2 seconds for content to load
                });
                
                function showFallbackMessage() {
                  iframe.style.display = "none";
                  fallbackMessage.style.display = "block";
                }
                
                popupContent.appendChild(closeBtn);
                popupContent.appendChild(iframe);
                popupContent.appendChild(fallbackMessage);
                popup.appendChild(popupContent);
                
                // Close popup when clicking outside
                popup.addEventListener('click', function(e) {
                  if (e.target === popup) {
                    popup.classList.remove("active");
                  }
                });
                
                // Close popup with Escape key
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Escape' && popup.classList.contains('active')) {
                    popup.classList.remove("active");
                  }
                });
                
                document.body.appendChild(popup);
                existingPopup = popup;
              }
              
              // Close any other open popups (including Bible quote popups)
              document.querySelectorAll('.mentor-popup-retract.active').forEach(function(openPopup) {
                openPopup.classList.remove('active');
              });
              document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
                openQuote.classList.remove('active');
              });
              
              // Open this popup
              existingPopup.classList.add('active');
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
        // All links except Email open in new tab (no popup)
        li.appendChild(a);
        container.appendChild(li);
      });
      
      // Add Bible verse after social media icons
      addContactBibleVerse();
    });
});

// Function to add Bible verse after contact social media icons
function addContactBibleVerse() {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      var contactSection = sections.find(function (s) {
        return s.id === "contact";
      });
      
      if (contactSection && contactSection.bibleVerse) {
        var container = document.getElementById("contact-social-list");
        if (!container) return;
        
        // Create a wrapper div for the Bible verse
        var bibleVerseWrapper = document.createElement("div");
        bibleVerseWrapper.className = "contact-bible-verse-wrapper";
        bibleVerseWrapper.style.textAlign = "center";
        bibleVerseWrapper.style.marginTop = "1.5rem";
        bibleVerseWrapper.style.padding = "1rem";
        
        // Create the Bible verse text
        var verseText = document.createElement("p");
        verseText.className = "contact-bible-verse";
        verseText.textContent = '"' + contactSection.bibleVerse + '"';
        verseText.style.fontSize = "1rem";
        verseText.style.fontStyle = "italic";
        verseText.style.color = "#0288d1";
        verseText.style.marginBottom = "0.5rem";
        
        // Create the reference link
        var referenceLink = document.createElement("a");
        referenceLink.href = "javascript:void(0);";
        referenceLink.textContent = "— " + contactSection.reference;
        referenceLink.style.fontSize = "0.9rem";
        referenceLink.style.color = "#0288d1";
        referenceLink.style.textDecoration = "underline";
        referenceLink.style.cursor = "pointer";
        referenceLink.title = "Click to read full verse";
        referenceLink.setAttribute('data-has-retractable', 'true'); // Mark as having custom handler
        
        // Add click handler for retractable popup
        referenceLink.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          
          var url = contactSection.bible_url;
          
          // Check if this link already has a retractable quote
          var existingQuote = document.querySelector('.bible-quote-retract[data-href="' + url + '"]');
          if (existingQuote) {
            // If it exists, just activate it
            // Close any other open quotes
            document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
              openQuote.classList.remove('active');
            });
            document.querySelectorAll('.mentor-popup-retract.active').forEach(function(openPopup) {
              openPopup.classList.remove('active');
            });
            // Open this one
            existingQuote.classList.add('active');
            // Scroll into view
            setTimeout(function() {
              existingQuote.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 100);
            return;
          }
          
          // Create a new retractable quote container
          var quoteContainer = document.createElement('div');
          quoteContainer.className = 'bible-quote-retract';
          quoteContainer.setAttribute('data-href', url);
          quoteContainer.setAttribute('data-ref', contactSection.reference);
          
          // Add close button
          var closeBtn = document.createElement('button');
          closeBtn.className = 'bible-quote-close';
          closeBtn.innerHTML = '&times;';
          closeBtn.title = 'Close';
          closeBtn.onclick = function(e) {
            e.stopPropagation();
            quoteContainer.classList.remove('active');
          };
          quoteContainer.appendChild(closeBtn);
          
          // Add "Back to Page" button
          var backToPageLink = document.createElement('a');
          backToPageLink.href = 'javascript:void(0);';
          backToPageLink.className = 'bible-back-to-page';
          backToPageLink.textContent = '← Back to Page';
          backToPageLink.onclick = function(e) {
            e.stopPropagation();
            quoteContainer.classList.remove('active');
          };
          quoteContainer.appendChild(backToPageLink);
          
          // Add iframe for Bible content
          var iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.title = contactSection.reference + ' - Brother Femi';
          iframe.setAttribute('loading', 'lazy');
          
          // Create fallback message for iframe loading failures
          var fallbackMessage = document.createElement('div');
          fallbackMessage.className = 'iframe-fallback-message';
          fallbackMessage.style.display = 'none';
          fallbackMessage.innerHTML = 
            '<div class="fallback-content">' +
              '<h3>Content Cannot Be Displayed</h3>' +
              '<p>This content cannot be displayed in a popup due to security restrictions.</p>' +
              '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="fallback-link">' +
                '<i class="fa fa-external-link"></i> Open in New Tab' +
              '</a>' +
            '</div>';
          
          // Add error handling for iframe loading
          iframe.addEventListener('error', function() {
            showFallbackMessage();
          });
          
          // Also handle cases where iframe loads but is restricted
          iframe.addEventListener('load', function() {
            // Check if the iframe is actually blocked by X-Frame-Options
            setTimeout(function() {
              try {
                // Try to access the iframe's content - this will fail if blocked
                var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                  showFallbackMessage();
                }
              } catch (e) {
                // X-Frame-Options blocking detected
                showFallbackMessage();
              }
            }, 2000); // Wait 2 seconds for content to load
          });
          
          function showFallbackMessage() {
            iframe.style.display = 'none';
            fallbackMessage.style.display = 'block';
          }
          
          quoteContainer.appendChild(iframe);
          quoteContainer.appendChild(fallbackMessage);
          
          // Insert the quote container after the contact section
          var contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.parentNode.insertBefore(quoteContainer, contactSection.nextSibling);
          } else {
            // Fallback: insert after the container
            container.parentNode.insertBefore(quoteContainer, container.nextSibling);
          }
          
          // Close any other open quotes and activate this one
          document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
            openQuote.classList.remove('active');
          });
          document.querySelectorAll('.mentor-popup-retract.active').forEach(function(openPopup) {
            openPopup.classList.remove('active');
          });
          quoteContainer.classList.add('active');
          
          // Scroll into view
          setTimeout(function() {
            quoteContainer.scrollIntoView({behavior: 'smooth', block: 'center'});
          }, 100);
        });
        
        bibleVerseWrapper.appendChild(verseText);
        bibleVerseWrapper.appendChild(referenceLink);
        
        // Insert the Bible verse after the social media icons
        container.parentNode.insertBefore(bibleVerseWrapper, container.nextSibling);
      }
    })
    .catch(function (error) {
      console.log("Could not load contact Bible verse:", error);
    });
}
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
              a.target = "_blank";
              a.rel = "noopener noreferrer";
              a.textContent = "HOWJ Atlanta";
              a.style.wordBreak = "break-word";
              // No popup logic - link opens in new tab naturally via target="_blank"
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
      
      // Render anchor scripture
      var anchor = data && data.brotherFemi && data.brotherFemi.anchor ? data.brotherFemi.anchor : {};
      var anchorContainer = document.getElementById("anchor-scripture");
      if (anchorContainer && anchor.bibleVerse) {
        anchorContainer.innerHTML = "";
        
        // Create verse paragraph
        var versePara = document.createElement("p");
        versePara.className = "about-text";
        versePara.style.fontStyle = "italic";
        versePara.style.fontSize = "1.1rem";
        versePara.style.color = "#0288d1";
        versePara.style.marginBottom = "0.5rem";
        versePara.textContent = '"' + anchor.bibleVerse + '"';
        anchorContainer.appendChild(versePara);
        
        // Create reference paragraph
        if (anchor.reference) {
          var refPara = document.createElement("p");
          refPara.className = "about-text";
          refPara.style.fontSize = "1rem";
          refPara.style.color = "#0288d1";
          refPara.style.fontWeight = "bold";
          refPara.textContent = "— " + anchor.reference;
          anchorContainer.appendChild(refPara);
        }
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
        e.stopPropagation();
        
        var url = iframe.src;
        
        // Check if this link already has a retractable quote
        const existingQuote = document.querySelector(`.bible-quote-retract[data-href="${url}"]`);
        if (existingQuote) {
          // If it exists, just activate it
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
          return;
        }
        
        // Create a new retractable quote container
        const quoteContainer = document.createElement('div');
        quoteContainer.className = 'bible-quote-retract';
        quoteContainer.setAttribute('data-href', url);
        quoteContainer.setAttribute('data-ref', 'Testimony Instagram Post');
        
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
        
        // Add iframe for social content
        const iframePopup = document.createElement('iframe');
        iframePopup.src = url;
        iframePopup.title = 'Testimony Instagram Post - Brother Femi';
        iframePopup.setAttribute('loading', 'lazy');
        
        // Create fallback message for iframe loading failures
        const fallbackMessage = document.createElement('div');
        fallbackMessage.className = 'iframe-fallback-message';
        fallbackMessage.style.display = 'none';
        fallbackMessage.innerHTML = `
          <div class="fallback-content">
            <h3>Content Cannot Be Displayed</h3>
            <p>This content cannot be displayed in a popup due to security restrictions.</p>
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="fallback-link">
              <i class="fa fa-external-link"></i> Open in New Tab
            </a>
          </div>
        `;
        
        // Add error handling for iframe loading
        iframePopup.addEventListener('error', function() {
          showFallbackMessage();
        });
        
        // Also handle cases where iframe loads but is restricted
        iframePopup.addEventListener('load', function() {
          // Check if the iframe is actually blocked by X-Frame-Options
          setTimeout(function() {
            try {
              // Try to access the iframe's content - this will fail if blocked
              var iframeDoc = iframePopup.contentDocument || iframePopup.contentWindow.document;
              if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                showFallbackMessage();
              }
            } catch (e) {
              // X-Frame-Options blocking detected
              showFallbackMessage();
            }
          }, 2000); // Wait 2 seconds for content to load
        });
        
        function showFallbackMessage() {
          iframePopup.style.display = 'none';
          fallbackMessage.style.display = 'block';
        }
        
        quoteContainer.appendChild(iframePopup);
        quoteContainer.appendChild(fallbackMessage);
        
        // Insert the quote container after the Instagram embed
        let targetElement = igIframeContainer;
        while (targetElement && 
               !['P', 'DIV', 'LI', 'TD', 'SECTION'].includes(targetElement.nodeName)) {
          targetElement = targetElement.parentElement;
        }
        
        if (targetElement) {
          targetElement.parentNode.insertBefore(quoteContainer, targetElement.nextSibling);
        } else {
          // Fallback: insert after the iframe container itself
          igIframeContainer.parentNode.insertBefore(quoteContainer, igIframeContainer.nextSibling);
        }
        
        // Close any other open quotes and activate this one
        document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
          openQuote.classList.remove('active');
        });
        quoteContainer.classList.add('active');
        
        // Scroll into view
        setTimeout(function() {
          quoteContainer.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 100);
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
// --- New Life Section Rendering ---
document.addEventListener("DOMContentLoaded", function () {
  fetch("text/sections.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sections = Array.isArray(data.sections) ? data.sections : [];
      var newlife = sections.find(function (s) {
        return s.id === "newlife";
      });
      if (newlife) {
        var mainContent = document.getElementById("newlife-content");
        if (mainContent) {
          mainContent.innerHTML = "";
          // Render bible verse and reference centered at the top if present
          var lastInserted = null;
          if (newlife.bibleVerse) {
            var verseWrapper = document.createElement("div");
            verseWrapper.className = "about-text text-center mb-2";
            verseWrapper.style.maxWidth = "600px";
            verseWrapper.style.margin = "0 auto 0.5rem auto";
            var pVerse = document.createElement("span");
            pVerse.textContent = '"' + newlife.bibleVerse + '"';
            verseWrapper.appendChild(pVerse);
            mainContent.appendChild(verseWrapper);
            lastInserted = verseWrapper;
          }
          if (newlife.reference) {
            var refWrapper = document.createElement("div");
            refWrapper.className = "about-text text-center mb-3";
            refWrapper.style.maxWidth = "600px";
            refWrapper.style.margin = "0 auto 1.2rem auto";
            var ref;
            if (newlife.bible_url) {
              ref = document.createElement("a");
              ref.href = newlife.bible_url;
              ref.target = "_blank";
              ref.rel = "noopener";
              ref.style.fontSize = "1rem";
              ref.style.color = "#02888d1";
              ref.textContent = "\u2014 " + newlife.reference;
            } else {
              ref = document.createElement("span");
              ref.style.fontSize = "1rem";
              ref.style.color = "#02888d1";
              ref.textContent = "\u2014 " + newlife.reference;
            }
            refWrapper.appendChild(ref);
            mainContent.appendChild(refWrapper);
          }
          // Add YouTube embed after verse/reference, matching other sections
          var ytDiv = document.createElement("div");
          ytDiv.className = "youtube-playlist-embed mb-4 playlist-animate";
          ytDiv.innerHTML =
            '<div id="yt-newlife"></div>' +
            '<div class="youtube-playlist-label">' +
            '<span class="youtube-playlist-label-text">' +
            '<i class="bi bi-youtube" style="color: #ff0000"></i> New Life' +
            "</span>" +
            "</div>";
          mainContent.appendChild(ytDiv);
          // Render the iframe for the video
          setTimeout(function () {
            var ytContainer = document.getElementById("yt-newlife");
            if (ytContainer && !ytContainer.querySelector("iframe")) {
              var iframe = document.createElement("iframe");
              iframe.width = "420";
              iframe.height = "236";
              // Embed the playlist
              iframe.src =
                "https://www.youtube.com/embed/videoseries?list=PL9GoCpwDjkCVHSesG3mJ4qmLDWratKeg8&rel=0";
              iframe.title = "New Life Playlist";
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
          (newlife.text || []).forEach(function (txt, idx) {
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
              
              // Process Bible references in core beliefs
              var processedText = txt.replace(/^• /, "");
              if (newlife.core_beliefs_reference && Array.isArray(newlife.core_beliefs_reference)) {
                newlife.core_beliefs_reference.forEach(function(refObj) {
                  var refPattern = new RegExp('\\(' + refObj.reference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g');
                  processedText = processedText.replace(refPattern, function(match) {
                    return '<a href="javascript:void(0);" class="bible-reference-link core-beliefs-ref" data-bible-url="' + refObj.bible_url + '" data-reference="' + refObj.reference + '" style="color: #0288d1; text-decoration: none;">' + match + '</a>';
                  });
                });
              }
              
              li.innerHTML = processedText;
              ul.appendChild(li);
            } else if (txt === "A Christian is a forgiven sinner, made new by Christ, and committed to following Him.") {
              var p = document.createElement("p");
              p.className = "about-text mb-2 newlife-highlight";
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
            } else if (txt.includes("spiritual newlife")) {
              var p = document.createElement("p");
              p.className = "about-text mb-2";
              // Make 'spiritual newlife' bold, italic, and an anchor link to the spiritualNewlife sub-section
              p.innerHTML = txt.replace(/spiritual newlife/gi, '<a href="#spiritual-newlife-section" class="fw-bold fst-italic text-decoration-underline">spiritual newlife</a>');
              mainContent.appendChild(p);
            } else {
              var p = document.createElement("p");
              p.className = "about-text mb-2";
              p.textContent = txt;
              mainContent.appendChild(p);
            }
          });
          // Add retractable popups for core beliefs references
          if (newlife.core_beliefs_reference && Array.isArray(newlife.core_beliefs_reference)) {
            newlife.core_beliefs_reference.forEach(function(refObj) {
              var quoteDiv = document.createElement("div");
              quoteDiv.className = "bible-quote-retract";
              quoteDiv.setAttribute("data-ref", refObj.reference);
              quoteDiv.setAttribute("data-href", refObj.bible_url);
              
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
              iframe.src = refObj.bible_url;
              iframe.title = refObj.reference + " (Bible.com)";
              iframe.setAttribute("loading", "lazy");
              quoteDiv.appendChild(iframe);
              
              // Store the URL for easy reference
              quoteDiv.setAttribute('data-bible-url', refObj.bible_url);
              mainContent.appendChild(quoteDiv);
            });
          }
          
          // Initialize click handlers for core beliefs references
          setTimeout(function() {
            document.querySelectorAll('.core-beliefs-ref').forEach(function(link) {
              if (link.hasAttribute('data-initialized')) return;
              link.setAttribute('data-initialized', 'true');
              
              var reference = link.getAttribute('data-reference');
              var quoteDiv = document.querySelector('.bible-quote-retract[data-ref="' + reference + '"]');
              
              if (quoteDiv) {
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
                  
                  return false;
                };
              }
            });
          }, 100);
          
          // Render spiritualNewlife sub-section if present
          if (newlife.spiritualNewlife && Array.isArray(newlife.spiritualNewlife.text)) {
            var swSection = document.createElement("section");
            swSection.className = "mt-4 mb-4 p-3 rounded bg-light border spiritual-newlife-section";
            swSection.id = "spiritual-newlife-section";
            var swTitle = document.createElement("h4");
            swTitle.className = "royal mb-2";
            swTitle.textContent = "Spiritual New Life";
            swSection.appendChild(swTitle);
            // Render each text line, and if it's the 'key scriptures' line, insert the bible references right after
            (newlife.spiritualNewlife.text || []).forEach(function (txt) {
              var p = document.createElement("p");
              p.className = "about-text mb-2";
              
              // Process spiritual newlife text references
              var processedText = txt;
              if (newlife.spiritualNewlife.spiritual_newlife_text_reference && Array.isArray(newlife.spiritualNewlife.spiritual_newlife_text_reference)) {
                newlife.spiritualNewlife.spiritual_newlife_text_reference.forEach(function(refObj) {
                  var refPattern = new RegExp('\\(' + refObj.reference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g');
                  processedText = processedText.replace(refPattern, function(match) {
                    return '<a href="javascript:void(0);" class="bible-reference-link spiritual-newlife-ref" data-bible-url="' + refObj.bible_url + '" data-reference="' + refObj.reference + '" style="color: #0288d1; text-decoration: none;">' + match + '</a>';
                  });
                });
              }
              
              p.innerHTML = processedText;
              swSection.appendChild(p);
              if (txt.toLowerCase().includes("key scriptures") && Array.isArray(newlife.spiritualNewlife.bibleReferences) && newlife.spiritualNewlife.bibleReferences.length > 0 && typeof newlife.spiritualNewlife.bibleReferences[0] === "object") {
                var refsDiv = document.createElement("div");
                refsDiv.className = "mb-3";
                refsDiv.style.textAlign = "center";
                refsDiv.style.marginTop = "-0.5rem";
                refsDiv.style.marginBottom = "1.5rem";
                newlife.spiritualNewlife.bibleReferences.forEach(function (refObj, i) {
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
                  a.setAttribute('data-ref-type', 'newlife-bible-ref');
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
                    // Close any other open quotes and mentor popups
                    document.querySelectorAll('.bible-quote-retract.active').forEach(function(openQuote) {
                      openQuote.classList.remove('active');
                    });
                    document.querySelectorAll('.mentor-popup-retract.active').forEach(function(openPopup) {
                      openPopup.classList.remove('active');
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
                  a.setAttribute('data-bible-newlife-ref', 'true');
                  if (i < newlife.spiritualNewlife.bibleReferences.length - 1) {
                    refsDiv.appendChild(document.createTextNode(" | "));
                  }
                });
                swSection.appendChild(refsDiv);
              }
            });
            mainContent.appendChild(swSection);
            
            // Add retractable popups for spiritual newlife text references
            if (newlife.spiritualNewlife.spiritual_newlife_text_reference && Array.isArray(newlife.spiritualNewlife.spiritual_newlife_text_reference)) {
              newlife.spiritualNewlife.spiritual_newlife_text_reference.forEach(function(refObj) {
                var quoteDiv = document.createElement("div");
                quoteDiv.className = "bible-quote-retract";
                quoteDiv.setAttribute("data-ref", refObj.reference);
                quoteDiv.setAttribute("data-href", refObj.bible_url);
                
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
                iframe.src = refObj.bible_url;
                iframe.title = refObj.reference + " (Bible.com)";
                iframe.setAttribute("loading", "lazy");
                quoteDiv.appendChild(iframe);
                
                // Store the URL for easy reference
                quoteDiv.setAttribute('data-bible-url', refObj.bible_url);
                mainContent.appendChild(quoteDiv);
              });
            }
          }
          
          // Initialize click handlers for spiritual newlife text references
          setTimeout(function() {
            document.querySelectorAll('.spiritual-newlife-ref').forEach(function(link) {
              if (link.hasAttribute('data-initialized')) return;
              link.setAttribute('data-initialized', 'true');
              
              var reference = link.getAttribute('data-reference');
              var quoteDiv = document.querySelector('.bible-quote-retract[data-ref="' + reference + '"]');
              
              if (quoteDiv) {
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
                  
                  return false;
                };
              }
            });
          }, 150);
          
          // ...existing code...
        }
        // Children sections
        var childrenContent = document.getElementById("newlife-children");
        if (childrenContent && Array.isArray(newlife.children)) {
          childrenContent.innerHTML = "";
          newlife.children.forEach(function (child) {
            var div = document.createElement("div");
            div.className = "mb-4 pb-2 border-bottom";
            var h4 = document.createElement("h4");
            h4.className = "royal mb-2";
            h4.textContent = child.title;
            div.appendChild(h4);
            
            // Handle Five Finger Prayer specially as a simple numbered list
            if (child.id === "five-finger-prayer" && child.fiveFingerPrayer && Array.isArray(child.fiveFingerPrayer)) {
              // Add introductory text
              (child.text || []).forEach(function (txt) {
                var p = document.createElement("p");
                p.className = "about-text mb-3";
                p.textContent = txt;
                div.appendChild(p);
              });
              
              // Create simple numbered list
              var ol = document.createElement("ol");
              ol.className = "five-finger-prayer-list";
              ol.style.paddingLeft = "1.5rem";
              ol.style.marginBottom = "1rem";
              
              child.fiveFingerPrayer.forEach(function(fingerData, index) {
                var li = document.createElement("li");
                li.className = "mb-2";
                li.style.marginBottom = "0.75rem";
                
                // Define icons for each finger
                var fingerIcons = {
                  'Thumb': 'bi-hand-thumbs-up',
                  'Index Finger': 'bi-arrow-up-circle',
                  'Middle Finger': 'bi-shield-check',
                  'Ring Finger': 'bi-heart',
                  'Little Finger': 'bi-person'
                };
                
                var iconClass = fingerIcons[fingerData.finger] || 'bi-circle';
                
                var content = document.createElement("div");
                content.innerHTML = 
                  '<i class="' + iconClass + '" style="color: #0288d1; margin-right: 8px; font-size: 1.1rem;"></i>' +
                  '<span><strong>' + fingerData.finger + ' (' + fingerData.meaning + '):</strong> ' +
                  'Pray for ' + fingerData.prayFor.join(', ').toLowerCase() + '. ' +
                  fingerData.prayerFocus + '</span>';
                
                li.appendChild(content);
                ol.appendChild(li);
              });
              
              div.appendChild(ol);
            } else {
              // Regular text rendering for other sections
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
            }
            
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
  // First, specifically handle Spiritual New Life Bible references
  const spiritualNewlifeSection = document.querySelector('.spiritual-newlife-section');
  if (spiritualNewlifeSection) {
    const newlifeLinks = spiritualNewlifeSection.querySelectorAll('a[href]');
    newlifeLinks.forEach(function(link) {
      const href = link.getAttribute('href') || link.href;
      if (isBibleComLink(href)) {
        // Remove target="_blank" to prevent opening in a new tab
        link.removeAttribute('target');
        
        // Make sure the retractable quotes work properly
        const quoteDiv = Array.from(spiritualNewlifeSection.querySelectorAll('.bible-quote-retract')).find(
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
      
      // Skip contact Bible verse link - it has its own handler
      const parentWrapper = link.closest('.contact-bible-verse-wrapper');
      if (parentWrapper) {
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
      
      // Add "Back to Page" link
      const backToPageLink = document.createElement('a');
      backToPageLink.href = '#';
      backToPageLink.className = 'bible-back-to-page';
      backToPageLink.innerHTML = '← Back to Page';
      backToPageLink.title = 'Close Bible reference and return to page';
      backToPageLink.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        quoteContainer.classList.remove('active');
      };
      quoteContainer.appendChild(backToPageLink);
      
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
// Function to specifically handle the Spiritual Newlife Bible references
function fixNewlifeReferences() {
  // Target the specific section
  const newlifeSection = document.querySelector('#spiritual-newlife-section');
  if (!newlifeSection) return;
  
  // Find all Bible references (including those with javascript:void(0) as href)
  const bibleLinks = newlifeSection.querySelectorAll('a[data-ref-type="newlife-bible-ref"]');
  
  bibleLinks.forEach(function(link) {
    // Remove any default browser behaviors that might cause navigation
    link.removeAttribute('target');
    
    // Get the corresponding quote div
    const ref = link.textContent;
    const href = link.getAttribute('data-bible-url') || link.getAttribute('href');
    const quoteDiv = Array.from(newlifeSection.querySelectorAll('.bible-quote-retract')).find(
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
  setTimeout(fixNewlifeReferences, 1000);
  setTimeout(fixNewlifeReferences, 2000);
});

// Also add a mutation observer specifically for the Spiritual Newlife section
document.addEventListener("DOMContentLoaded", function() {
  const observer = new MutationObserver(function(mutations) {
    if (document.querySelector('#spiritual-newlife-section')) {
      fixNewlifeReferences();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
// Add a global click event handler to catch any Bible references that still might open in a new tab
document.addEventListener('click', function(e) {
  // Check if we're inside the spiritual newlife section
  const newlifeSection = document.getElementById('spiritual-newlife-section');
  if (!newlifeSection) return;
  
  // Check if the click is inside this section
  if (!newlifeSection.contains(e.target)) return;
  
  // Check if we clicked on a link or inside one
  let link = e.target;
  while (link && link.tagName !== 'A' && link !== newlifeSection) {
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
      const quoteDiv = Array.from(newlifeSection.querySelectorAll('.bible-quote-retract')).find(
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

// Global cleanup function for mentor popups
function closeMentorPopups() {
  document.querySelectorAll('.mentor-popup-retract.active').forEach(function(popup) {
    popup.classList.remove('active');
  });
}

// Global cleanup function for all popups
function closeAllPopups() {
  document.querySelectorAll('.mentor-popup-retract.active').forEach(function(popup) {
    popup.classList.remove('active');
  });
  document.querySelectorAll('.bible-quote-retract.active').forEach(function(quote) {
    quote.classList.remove('active');
  });
}

// Add global event listener for Escape key to close all popups
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAllPopups();
  }
});

// Ensure popups don't interfere with other site functionality
document.addEventListener('DOMContentLoaded', function() {
  // Close all popups when navigating to other sections
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function() {
      setTimeout(closeAllPopups, 100);
    });
  });
});
