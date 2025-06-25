const allText = [...document.querySelectorAll('*')]
  .map(el => el.textContent.trim())
  .filter(Boolean)
  .join('\n');

alert(allText);


