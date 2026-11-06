// Konto-Menü oben rechts (Startseite und /start): Klick auf den Namen öffnet ein Menü mit Projekten und Abmelden.
// Aufruf: kontoMenue(ziel, ich, { aktiv: "start" | "" }) – ich = Antwort von /api/ich
(function () {
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const svg = (d) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  const IC = {
    runter: "m6 9 6 6 6-6",
    ordner: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    plus: "M12 5v14M5 12h14",
    welt: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
    buch: "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM8 7h6",
    raus: "M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10",
  };
  const ROLLE = { admin: "Admin", dozent: "Dozent", teilnehmer: "Teilnehmer", gast: "Gast" };

  window.kontoMenue = function (ziel, ich, opt = {}) {
    const name = ich.email.split("@")[0];
    const initiale = (name[0] || "?").toUpperCase();
    const aktiv = (ich.projekte || []).filter((p) => !p.archiviert).length;
    const darfNeu = ich.maxProjekte == null || ich.aktiv < ich.maxProjekte || ich.team;
    ziel.innerHTML = `<div class="konto">
      <button type="button" class="konto-knopf" aria-haspopup="menu" aria-expanded="false" aria-label="Konto-Menü öffnen">
        <span class="avatar">${esc(initiale)}</span><span class="konto-name">${esc(name)}</span>${svg(IC.runter)}
      </button>
      <div class="konto-menue" role="menu" hidden>
        <div class="konto-kopf"><span class="avatar gross">${esc(initiale)}</span><div><b>${esc(ich.email)}</b><span>${esc(ROLLE[ich.rolle] || "")} · ${aktiv} ${aktiv === 1 ? "Projekt" : "Projekte"}</span></div></div>
        <a role="menuitem" href="/start"${opt.aktiv === "start" ? ' aria-current="page"' : ""}>${svg(IC.ordner)} Meine Projekte</a>
        ${darfNeu ? `<a role="menuitem" href="/start#neu" data-neu>${svg(IC.plus)} Neues Projekt</a>` : ""}
        <a role="menuitem" href="/#projekte">${svg(IC.welt)} Alle Projekte</a>
        <a role="menuitem" href="/anleitung/">${svg(IC.buch)} Anleitung</a>
        <hr>
        <button type="button" role="menuitem" class="konto-raus">${svg(IC.raus)} Abmelden</button>
      </div></div>`;
    const knopf = ziel.querySelector(".konto-knopf"), menue = ziel.querySelector(".konto-menue");
    const auf = (an) => {
      menue.hidden = !an; knopf.setAttribute("aria-expanded", String(an));
      if (an) menue.querySelector("[role=menuitem]").focus();
    };
    knopf.onclick = (e) => { e.stopPropagation(); auf(menue.hidden); };
    document.addEventListener("click", (e) => { if (!menue.hidden && !ziel.contains(e.target)) auf(false); });
    ziel.addEventListener("keydown", (e) => {
      const punkte = [...menue.querySelectorAll("[role=menuitem]")], i = punkte.indexOf(document.activeElement);
      if (e.key === "Escape") { auf(false); knopf.focus(); }
      else if (!menue.hidden && (e.key === "ArrowDown" || e.key === "ArrowUp")) { e.preventDefault(); punkte[(i + (e.key === "ArrowDown" ? 1 : -1) + punkte.length) % punkte.length].focus(); }
    });
    const neu = menue.querySelector("[data-neu]");
    if (neu && opt.neu) neu.onclick = (e) => { e.preventDefault(); auf(false); opt.neu(); };
    menue.querySelector(".konto-raus").onclick = async () => {
      await fetch("/api/abmelden", { method: "POST" }).catch(() => {});
      location.href = "/";
    };
  };
})();
