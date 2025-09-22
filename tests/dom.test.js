import { setupButton } from '../src';

beforeEach(() => {
  document.body.innerHTML = `
      <div id="test-title" class="test_title"></div>
      <button id="test-button">Test Button</button>
  `;
});

test('button click changes title', () => {
  setupButton();

  const btn = document.getElementById('test-button');
  const msg = document.getElementById('test-title');

  btn.click();
  expect(msg.textContent).toBe('Clicked');
});
