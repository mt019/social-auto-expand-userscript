# LinkedIn Auto Expand Userscript

A Tampermonkey-compatible userscript that automatically expands collapsed LinkedIn text and preloads additional feed items across UI languages.

It clicks visible expand controls such as:

- See more
- Show more
- Read more
- 展开全文 / 展開全文
- 查看更多 / 顯示更多

The script is intentionally conservative: it prefers LinkedIn's own collapsed text controls and only falls back to short, visible expand labels. It avoids collapse actions such as "see less".

It also preloads additional feed items in the background by briefly triggering LinkedIn's infinite-scroll loading point and restoring the original viewport position.

## Install

1. Install a userscript manager such as Tampermonkey or Violentmonkey.
2. Open the raw userscript file:
   `https://github.com/mt019/linkedin-auto-expand-userscript/releases/latest/download/linkedin-auto-expand.user.js`
3. Confirm installation in the userscript manager.
4. Open or refresh LinkedIn.

## Supported Pages

The script runs on:

- `https://www.linkedin.com/*`
- `https://linkedin.com/*`

It is designed for feeds, comments, profiles, articles, company pages, and job pages across LinkedIn UI languages.

## Notes

LinkedIn changes its DOM often. This script avoids relying on button language and combines LinkedIn expand component selectors, `aria-expanded="false"`, content-area checks, and visible fallback labels.

Background preloading is intentionally bounded. It pauses during recent user activity, skips modal/dialog states, and stops after a limited number of stable-height checks.

## Development

Run the metadata check:

```sh
npm test
```

## Release

Releases attach `linkedin-auto-expand.user.js` so userscript managers can install the latest version directly.

## License

MIT
