/**
 *  @module returnToLink
 *
 *  Quick minimal module to create a link back to a previous pages.
 *  setContext:         Marks this page in sessionStorage to be recalled later
 *  createContextLink:  Visit the last page marked
 */

 /**
  * @private storeContext
  *
  * Store the context path / name into sessionStorage
  */
function storeContext(path, name) {
  sessionStorage.setItem('goBackTo-path', path);
  sessionStorage.setItem('goBackTo-name', name);
}

/**
 *  @function createContextLink
 *
 * @param {selector}  Where to place the generated markup.
 * @param {string}    A string to use for the link text.
 *                    Use *name* to display the stored page name.
 */
export function createContextLink(locationSelector, linkText = "Back to *name*") {

  const url = sessionStorage.getItem('goBackTo-path');
  const name = sessionStorage.getItem('goBackTo-name');

  if (url && name) {
    const textToDisplay = linkText.replace('*name*', name);

    const domNode = document.querySelector(locationSelector);
    domNode.innerHTML = `<a href="${url}" class="content-return-link">${textToDisplay}</a>`;
  }
}

/**
 * @function setContext
 *
 * @param {string} The name to store with this link, displayed in place of "*name*"
 */
export function setContext(pageName) {

  storeContext(window.location.pathname, pageName)

}
