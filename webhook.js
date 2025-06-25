(() => {
  const data = {};

  // Collect links, forms, scripts
  data.links = [...document.querySelectorAll('a, link')].map(el => el.href);
  data.forms = [...document.forms].map(form => ({
    action: form.action,
    method: form.method,
    inputs: [...form.elements].map(e => ({
      name: e.name,
      value: e.value,
      type: e.type
    }))
  }));
  data.scripts = [...document.scripts].map(s => s.src || s.innerText.slice(0, 100));

  // Stylesheets
  data.stylesheets = [...document.styleSheets].map(sheet => sheet.href).filter(Boolean);

  // Iframes
  data.iframes = [...document.querySelectorAll('iframe')].map(f => f.src);

  // Hidden inputs
  data.hiddenInputs = [...document.querySelectorAll('input[type="hidden"]')].map(input => ({
    name: input.name,
    value: input.value
  }));

  // Global variables (only top-level keys, filtered to avoid noise)
  const interestingGlobals = ['flag', 'FLAG', 'secret', 'token'];
  data.globals = {};
  interestingGlobals.forEach(key => {
    if (typeof window[key] !== "undefined") {
      data.globals[key] = window[key];
    }
  });

  // Other page data
  data.url = location.href;
  data.title = document.title;
  data.cookies = document.cookie;
  data.innerText = document.body.innerText.slice(0, 2000);

  // Alert (truncated if too large)
  alert(JSON.stringify(data, null, 2).slice(0, 3000));
})();
