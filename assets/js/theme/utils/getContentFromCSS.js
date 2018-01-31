/**
 *  Extract a pseudo element's content, useful for responsive testing.
 *
 *  @param selector      string
 *    The selector who's pseudo element to extract the content from.
 *
 *  @param pseudoElement   string (default: ':after')
 *    Can also be set to ':before'
 */

import $ from 'jquery';

export default function getContentFromCSS(selector, pseudoElement = ':after') {
  const el = $(selector).get(0);
  if (el) {
    const content = window.getComputedStyle(el, pseudoElement).content;
    return content.replace(/['"]+/g, '');
  }
}
