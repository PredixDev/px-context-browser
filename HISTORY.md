v2.2.0
==================
* Set `showFavorited` default value to false. The developer should set the
`show-favorited` attribute on the context browser element to enable favoriting

v2.1.7
==================
* Replace px-context-browser-contextual-notification with px-notification

v2.1.6
==================
* reduce icon-set imports

v2.1.5
==================
* fixing demo pages for IE11

v2.1.4
==================
* Add support for localization

v2.1.3
==================
* Fix truncation for items and header in ie11

v2.1.2
==================
* Demo fix: Remove dead demo code for trigger

v2.1.1
==================
* Demo fix: ensure template has rendered before querying it

v2.1.0
==================
* Add Polymer 1.x/2.x hybrid element support
* Add favoriting feature to allow users to 'favorite' items in the context
browser and see those items listed in a separate Favorited Items Panel

v2.0.14
==================
* add device flags

v2.0.13
==================
* cut over to px-icon-set for actions

v2.0.12
==================
* Adds `isSelectable` configuration for items

v2.0.11
==================
* Fix label color bug (#89)

v2.0.10
==================
* change default behavior to close on-select, add keep-open property to prevent (#86)

v2.0.9
==================
* fix documentation

v2.0.8
==================
* fix documentation

v2.0.7
==================
* fix documentation

v2.0.6
==================
* Fixes support for custom keys (id, children, label) and adds support
  for changing keys at runtime

v2.0.5
==================
* Fix to support runtime re-assignment of `items`

v2.0.4
==================
* Fix comment for analyzer

v2.0.3
==================
* Fix bug so that filter icon shows up in IE

v2.0.2
==================
* Fix bugs in demo

v2.0.1
==================
* Fix dark theme

v2.0.0
==================
* Complete rebuild of the context browser with all new APIs. See the
  documentation for more information on the new APIs and how to migrate your
  existing code.
* New, refreshed design. The browser is now a single column panel that opens
  when its trigger is tapped.
* Re-architected to work side-by-side with other Predix Design System components
  used to navigate assets/context (px-tree, px-breadcrumbs).
* The `<px-context-browser></px-context-browser>` tag no longer places a button
  on the page. Use the px-context-browser tag together with a `<px-context-browser-trigger></px-context-browser-trigger>` tag show a button
  that opens the browser. See the documentation for more information on binding
  these two elements together.
* The `browserContext` property has been renamed to `items`. The structure of
  the context browser items has been completely overhauled.
* The `browserContext` property `name` has been replaced with `label`.
* The `browserContext` property `identifier` has been replaced with `id`.
* The `browserContext` property `isOpenable` has been removed.
* The initial context and direct context modes have been removed. Set the
  `selected` property instead to select an item after loading the data.
* The `disabled` property has been removed.
* The `disableInfiniteScroll` property has been removed.
* The `handlers` property has been removed. Listen to the event
  `px-app-asset-children-requested` to be notified when new children should be
  loaded. Listen to the event `selected-changed` to be notified when an item is
  selected (tapped or selected through data binding). See the documentation for
  more info. There is no event fired when an item is tapped but not selected as
  that interaction pattern has been removed.
* The `idField` and `labelField` properties have been removed. Use the `keys`
  property to set both instead.
* The `openedItemName` property has been removed. Listen to the event
  `selected-changed` to be notified when a new item is selected.
* The `resize` property has been removed.
* The `selectedItem` property has been renamed to `selected`. Its behaviors are
  also slightly different, see the documentation.
* The `showChevron` property has been renamed to `showArrow`.
* The `showColumnBrowser` property has been removed.
* The `showColumnTypeahead` property has been removed. Use the `showFilter`
  property to show a filter field at the top of the column.
* The `addParents` method has been removed. Instead, add items from the root of
  the graph using `addChildren`.
* The `toggleColumnBrowser` method has been removed. Toggle the `collapsed`
  property to show or hide the context browser.
* The events have changed completely. See the documentation for more details.

v1.8.0
==================
* added localization for 'Open'

v1.7.0
==================
* added a disableInfiniteScroll property to... disable infinite scrolling, which happens automatically on scroll.

v1.6.11
==================
* merge PR #39 - Add an onRejected promise handler for to getChildren

v1.6.10
==================
* fix #37 regarding labels in breadcrumb

v1.6.9
==================
* merge PR #36 - allow selectedAsset to have children.

v1.6.8
==================
* merge PR #35

v1.6.7
==================
* fix unit tests for typeahead

v1.6.6
==================
* changed 'search' to 'filter' in typeahead

v1.6.5
==================
* fixed memory leak, causing using setinterval.
* re-wrote some functions for readability
* added lots of documentation.

v1.6.4
==================
* increased context browser from 2 to 5
* created css variable --px-cb-background-z-index
* created css variable --px-cb-spinner-z-index

v1.6.3
==================
* put in cloudflare cache cleaner

v1.6.2
==================
* put in new demo

v1.6.1
==================
* Update colors design to pick up new colors

v1.6.0
==================
* merge PR #32, allow CB to be disabled

v1.5.3
==================
* merge PR that fixed typeahead bug

v1.5.2
==================
* changing ghp.sh to account for Alpha releases

v1.5.1
==================
* fixed win8.1 ie11 test bug.

v1.5.0
==================
* add search per column (filter) capability

v1.4.5
==================
* fixed bug that removed the scrollbars

v1.4.4
==================
* rebuild sass for headings design update

v1.4.3
==================
* added an extra visuallyhidden class to ensure the selected context browser item doesn't show up when open is clicked.

v1.4.2
==================
* removed content-wrapper__item class

v1.4.1
==================
* Update missed design depndencies

v1.4.0
==================
* Updated dependencies

v1.3.17
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v1.3.16
==================
* updating slider dependency

v1.3.15
==================
* changing all devDeps to ^

v1.3.14
==================
* Update px-theme to 2.0.1 and update test fixtures

v1.3.13
==================
* update dependencies for dropdown

v1.3.12
==================
* changed i to iron-icon

v1.3.11
==================
* removing px-theme style call

v1.3.10
==================
* changed css variables to be consistent with BEM

v1.3.9
==================
* bower updating px-demo-snippet

v1.3.8
====================
* added style variables for theming

v1.3.7
====================
* updated the header so it's always vertically centered.

v1.3.6
====================
* Update dependencies

v1.3.3
====================
* Add some top to make sure expanded 'ruler' is correctly positioned.

v1.3.2
====================
* Revert position change introduced in v1.0.7. Was causing issues in seed app by pushing content down the page.

v1.3.1
====================
* Fix dropdown icon size. CSS shadow dom fixes and load order of sass partials.

v1.3.0
====================
* Grunt to gulp conversion and move to style modues.

v1.2.0
====================
* Add content tag to allow insertion of deck selector.

v1.1.0
====================
* migrate styles to style module

v1.0.10
====================
* fixed demo bugs

v1.0.9
====================
* brought the Q library back in for local dev.

v1.0.8
====================
* updated mega demo styles and bower px-demo-snippet to ^

v1.0.7
====================
* Chrome changed its behavior from version 51 to 52, and was causing the header to be hidden behind the absolutely positioned browser. I changed the positioning to relative. also switched the old font awesome to one that works in shadow dom.

v1.0.6
====================
* PR that changed how the breadcrumbs are rebuilt, allowing items with children not in the selected path
v1.0.5
====================
* removed the old demo vulcanize from the auto build script

v1.0.4
====================
* added image to readme, removed watch, added view on github

v1.0.3
====================
* updated gh-pages script to vulcanize demo

v1.0.2
====================
* Add import and config of px-iconography-design (again)
* Add import and config of px-typography-design (again)
* removed importQ.html from ignore

v1.0.1
====================
* added new demo

v1.0.0
====================
* Add import and config of px-iconography-design
* Add import and config of px-typography-design

v0.10.0
====================
* Upgrade to Polymer 1.5.0

v0.9.7
====================
* Merged PR which fixed lazy loading spinner bug

v0.9.5
====================
* removed unnecessary check on breadcrumbs

v0.9.5
====================
* added oss_notice to bower ignore

v0.9.4
====================
* added pull request test

v0.9.3
====================
* added auto github pages functionality

v0.9.2
====================
* fixed tests

v0.9.1
====================
* fixed the breadcrumbs so they adhere to specs

v0.9.0
====================
* Upgrade to Polymer 1.4.0

v0.8.6
====================
* cleaned up docs a bit, and cleaned up css class methods.

v0.8.5
====================
* Updated travis file

v0.8.4
====================
* Updated documentation for api only.

v0.8.3
====================
* updated the link for Github Issues

v0.8.2
====================
* changed line height for selected items to help differentiate them from non-selected items

v0.8.1
====================
* Updated License

v0.8.0
====================
* Removed the default reference to the item chevron, since the Predix asset team does not support that. the functionality is still there, but now, you have to pass an attribute (has-children) and set it to true to ensure the chevrons show up.
