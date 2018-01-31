# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.11.1] - 2017-09-13

#### Added
- Now you see them, those images you keep putting in your footer. Be glad LEGO's can't go in there, ouch! (fixes THEME-1410)

#### Changed
- Only one banner served up at a time now, it allows you to savor it slowly and really hear it's message

## [1.11.0] - 2017-08-24

#### Added
- Users now have an option for different aspect ratios in their carousel including a setting that will allow their images to maintain their original aspect ratio

#### Fixed
- Product sold out button re-added to product form
- Breadcrumb return to link now recognizes page titles so if a product is visited from a content page the breadcrumb points back to the page the user came from instead of the last visited catalog page

##[1.10.12] - 2017-08-03

#### Fixed
- Product Utils now handles product weight correctly so it doesn't error when no weight is present
- Changed search input color to text color so it is visible on all presets (fixes THEME-1393)

##[1.10.11] - 2017-07-27

#### Fixed
- Latest blog layout corrected for proper display at all display values (fixes THEME-1386)

##[1.10.10] - 2017-07-20

#### Fixed
- All shipping carrier methods now display on cart page (fixes THEME-1368)

#### Added
- Added theme setting to allow users to chose weather product images cover the space on the product grid, or are contained by it

##[1.10.9] - 2017-07-06

#### Fixed
- Removed extraneous image title tags causing SEO warnings (fixes THEME-1345)
- Corrected image logic for cart page to not include lazy load to avoid breaking when cart qty changed

##[1.10.8] - 2017-06-29

#### Fixed
- Compare page now displays products, the refactored to use bc-compare module (fixes THEME-1312)
- Date field year in product date range now shows if date range is within one year (fixes THEME-1331)
- Add logic to keep blog navigation item open when a blog post is being viewed (fixes THEME-1314)
- No image image when ratio set to any now displays

#### Changed
- Wording and styles for bulk discount pricing on product page
- Updated support links in config file to new support document location
- Increase size of quick search image to avoid fuzzy images

##[1.10.7] - 2017-06-19

#### Fixed
- Compare page now displays products, refactored to use bc-compare module (fixes THEME-1312)
- Fixed an issue where product images weren't loading after clicking through to the next page when faceted search is enabled

##[1.10.6] - 2017-05-24

#### Changed
- Bump to prevent conflict with theme registry

##[1.10.5] - 2017-05-23

#### Changed
- Review form to use reCaptcha V2

#### Fixed
- Removed js that was causing product page to scroll to the top when an option without an image is selected (fixes THEME-1259)

#### Added
- Lazyload grid images, home carousel and home category CTA image

#### Changed
- Review form to use reCaptcha V2

##[1.10.4] - 2017-05-04

#### Added
- Unsubscribe page for unsubscribed users to land on (fixes THEME-1269)

#### Fixed
- None is not an option on required pick lists any more (fixes THEME-1279)
- None is not the default option when set in CP for non-required pick lists (fixes THEME-1267)
- Corrected reference to image alt product list items (fixes THEME-1274)
- Adjusted styles on product picklist to display more nicely
- Fixed pinterest button so it actually shares information now (fixes THEME-1291)

#### Changed
- Captcha to V2
- Update @bigcommerce/stencil-utils to allow for platforms new tracking features
- Changed header tags so there is only 1 h1 per page where possible to avoid site validation errors (fixes THEME-1292)

##[1.10.3] - 2017-03-23
#### Fixed
- Unavailable variants that are set to be hidden when out of stock now hide in drop downs (fixes THEME-1229)
- Add "Show More" button for product filters to show all filters (fixes THEME-1244)

##[1.10.2] - 2017-02-23
#### Changed
- Clicking product options with no image returns user to the products default image (fixes THEME-1206)

#### Fixed
- Corrected stuttered scroll on mobile (fixes THEME-1188)
- Cart level discounts are now visible on the product items on the cart page and in the mini cart (THEME-1217)
- Product based option rules to change product images now applies on mobile ( fixes THEME- 1172)
- Out of stock options are now hidden (fixes THEME-1215)

##[1.10.1] - 2017-02-10
#### Changed
- Improve readme file to include developer-friendly information
- Fix bug causing sub-categories to not open correctly

##[1.10.0] - 2017-02-07
#### Changed
- Improved captcha on contact page

##[1.2.1] - 2017-01-19
#### Fixed
 - improvements to the webpack build system so local development works on Windows systems

##[1.2.0] - 2017-01-12
#### Changed
 - migrated the theme's build system from JSPM/SystemJS to NPM/Webpack

##[1.1.3] - 2016-12-15
###Fixed
- Fixed a possible vulnerability in how search terms are rendered on the search page (fixes THEME-1173)

##[1.1.2] - 2016-11-24
### Added
- Apple pay icon available for display in footer

##[1.1.1] - 2016-11-17
### Added
- Lang attribute to <html> tag

##[1.1.0] - 2016-11-08

### Added
- Apple Pay support for checkout

### Fixed
- Fixed an issue where product customization checkboxes would cause an error when set to required (fixes THEME-1157)
- Improved layout of account orders lists on narrow screens

##[ 1.0.14 ] - 2016-09-22

### Fixed
- The brands menu in the footer correctly shows a couple of brand items again
- Ensure that when gift certificates are disabled that we don't see the options
  to use a gift certificate on the cart page (fixes THEME-1127)

### Added
- Brands listings now include pagination for when there are more results than
  the total number of items to display on one page.

##[ 1.0.13 ] - 2016-09-08

### Fixed
- Adjusted some of the js related to product tabs so that links within the
  content area would still function correctly (fixes THEME-1106)
- Fixed up some of the width issues related to carts on larger screens (fixes
  THEME-1107)
- Fixed reviews not being able to submit when throttler is enabled
  (fixes THEME-1103)
- Make sure that when there are more than just nine reviews that they all
  display correctly (along with a more link). Fixes THEME-1109

##[ 1.0.12 ] - 2016-08-25

### Added
- Add category descriptions to the header area of category pages.

##[ 1.0.11 ] - 2016-08-11

### Added

- Added "View All" links to lists in the sitemap if the list has more than 20
  items (fixes THEME_1092)
- Added nofollow attributes to faceted search links for better performance

### Fixed
- Fixed up an issue with the print style sheet that caused the logo to cover
  some of the content

##[ 1.0.10 ] - 2016-07-28

### Fixed
- Fixed an issue with the print stylesheets
- Fixed up issues where the videos wouldn't display on the product page

##[ 1.0.9 ] - 2016-07-21

### Added
- Added nofollow attribute to BigCommerce link in the footer

##[ 1.0.8 ] - 2016-06-23

### Added
- Added the option to display the year / copyright in the footer
- Added custom class names to all of the fields on the product details tab
- Added print styles to make sure printable pages look alright

##[ 1.0.7 ] - 2016-06-09

### Fixed
- Some minor display issues in the flickity slides displayed within quickshop:
  they no longer overlap and should load correctly from here on
- An issue where the newsletter block title would still display even if the
  newsletter form had been disabled (fixes BC-bug [Theme-1044])

##[ 1.0.6 ] - 2016-05-26

### Fixed
- Added swatch zoom on hover for desktop, hidden on mobile (fixes THEME-1029)

##[ 1.0.5 ] - 2016-05-24

### Added
- Added demo urls to the theme schame so that our theme includes the correct
  links back to demonstration stores

##[ 1.0.4 ] - 2016-05-19

### Fixed
- Made sure that when there is no button text (but a link is provided) for the
  carousel, that the whole slide will take you to the link
- Fixed a minor issue where you'd sometimes have two scroll bars on main
  content area (because of an overflow of the main navigation)

##[ 1.0.3 ] - 2016-05-18

### Fixed
- Made one little adjustment to the spacing of the text that appears in the
  carousel and featured image areas so that text doesn't end up displaced and
  cut off

##[ 1.0.2 ] - 2016-05-04

### Fixed
- Added jquery to the global window object to avoid issues that were cropping
  up with paypal/braintree integration on the checkout pages

##[ 1.0.1 ] - 2016-05-03

### Changed
- Changed the theme screenshots to a size that works better for the BC
- Quick fix applied to the schema so the settings don't fail (missing comma)

##[ 1.0.0 ] - 2016-04-15

### Changed
- Moved the dimensions and package details over to the shipping tab so that
  the details tab can be optional
- Ensured that the details tab would only display when some of the data was
  available to be displayed
- A bunch of breakpoints were adjusted to better suit the medium displays

### Added
- Added a theme setting for the carousel buttons so that some variants can
  utilize the secondary button style for call to action buttons.
- Theme screenshot images in preparation for our 1.0 release!
- Facebook like button now shows up in the share buttons correctly

### Fixed
- Changed the message for calculated shipping methods to reflect the fact that
  price data isn't available until checkout
- Some issues with the call to action regions having content that would
  disappear at certain widths (because of being pushed to a new line)
- Sometimes the theme default images wouldn't show up correctly because the
  value wasn't passed through the templates correctly (this has been fixed)

##[ 0.3.2 ] - 2016-04-08

### Added
- Pagination thumbnails below the quickshop modal image (so it's more obvious
  that there are additional images to page through)

### Fixed
- Misc fixes for design review, including:
- Adjusted the padding below grid items and around banner bottom
- Swapped in a new search icon (with a longer handle)

##[ 0.3.1 ] - 2016-04-08

### Added
- Tab to the search page that showcases non-product (content) results
- A new theme setting for multi-level category menus in the sidebar
- Compare functionalty now lets you compare as many as 10 products at once

### Fixed
- Minor issue with the "scroll to" behaviour on product pages. When the review
  tab is active it should scroll down, but not otherwise
- There's now a little bit of padding on either side of the mobile logo (so it
  doesn't run right up into the menu / cart buttons) and retina logos work
- Banners and the carousel / featured images fill the full content width
  (there is no longer any padding on the left and right sides)
- Some issues on iOS / mobile devices where the nav-drawer would not sit
  quite right when the menu was visible.
- Lots of other misc design review tweaks, such as border adjustments,
  box-shadows, xxl image issues, constraints on the footer, and more

##[ 0.3.0 ] - 2016-03-24

### Added
- Product quantity on details tab
- Sesson-based compare
- Quick search in header
- Dynamic product option visibility based on stock

### Fixed
- Default image in product lists
- Scroll down to reviews (UAT item about alerts not being visible)

##[ 0.2.1 ] - 2016-03-10

### Fixed
- Some minor issues with spacing and grids on the account pages
- Fixed selector that would cause the theme to not load correctly in production
- Adjusted the positioning of the mini cart dot
- Updated our core components so that the account pages now correctly include
  the customers store credit (when available)
- A bunch of little misc style and qa items that we've caught in the last few

##[ 0.2.0 ] - 2016-03-07

### Added
- All the final details as we get ready to for our 1.0 release
- Placeholder images for the screenshots added for UAT testing
- Styling for the giftcard, brand page, search and more
- Quickshop is all styled and is now working wonderfully

### Fixed
- Lots of little misc fixes to the icons, header, search, minicart, etc
- Design review and QA tasks
- Updated Validetta to fix some error messages and form state issues
- The productResult limit is properly passed to productList pagination so
  changing between pages no longer causes a new different number of results
- The width of borders for certain input fields was updated which fixes
  issues where Safari would render a less than one pixel (invisible) border
- The minimum quantity for the quantity widget is now 1 so you can't add
  0 items to the cart

### Changed
- The sidebar is now a little wider on mobile, and we have a dimmer over the
  page content (that when clicked, will dismiss the nav-drawer completely)
- SVG graphics and colors have been tweaked across the various presets
- Product badges look a little different now (but better)

##[ 0.1.0 ] - 2016-02-25

### Added
- Sitemap template and link in footer with a setting to disable it
- "Displaying X of Y" text to the top of category pages
- Linked in the css for the compare and brands pages
- The brands page now also shows the brand image in the header (when available)
- Stylesheets for the account pages: they now look presentable!
- Invoice / Checkout stylesheets necessary for specific pages
- Theme settings are now mapped to schema so theme editor should work

### Fixed
- The currency selector for desktop breakpoints had some issues where it
  would not update correctly because of improperly scoped js: now works fine
- A bunch of misc style issues, including spacing below videos in user-content
  regions, the pointer for the currency selector, blog post positioning, and
  scrolling behaviour in the mini-cart region.
- A bunch of issues related to the Search pages and header such as the header
  layout, text for displaying 0 results, the defaults search page, etc
- When there are more than one banner you don't get commas between them anymore
- Some issues in IE/FF related to the mini-cart scroll when it didn't need to

### Changed
- The main navigation now doesn't click to expand; however, if you are on a
  page with children or that is nested under another page the sub-pages will
  display expaned. The currently active link is bold now too.

##[ 0.0.3 ] - 2016-02-15

### Fixed
- Issue with flickity library sourcing that caused js to not run on new systems
- Which also fixed another problem with the slideshow not displaying correctly
- Layout problems for several elements in the footer
- Several breakpoint issues across the theme
- Problems with the vertical centering of the navigation menu in FF or IE

### Added
- Settings for sidebar color, and to have the sidebar text automatically output
  with the correct contrast depending on that color.
- Custom font settings applied for each variant (theme settings still coming..)

##[ 0.0.2 ] - 2016-02-09

### Added
- A bunch of things specific to exhibit, like sidebar styling, a fixed nav etc
- A "return to [blank]" shopping link that is displayed on product pages or
  blog posts and returns you to the category or blog list (respectively)
- The product page doesn't include a slideshow, but displays all of the images
  down one side of the page.
- We also display images in a baguetteBox (lightbox) on click

### Changed
- A lot of styling that we had from the theme we cloned has been changed to
  better suit Exhibit.

### Removed
- If styling didn't suit Exhibit, it's been removed by now.

##[ 0.0.1 ] - 2016-01-25
### Added
- Ported all the code over from Spotlight as a baseline for Exhibit
