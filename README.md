# Nightfall — Dark Mode Toggle for Chrome

A clean, per-site dark mode toggle for Chrome. Click the toolbar icon, flip the switch, and the current tab inverts to dark — no accounts, no configuration, no data collection.

![Nightfall popup preview](icons/icon128.png)

## Features

- **Per-site memory** — turn dark mode on for the sites you read at night, leave the rest untouched. Each site remembers its own setting.
- **Zero setup** — no options page, no sign-in. Install and click.
- **Zero data collection** — preferences are stored locally via Chrome's `storage.sync` API. Nothing is sent to any server, because there is no server.
- **Lightweight** — a single small content script, no persistent background process.

## Install (load unpacked, for now)

1. Clone or [download this repo as a ZIP](../../archive/refs/heads/main.zip) and unzip it.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select this folder.
5. Pin the Nightfall icon to your toolbar.

*A Chrome Web Store listing is in progress — this section will be updated with a direct install link once it's live.*

## How it works

`content.js` injects a CSS filter (`invert(1) hue-rotate(180deg)`) into the page, then re-inverts images, video, and canvas elements so photos don't render as negatives. Per-site on/off state is saved as `{ hostname: boolean }` in `chrome.storage.sync`, and a `storage.onChanged` listener re-applies the filter instantly if you toggle it while the page is already open.

## Known limitations

- The invert-filter approach is a universal trick, not a true native dark theme — sites with heavy `background-image` CSS, or sites that already ship their own dark mode, may look slightly off.
- No custom toolbar icon set beyond the bundled one yet — contributions welcome.

## Contributing

Found a site that looks wrong in dark mode, or have a feature idea? [Open an issue](../../issues). Pull requests welcome.

## License

MIT — see [LICENSE](LICENSE).

