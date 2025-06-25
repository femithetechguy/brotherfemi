// Blog popup close button and Escape key support
window.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('popup') === '1') {
    // Add close button
    const btn = document.createElement('button');
    btn.className = 'popup-close-btn';
    btn.title = 'Close (Esc)';
    btn.innerHTML = '&times;';
    btn.onclick = function() {
      if (window.innerWidth <= 600 && document.referrer) {
        window.location.href = document.referrer;
      } else {
        window.close();
      }
    };
    document.body.appendChild(btn);
    // Support Esc key
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (window.innerWidth <= 600 && document.referrer) {
          window.location.href = document.referrer;
        } else {
          window.close();
        }
      }
    });
  }
});
