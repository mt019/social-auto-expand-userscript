# LinkedIn Auto Expand Userscript

A Tampermonkey-compatible userscript that automatically expands collapsed LinkedIn text.

It clicks visible expand controls such as:

- See more
- Show more
- Read more
- 展开全文 / 展開全文
- 查看更多 / 顯示更多

The script is intentionally conservative: it only clicks short, visible controls whose text or accessibility label looks like an expand action, and it avoids collapse actions such as "see less".

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

It is designed for feeds, comments, profiles, articles, company pages, and job pages.

## Notes

LinkedIn changes its DOM often. This script avoids relying on one LinkedIn class name and instead combines several known selectors with visible button text checks.

## Development

Run the metadata check:

```sh
npm test
```

## Release

Releases attach `linkedin-auto-expand.user.js` so userscript managers can install the latest version directly.

## License

MIT
