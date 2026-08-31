# Thai Herbal NHSO Support App

```
██╗  ██╗███████╗██████╗ ██████╗  ██████╗ █████╗ ██████╗ ██████╗
██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗
███████║█████╗  ██████╔╝██████╔╝███████╗███████║██████╔╝██████╔╝
██║  ██║██╔══╝  ██╔══██╗██╔══██╗╚════██║██╔══██║██╔═══╝ ██╔═══╝
██║  ██║███████╗██║  ██║██████╔╝██████╔╝██║  ██║██║     ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝╚═════╝╚═╝  ╚═╝╚═╝╚═╝
```

---

## ◆ PULSE

A herbal formulary is only as useful as the pharmacist's ability to
reach it. This is the digital formulary for NHSO-supported Thai herbal
medicines, built for Sabot Hospital and beyond: instant search across
herb name, description, and category; card-based detail pages; PWA
offline capability; and a Google Sheets backend the pharmacy can edit
without touching a line of code. The data lives where the department
already keeps it - the app just makes it reachable.

| Search ▣ | Offline PWA ▣ | Sheets CMS ▣ | Typed ▣ |
| -------- | ------------- | ------------ | ------- |

_v1.0.18 - the formulary loop - fetch, search, install, consult - is
sealed._

> Built with Vue 3 + TypeScript + Vite, styled by Tailwind 4, fed by
> Google Sheets through Apps Script - the spreadsheet is the CMS.
>
> **suradet-ps**, artifact keeper

---

## ◆ IGNITION

One runtime, three commands.

```
⟫ git clone https://github.com/pharmacist-sabot/herbs-app.git
⟫ cd herbs-app
⟫ bun install
⟫ bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

<details>
<summary>Environment</summary>

A `.env` file with the Apps Script endpoint:

```
VITE_GOOGLE_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Requires Bun v1.0+ (or Node 18+) and a Google Apps Script deployment
URL for the API.

</details>

The release artifact: `⟫ bun run build` - `dist/` deploys to any
static host. Try it live at [herbs-app.rxdevman.com](https://herbs-app.rxdevman.com).

---

## ◆ ANATOMY

One sheet, one service, a card-based door to the formulary.

- **Fetches** - `herbsService.ts` pulls the herb data from Google
  Sheets through Apps Script - the pharmacy edits a spreadsheet, and
  the app follows.
- **Searches** - real-time filtering across herb name, description,
  and category - the formulary answers as the query lands.
- **Renders** - a clean card-based interface that adapts to any
  screen - from the ward desktop to the phone on rounds.
- **Installs** - the Vite PWA plugin makes the app installable and
  offline-capable - the formulary rides in the pocket and works
  without a signal.
- **Types** - TypeScript types the API response end to end, and the
  Vitest suite guards the components - the data cannot drift without
  a test complaining.

---

## ◆ RITUALS

**The core ceremony** - the herb consult:

1. Open the app - installed on the phone, or one tab away.
2. Type the herb's name - or its description, or its category. The
   list filters as you type.
3. Open the card: the NHSO-covered details, rendered from the typed
   model.
4. Consult and close. Offline or online, the formulary answers the
   same.

**The ceremony of the sheet** - the CMS is a spreadsheet: the
pharmacist updates data without a deploy, without a PR, without
touching code. The formulary's source of truth stays where the
department already keeps it.

**The ceremony of the offline page** - the network dies in the ward
and the formulary does not notice: the herbs were cached when the
phone was online, and the consult proceeds.

---

## ◆ ECHOES

**Where this artifact is heading**

```
fetch    ▸ Google Sheets via Apps Script ────────────────────────────── ▸ sealed
search   ▸ name, description, category filtering ────────────────────── ▸ sealed
install  ▸ PWA offline capability ───────────────────────────────────── ▸ sealed
guard    ▸ typed API + Vitest suite ─────────────────────────────────── ▸ sealed
```

**Raising the artifact** - the API service lives in
`src/services/herbsService.ts`; the types in `src/types/`; the routes
in `src/router/`. Gates: `bun run lint`, `bun run type-check`,
`bun run test:unit`. Open an issue first to discuss a change.

**Status** - CI quality gates every push, and releases are tagged
automatically. [Watch the gates](.github/workflows).

---

```
  ─────────────────────────────────────────
   A formulary in a spreadsheet is a formulary
   that only the spreadsheet can find.
  ─────────────────────────────────────────
```

Open source under the [MIT License](LICENSE).
