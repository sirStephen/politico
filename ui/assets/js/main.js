const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const cross = document.querySelector('.cross');

// Create function for on menu hover

menu.addEventListener('click', () => {
  overlay.animate([
    { transform: 'translatex(0%)' },
    { transform: 'translatex(100%)' },
  ]);

  if (overlay.style.display === 'block') {
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'block';
  }
});

cross.addEventListener('click', () => {
  overlay.style.display = 'none';
});
