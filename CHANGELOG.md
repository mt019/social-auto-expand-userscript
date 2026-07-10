# Changelog

## 1.2.0 - 2026-07-11

- Add bounded background preloading for additional LinkedIn feed items.
- Restore the previous viewport position after triggering LinkedIn infinite-scroll loading.
- Pause preloading during recent user activity and modal/dialog states.

## 1.1.0 - 2026-07-11

- Prefer language-independent LinkedIn expander selectors and `aria-expanded="false"` checks.
- Keep text matching only as a fallback for visible expand labels.
- Support collapsed LinkedIn text controls across UI languages when LinkedIn uses its standard expand components.

## 1.0.1 - 2026-07-11

- Match LinkedIn Traditional Chinese post expand controls such as `⋯⋯展開`.
- Stop matching generic `More` / `更多` controls that can open footer or navigation menus.
- Limit automatic clicks to LinkedIn content areas such as posts, comments, profile sections, and job descriptions.

## 1.0.0 - 2026-07-11

- Initial release.
- Automatically expands common LinkedIn collapsed text controls.
- Supports English, Simplified Chinese, and Traditional Chinese expand labels.
- Uses MutationObserver plus interval rescans for LinkedIn's dynamic navigation.
