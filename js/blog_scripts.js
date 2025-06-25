// Simulate a persistent like count (would be replaced by backend in production)
let blogLikeCount = Number(localStorage.getItem("blogLikeCount") || 0);
let blogLikeClicked = localStorage.getItem("blogLikeClicked") === "true";

// Blog popup close button and Escape key support
window.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get("popup") === "1") {
    // Add close button
    const btn = document.createElement("button");
    btn.className = "popup-close-btn";
    btn.title = "Close (Esc)";
    btn.innerHTML = "&times;";
    btn.onclick = function () {
      if (window.innerWidth <= 600 && document.referrer) {
        window.location.href = document.referrer;
      } else {
        window.close();
      }
    };
    document.body.appendChild(btn);
    // Support Esc key
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (window.innerWidth <= 600 && document.referrer) {
          window.location.href = document.referrer;
        } else {
          window.close();
        }
      }
    });
  }
  // Like button dynamic count
  var likeBtn = document.querySelector(".blog-like-btn");
  var likeCount = document.querySelector(".blog-like-count");
  if (likeBtn && likeCount) {
    likeCount.textContent = blogLikeCount;
    if (blogLikeClicked) {
      likeBtn.classList.add("liked", "locked");
    }
    likeBtn.addEventListener("click", function () {
      if (!blogLikeClicked) {
        blogLikeCount++;
        likeCount.textContent = blogLikeCount;
        likeBtn.classList.add("liked", "locked");
        blogLikeClicked = true;
        localStorage.setItem("blogLikeCount", blogLikeCount);
        localStorage.setItem("blogLikeClicked", "true");
      }
    });
  }
  // Share button: copy link to clipboard or use native share on mobile
  var shareBtn = document.querySelector(".blog-share-btn");
  if (shareBtn) {
    // Create toast message element
    var shareToast = document.createElement("div");
    shareToast.className = "blog-share-toast";
    shareToast.textContent = "Link copied!";
    shareBtn.parentNode.insertBefore(shareToast, shareBtn.nextSibling);
    function showShareToast() {
      shareToast.classList.add("show");
      setTimeout(function () {
        shareToast.classList.remove("show");
      }, 1500);
    }
    shareBtn.addEventListener("click", function () {
      const url = window.location.href.split("?")[0];
      if (navigator.share && window.innerWidth <= 600) {
        // Use native share on mobile
        navigator
          .share({
            title: document.title,
            text: "Check out this blog post!",
            url: url,
          })
          .catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          shareBtn.classList.add("shared");
          shareBtn.title = "Link copied!";
          showShareToast();
          setTimeout(function () {
            shareBtn.classList.remove("shared");
            shareBtn.title = "Share";
          }, 1500);
        });
      } else {
        // fallback for older browsers
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        shareBtn.classList.add("shared");
        shareBtn.title = "Link copied!";
        showShareToast();
        setTimeout(function () {
          shareBtn.classList.remove("shared");
          shareBtn.title = "Share";
        }, 1500);
      }
    });
  }
});
