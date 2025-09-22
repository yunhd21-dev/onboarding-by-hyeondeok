import './style.css';

export function setupButton() {
  const btn = document.getElementById('test-button');
  const msg = document.getElementById('test-title');

  if (btn && msg) {
    btn.addEventListener('click', () => {
      msg.textContent = 'Clicked';
    });
  }
}

(function () {
  setupButton();
})();
