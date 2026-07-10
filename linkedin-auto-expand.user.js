// ==UserScript==
// @name         LinkedIn Auto Expand
// @namespace    https://github.com/mt019/linkedin-auto-expand-userscript
// @version      1.0.0
// @description  Automatically expands LinkedIn posts, comments, profiles, job descriptions, and other collapsed text.
// @author       mt019
// @license      MIT
// @match        https://www.linkedin.com/*
// @match        https://linkedin.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const EXPAND_TEXT_PATTERNS = [
    /^see more$/i,
    /^show more$/i,
    /^more$/i,
    /^read more$/i,
    /^view more$/i,
    /^load more$/i,
    /^show all$/i,
    /^show translation$/i,
    /^顯示更多$/,
    /^查看更多$/,
    /^展开全文$/,
    /^展開全文$/,
    /^更多$/,
    /^显示更多$/,
    /^顯示全部$/,
    /^显示全部$/,
    /^閱讀更多$/,
    /^阅读更多$/,
  ];

  const COLLAPSE_TEXT_PATTERNS = [
    /^see less$/i,
    /^show less$/i,
    /^less$/i,
    /^顯示較少$/,
    /^显示较少$/,
    /^收起$/,
  ];

  const CLICKABLE_SELECTOR = [
    "button",
    "a",
    '[role="button"]',
    ".feed-shared-inline-show-more-text__see-more-less-toggle",
    ".inline-show-more-text__button",
    ".lt-line-clamp__more",
    ".comments-comment-item__inline-show-more-text",
  ].join(",");

  const CLICKED_MARK = "data-linkedin-auto-expand-clicked";
  const SCAN_INTERVAL_MS = 1200;
  const MUTATION_DEBOUNCE_MS = 250;
  const MAX_TEXT_LENGTH = 80;

  let scanTimer = null;
  let observerTimer = null;

  function normalizeText(text) {
    return text
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function isVisible(element) {
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function looksLikeExpander(element) {
    const text = normalizeText(element.innerText || element.textContent || element.getAttribute("aria-label") || "");
    const ariaLabel = normalizeText(element.getAttribute("aria-label") || "");
    const title = normalizeText(element.getAttribute("title") || "");
    const combined = [text, ariaLabel, title].filter(Boolean);

    if (combined.some((value) => value.length > MAX_TEXT_LENGTH)) {
      return false;
    }

    if (combined.some((value) => COLLAPSE_TEXT_PATTERNS.some((pattern) => pattern.test(value)))) {
      return false;
    }

    return combined.some((value) => EXPAND_TEXT_PATTERNS.some((pattern) => pattern.test(value)));
  }

  function clickExpander(element) {
    if (element.hasAttribute(CLICKED_MARK) || !isVisible(element) || !looksLikeExpander(element)) {
      return false;
    }

    element.setAttribute(CLICKED_MARK, "true");
    element.click();
    return true;
  }

  function scan(root = document) {
    const candidates = root.querySelectorAll(CLICKABLE_SELECTOR);

    for (const candidate of candidates) {
      clickExpander(candidate);
    }
  }

  function scheduleScan() {
    window.clearTimeout(observerTimer);
    observerTimer = window.setTimeout(() => scan(), MUTATION_DEBOUNCE_MS);
  }

  function start() {
    scan();
    scanTimer = window.setInterval(scan, SCAN_INTERVAL_MS);

    const observer = new MutationObserver(scheduleScan);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("beforeunload", () => {
      window.clearInterval(scanTimer);
      observer.disconnect();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
