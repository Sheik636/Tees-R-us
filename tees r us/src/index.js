 function startSite() {
      const overlay = document.getElementById('intro-overlay');
      overlay.classList.add('fade-out');
      
      setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.body.style.overflow = 'auto';
      }, 1000); // match the transition duration
    }