/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
### Usage

    <px-context-browser-trigger trigger={{openTrigger}}></px-context-browser-trigger>
    <px-context-browser open-trigger="[[openTrigger]]" items='[{"label":"Home","id":"home"},{"label":"Alerts","id":"alerts"},{"label":"Assets","id":"assets"}]'></px-context-browser>

### Styling
The following custom properties are available for styling.

Custom property | Description
:----------------|:-------------
`--px-context-browser-header-background-color` | Background color of the header
`--px-context-browser-header-border-color` | Bottom border color of the header
`--px-context-browser-header-text-color` | Text color of the header
`--px-context-browser-item-text-color` | Text color of the items
`--px-context-browser-item-background-color--hover` | Background color of the items on hover
`--px-context-browser-item-background-color--selected` | Background color of the item when selected
`--px-context-browser-item-text-color--selected` | Text color of the item when selected
`--px-context-browser-icon-stroke` | Color of the icon stroke
`--px-context-browser-icon-stroke--item-selected` | Color of the icon when the item is selected
`--px-context-browser-panel-border-color` | Border color of the panel
`--px-context-browser-panel-background-color` | Background color of the panel
`--px-context-browser-panel-width` | Width of the panel
`--px-context-browser-loading-background-color` | The background color of the loading bar
`--px-context-browser-loading-foreground-color` | The foreground color of the loading bar
`--px-context-browser-trigger-height` | The height of the trigger
`--px-context-browser-trigger-width` | The width of the trigger
`--px-context-browser-trigger-hover-background` | The background color of the trigger on hover
`--px-context-browser-trigger-icon-color` | The icon color of the trigger

@element px-context-browser
@homepage index.html
@demo index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'web-animations-js/web-animations-next-lite.min.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import 'px-app-helpers/px-app-asset/px-app-asset-behavior-graph.js';
import 'px-app-helpers/px-app-asset/px-app-asset-behavior-selectable.js';
import 'px-app-helpers/px-app-asset/px-app-asset-behavior-activatable.js';
import 'px-app-helpers/px-app-asset/px-app-asset-behavior-favoritable.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import 'px-icon-set/px-icon-set-navigation.js';
import 'px-icon-set/px-icon.js';
import './css/px-context-browser-styles.js';
import './css/px-context-browser-animations-styles.js';
import './px-context-browser-panel.js';
import './px-context-browser-header.js';
import './px-context-browser-item.js';
import './px-context-browser-columns.js';
import './px-context-browser-filter.js';
import './px-context-browser-contextual-notification.js';
import './px-context-browser-favorited-temp.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
Polymer({
  _template: html`
    <style include="px-context-browser-styles"></style>
    <style include="px-context-browser-animations-styles"></style>

    <!-- <iron-a11y-keys target="[[_panelEl]]" keys="up" on-keys-pressed="_focusLast" stop-keyboard-event-propagation></iron-a11y-keys>
    <iron-a11y-keys target="[[_panelEl]]" keys="down" on-keys-pressed="_focusNext" stop-keyboard-event-propagation></iron-a11y-keys>
    <iron-a11y-keys target="[[_panelEl]]" keys="enter" on-keys-pressed="_handleEnterKey" stop-keyboard-event-propagation></iron-a11y-keys>
    <iron-a11y-keys target="[[_panelEl]]" keys="left" on-keys-pressed="_handleArrowLeftKey" stop-keyboard-event-propagation></iron-a11y-keys> -->

    <!-- Media query to determine if context browser should collapse -->
    <template is="dom-if" if="[[_collapseQueryIsValid(collapseAt)]]">
      <iron-media-query query\$="(max-width: {{_getCollapseQuery(collapseAt)}})" query-matches="{{_belowCollapseSize}}"></iron-media-query>
    </template>

    <!-- Links the active column to __activeContext so changes to the active column are notifying -->
    <array-selector id="selector" items="[[__context.columns]]" selected="{{__activeContext}}"></array-selector>

    <!-- Creates a temporary cache of favorited items before applying changes to the favorited array -->
    <px-context-browser-favorited-temp id="favoritedCop" favorited-behavior-element="[[__this]]" favorited="[[favorited]]" current-favorited="{{currentFavorited}}" opened="[[opened]]" favorited-opened="[[favoritedOpened]]">
    </px-context-browser-favorited-temp>

    <!-- Backdrop to show if collapsed and open -->
    <div class="backdrop" visible\$="[[_isCollapseOpened(collapsed, opened, favoritedOpened)]]"></div>

    <!-- REGULAR CONTEXT BROWSER -->
    <iron-dropdown id="dropdown" no-overlap="" horizontal-offset="-15" vertical-align="[[_getDropdownVerticalAlign(collapsed)]]" horizontal-align="[[_getDropdownHorizontalAlign(collapsed)]]" opened="{{opened}}" position-target="[[_getPositionTarget(_positionTarget, collapsed)]]" on-iron-overlay-canceled="_handleBrowserCanceled" on-iron-overlay-opened="_handleBrowserOpened" on-iron-overlay-closed="_handleBrowserClosed">
      <px-context-browser-panel id="panel" slot="dropdown-content" has-header\$="[[_isNotNull(active)]]" collapsed\$="[[collapsed]]" show-loading-bar="[[loading]]">
        <px-context-browser-header id="header" slot="header" active\$="[[_isNotNull(active)]]" label="[[_getItemProp(active, keys.label)]]" on-tap="_handleHeaderTapped" can-select="[[_isItemSelectable(active)]]" can-favorite="[[_showFavoritedAndItemFavoritable(showFavorited, active)]]" favorited="[[_isItemFavorited(active, favorited, favorited.*)]]" collapsed\$="[[collapsed]]"></px-context-browser-header>
        <px-context-browser-filter slot="filter" active\$="[[showFilter]]" filter="{{filter}}" filtering="{{filtering}}" placeholder="[[localize('Filter')]]"></px-context-browser-filter>
        <px-context-browser-columns slot="columns" active="[[__context.activeIndex]]" visible-count\$="[[__activeContext.visibleCount]]" collapsed\$="[[collapsed]]">
          <template is="dom-repeat" items="[[__context.columns]]" as="column">
            <div column\$="[[column.index]]" class="column" slot="columns">
              <template is="dom-repeat" items="[[column.items]]" as="item" forcolumn="[[column.index]]" on-dom-change="_updateVisibleCount" filter="{{_getColumnFilter(column.index, filter, keys.label, filtering)}}">
                <px-context-browser-item label="[[_getItemProp(item, keys.label)]]" breadcrumbs="[[_getFavoritedItemPath(item)]]" selected="[[_isItemSelected(item, selected)]]" favorited="[[_isItemFavorited(item, favorited, favorited.*)]]" can-select="[[_isItemSelectable(item)]]" can-favorite="[[_showFavoritedAndItemFavoritable(showFavorited, item)]]" can-open="[[_isItemOpenable(showArrow, item)]]" on-tap="_handleItemTapped" tabindex="0" collapsed\$="[[collapsed]]">
                </px-context-browser-item>
              </template>
            </div>
          </template>
        </px-context-browser-columns>
      </px-context-browser-panel>
    </iron-dropdown>

    <!-- FAVORITES CONTEXT BROWSER-->
    <iron-dropdown id="favoritedDropdown" no-overlap="" horizontal-offset="-15" vertical-align="[[_getDropdownVerticalAlign(collapsed)]]" horizontal-align="[[_getDropdownHorizontalAlign(collapsed)]]" opened="{{favoritedOpened}}" position-target="[[_getPositionTarget(_favoritedPositionTarget, collapsed)]]" on-iron-overlay-canceled="_handleFavoritedBrowserCanceled">
      <!-- NON-EMPTY FAVORITES STATE -->
      <px-context-browser-panel id="favoritedPanel" slot="dropdown-content" collapsed\$="[[collapsed]]" show-loading-bar="[[favoritedSyncing]]">
        <template is="dom-if" if="[[!_showFavoritedEmptyState(favorited, favorited.*)]]">
          <px-context-browser-filter slot="filter" active\$="[[showFilter]]" filter="{{favoritedFilter}}" filtering="{{filtering}}" placeholder="[[localize('Filter')]]"></px-context-browser-filter>
          <px-context-browser-contextual-notification slot="contextual-notification" opened="[[favoritedSyncFailed]]"></px-context-browser-contextual-notification>
          <px-context-browser-columns slot="columns" active="0" visible-count\$="[[_favoritedVisibleCount]]" collapsed\$="[[collapsed]]">
            <div column="0" class="column" slot="columns">
              <template is="dom-repeat" id="favoritedRepeater" items="[[favorited]]" as="item" forcolumn="0" on-dom-change="_updateVisibleCountFavorited" filter="{{_getColumnFilterFavorited(favoritedFilter, keys.label, filtering)}}">
                <px-context-browser-item label="[[_getItemProp(item, keys.label)]]" breadcrumbs="[[_getFavoritedItemPath(item)]]" selected="[[_isItemSelected(item, selected)]]" favorited="[[_isItemFavorited(item, currentFavorited)]]" can-select="[[_isItemSelectable(item)]]" can-favorite="[[_showFavoritedAndItemFavoritable(showFavorited, item)]]" can-open="[[_isItemOpenable(showArrow, item)]]" on-tap="_handleItemTapped" tabindex="0" collapsed\$="[[collapsed]]" style-as-favorite="" visible="[[favoritedOpened]]">
                </px-context-browser-item>
              </template>
            </div>
          </px-context-browser-columns>
        </template>

        <!-- EMPTY FAVORITES STATE -->
        <template is="dom-if" if="[[_showFavoritedEmptyState(favorited, favorited.*)]]">
          <px-context-browser-contextual-notification slot="contextual-notification" opened="[[favoritedSyncFailed]]"></px-context-browser-contextual-notification>
          <div slot="columns" class="context-browser-favorites--empty__container">
            <px-icon icon="px-nav:favorite" class="context-browser-favorites--empty__icon"></px-icon>
            <div class="context-browser-favorites--empty__text regular">[[localize("You don't have any favorites yet.")]]</div>
            <div class="context-browser-favorites--empty__subtext zeta">[[localize("To favorite a context\\, click on the star while viewing a context in the context browser.")]]</div>
          </div>
        </template>
      </px-context-browser-panel>
    </iron-dropdown>
`,

  is: 'px-context-browser',

  behaviors: [
    PxAppBehavior.AssetGraph,
    PxAppBehavior.AssetSelectable,
    PxAppBehavior.AssetActivatable,
    PxAppBehavior.AssetFavoritable,
    IronResizableBehavior,
    AppLocalizeBehavior
  ],

  properties: {
    /**
     * Enable to show a star icon next to each item. The user can tap the star
     * to add that item to their favorited list.
     */
    showFavorited: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * Enable to show an arrow when the user hovers over an item that has
     * children and can be activated.
     */
    showArrow: {
      type: Boolean,
      value: false
    },

    /**
     * Enable to show a filter input that filters the visible column. Changes
     * to the filter text are notified out through the `filter` property.
     */
    showFilter: {
      type: Boolean,
      value: false
    },

    /**
     * User-supplied filter text to filter items in the context browser.
     * The string will be lowercased and compared to the label of each item
     * in the currently visible column.
     */
    filter: {
      type: String,
      notify: true
    },

    /**
     * User-supplied filter text to filter items in the favorited panel.
     * The string will be lowercased and compared to the label of each item
     * in the favorited panel.
     */
    favoritedFilter: {
      type: String,
      notify: true
    },

    /**
     * When an item is activated and it has no children, the context browser
     * shows a loading animation and fires an event to request children to
     * show (see `px-app-asset-children-requested`). If no new children are
     * added before this timeout, the browser will show the last active item.
     *
     * Set a time in milliseconds. Set to `0` to wait forever. Default to 5
     * seconds (5000 milliseconds).
     */
    loadingTimeout: {
      type: Number,
      value: 5000,
      observer: '_handleLoadingTimeoutChanged'
    },

    /**
     * Watch for changes to determine if the context browser is trying to
     * load new children.
     */
    loading: {
      type: Boolean,
      value: false,
      readOnly: true
    },

    /**
     * Bind to a `<px-context-browser-trigger>` element. A tap on the trigger
     * will open the context browser.
     */
    openTrigger: {
      type: HTMLElement,
      observer: '_openTriggerChanged'
    },

    /**
     * Bind to a `<px-context-browser-trigger>` element. A tap on the favorited
     * trigger will open a list of favorited items in the context browser.
     */
    favoritedTrigger: {
      type: HTMLElement,
      observer: '_favoritedTriggerChanged'
    },

    /**
     * If `true` the context browser is opened to the navigation view.
     */
    opened: {
      type: Boolean,
      notify: true,
      observer: '_handleInitialOpenedValue'
    },

    /**
     * If `true` the context browser is opened to the favorited view.
     */
    favoritedOpened: {
      type: Boolean,
      notify: true,
      reflectToAttribute: true
    },

    /**
     * If `true` the context browser will remain opened even after a context is selected.
     * The only way to dismiss the context browser will be clicking the trigger again,
     * or using the ESC key.
     */
    keepOpen: {
      type: Boolean
    },

    /**
     * The width below which the context browser will collapse into a mobile
     * friendly menu that slides up from the bottom of the page. Use a number
     * (e.g. `450`) which will be converted to a pixel value (e.g. '450px').
     *
     * If no value is provided, the context browser will not collapse
     * automatically. The collapsed attribute can also be used to manually
     * collapse and un-collapse the context browser.
     */
    collapseAt: {
      type: Number
    },

    /**
     * Watch for changes to determine if the context browser is collapsed.
     */
    collapsed: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * Set to true if your app fails to sync the user's favorited list to the
     * server. Shows a notification bar informing the user that the sync
     * failed and allows them to tap an icon to attempt to sync the favorited
     * list again. Listen for the NAME_OF_EVENT event to receive a
     * notification when the user requests a new sync attempt.
     */
    favoritedSyncFailed: {
      type: Boolean,
      value: false,
      notify: true
    },

    /**
     * Watch for changes to determine if the context browser is trying to
     * sync its favorited items.
     */
    favoritedSyncing: {
      type: Boolean,
      value: false
    },

    /**
     * A valid IETF language tag as a string that `app-localize-behavior` will
     * use to localize this component.
     *
     * See https://github.com/PolymerElements/app-localize-behavior for API
     * documentation and more information.
     */
    language: {
      type: String,
      value: 'en'
    },
    /**
     * Use the key for localization if value for that language is missing.
     * Should always be true for Predix components.
     */
    useKeyIfMissing: {
      type: Boolean,
      value: true
    },
    /**
     * Library object of hardcoded strings used in this application.
     * Used by `app-localize-behavior` in conjunction with `language`.
     */
    resources: {
      type: Object,
      value: function() {
        return {
          'en': {
            'You don\'t have any favorites yet.': 'You don\'t have any favorites yet.',
            'To favorite a context\, click on the star while viewing a context in the context browser.': 'To favorite a context, click on the star while viewing a context in the context browser.',
            'Filter': 'Filter'
          }
        }
      }
    },

    _positionTarget: {
      type: HTMLElement
    },

    _panelEl: {
      type: HTMLElement
    },

    __rootColumn: {
      type: Object,
      computed: '_getRootColumn(__rootItems)'
    },

    __context: {
      type: Array,
      value: function() {
        return {
          columns: null,
          activeIndex: null
        };
      },
      computed: '_getColumns(activeMeta, __rootColumn)'
    },

    __activeContext: {
      type: Object
    },

    _belowCollapseSize: {
      type: Boolean,
      observer: '_handleBelowCollapseSizeChanged'
    },

    _cancelFilterFocus: {
      type: Boolean,
      value: false
    },

    _favoritedVisibleCount: {
      type: Number
    },

    /**
     * Reference to this context browser instance, for data-binding.
     */
    __this: HTMLElement
  },

  observers: [
    'clearFilter(__context.activeIndex)',
    'clearFilter(showFilter)',
    '_linkActiveContext(__context.activeIndex)',
    '_updateActiveLoading(activeMeta.item)',
    '_updateCancelFilterFocus(__context.activeIndex)'
  ],

  listeners: {
    // 'px-app-asset-graph-created' : '_resetColumns',
    // 'px-app-asset-deactivated' : '_resetColumns',
    // 'focus-first-visible-item' : '_focusFirstVisibleItem',
    'px-app-asset-children-updated' : '_handleChildrenChanged',
    'iron-resize' : '_handleResize',
    'px-context-browser-filter-focused' : '_handleFilterFocused'
  },

  _handleFilterFocused(evt) {
    if (this._cancelFilterFocus) {
      const target = dom(evt).rootTarget;
      target.blurFilter();
    }
  },

  /**
   * When the user is navigating the collapsed browser, if they press on the
   * header a little bit too long and the filter is active, when the filter
   * slides up it will sometimes be activated and open the keyboard. To
   * prevent this, we blur the filter if it becomes focused less than 200ms
   * after we navigate to the root.
   */
  _updateCancelFilterFocus(index) {
    if (!this.showFilter || !this.opened || !this.collapsed || index !== 0) return;

    console.log('start cancel');
    this._cancelFilterFocus = true;
    // If the last task is pending, cancel and clear it
    if (this._cancelFilterFocusTask) {
      this.cancelAsync(this._cancelFilterFocusTask);
      this._cancelFilterFocusTask = null;
    }
    // Ready the next task
    this._cancelFilterFocusTask = this.async(function(){
      console.log('stop cancel');
      this._cancelFilterFocus = false;
      this._cancelFilterFocusTask = null;
    }, 200);
  },

  _collapseQueryIsValid(query) {
    if (typeof query === 'number') {
      return true;
    }
    if (typeof query === 'string' && query.slice(-2) === 'px' && !isNaN(parseInt(query))) {
      return true;
    }
    return false;
  },

  _isCollapseOpened(collapsed, opened, favoritedOpened) {
    return (collapsed && (opened || favoritedOpened));
  },

  _handleResize(evt) {
    if (this._positionTarget && evt && dom(evt).rootTarget === this) {
      // Why do we this? I'll tell you why. We have to do some tricky little
      // things to make the dropdown panel size itself as a percentage of the
      // height of the document in iOS Safari. (Thanks, iOS Safari, for not
      // supporting vh units and for collapsing child heights that are defined
      // as a percentage of parent that does not have a static height set.)
      //
      // Combine this with the fact that users can open the collapsed menu and
      // randomly start tilting their phone from portrait to landscape to
      // portrait to landscape to portrait to landscape... and somewhere around
      // the 3rd iteration of this manic loop, the dropdown will size itself
      // off-screen. So good. So, we listen for resize events. If we have a
      // position target to size ourselves against, and if we originated the
      // resize event, we'll request the next animation frame AND use a timeout
      // to wait until drawing is finished before we force a refit. Yay.
      window.requestAnimationFrame(function(){
        setTimeout(function(){
          this.$.dropdown.refit();
        }.bind(this));
      }.bind(this));
    }
  },

  created() {
    this._resetActiveTask = null;
    this._squashNextResetActiveTask = null;
    this._childLoadingHandler = null;
    this._cancelFilterFocusTask = null;
  },

  ready() {
    this._favoritedCop = this.$.favoritedCop;
    this.__this = this;
  },

  attached() {
    this._panelElement = dom(this.root).querySelector('#panel');
  },

  detached() {
    this._panelElement = null;
  },

  _getCollapseQuery(collapseAt) {
    if (typeof collapseAt === 'number') {
      return collapseAt + 'px';
    }
    if (typeof collapseAt === 'string' && collapseAt.slice(-2) === 'px' || !isNaN(parseInt(collapseAt))) {
      return collapseAt;
    }
  },

  _handleBelowCollapseSizeChanged(newVal, oldVal) {
    if (newVal && !this.collapsed) {
      this.collapsed = true;
    }
    if (!newVal && this.collapsed) {
      this.collapsed = false;
    }
  },

  // ********************************************************************** //
  // Set/update loading status
  // ********************************************************************** //

  _setLoadingStatus(index, isLoading) {
    this.set(`__context.columns.${index}.loading`, isLoading);
  },

  _updateActiveLoading(newActive) {
    if (this.loading) {
      this.cancelLoading(false);
    }
    if (newActive) {
      const shouldLoadChildren = (!this._assetGraph.isTerminal(newActive) && !this._assetGraph.hasChildren(newActive));
      if (shouldLoadChildren) {
        this._startLoading(newActive, this._assetGraph.getPath(newActive))
      }
    }
  },

  _handleLoadingTimeout(item) {
    this.cancelLoading(true);
  },

  _handleChildrenChanged(evt) {
    const {item, path, children, isTerminal, hasChildren} = evt.detail;

    if (this.activeMeta && this.activeMeta.item && this.activeMeta.item === item) {
      // Children added to the active (visible) item
      let path = `__context.columns.${this.__context.activeIndex}.items`;
      this.set(path, []);
      this.set(path, children);
      this.cancelLoading(true);
    }
    else if (this.__context && Array.isArray(this.__context.columns) && item === null) {
      // Children added to the root
      let path = `__context.columns.0.items`
      this.set(path, []);
      this.set(path, children);
    }
    else if (this.__context && Array.isArray(this.__context.columns) && this.__context.columns.length > 1) {
      // Loop over columns. If this item is in the columns list, go update
      // its children with this new list.
      for (let i=1; i<this.__context.columns.length; i++) {
        if (this.__context.columns[i].parent === item) {
          let path = `__context.columns.${i}.items`;
          this.set(path, []);
          this.set(path, children);
        }
      }
    }
  },

  _startLoading(item, path) {
    if (typeof this.loadingTimeout !== 'number' || this.loadingTimeout < 0) {
      throw new Error(`px-context-browser expects the \`loadingTimeout\` property to be a non-negative number. The following invalid value was given:
        ${this.loadingTimeout}`);
    }
    this._setLoading(true);
    this.fire('px-app-asset-children-requested', { item, path });
    if (typeof this.loadingTimeout === 'number' && this.loadingTimeout > 0) {
      this._childLoadingHandler = this.async(this._handleLoadingTimeout.bind(this, item), this.loadingTimeout);
    }
  },

  /**
   * Cancels the current child loading event, if one is in progress. Changes
   * the active browser view to the previously loading item's parent.
   */
  cancelLoading(allowBounceback) {
    if (this._childLoadingHandler) {
      this.cancelAsync(this._childLoadingHandler);
      this._childLoadingHandler = null;
    }
    if (this.loading) {
      this._setLoading(false);
    }
    if (allowBounceback) {
      if (this.activeMeta && this.activeMeta.item && !this._assetGraph.hasChildren(this.activeMeta.item)) {
        this.activate(this.activeMeta.parent, 'LOADING_CANCELLED');
      }
    }
  },

  _handleLoadingTimeoutChanged(newVal) {
    if (this.loading) {
      this.cancelLoading();
    }
  },

  // ********************************************************************** //
  // Filter/unfilter visible column
  // ********************************************************************** //

  /**
   * Clears the active filter text.
   */
  clearFilter() {
    this.filter = '';
  },

  _getColumnFilter(index, filter, labelKey, filterIsActive) {
    if (!filterIsActive || this.__context.activeIndex !== index) {
      return null;
    }

    let filterStr = filter.toLowerCase();
    return this._doesItemMatchFilter.bind(this, filterStr, labelKey);
  },

  _getColumnFilterFavorited(filter, labelKey, filterIsActive) {
    if (!filterIsActive) {
      return null;
    }

    let filterStr = filter.toLowerCase();
    return this._doesItemMatchFilter.bind(this, filterStr, labelKey);
  },

  _doesItemMatchFilter(filter, labelKey, item) {
    if (!item[labelKey]) return false;
    return (item[labelKey].toLowerCase().indexOf(filter) > -1);
  },

  // ********************************************************************** //
  // Update column list
  // Link changes to columns to active column
  // ********************************************************************** //

  _linkActiveContext(index) {
    if (this.__context.columns && typeof index === 'number') {
      this.$.selector.select(this.__context.columns[index]);
    }
  },

  _updateVisibleCount(evt) {
    if (!this.__context || typeof this.__context.activeIndex !== 'number') return;
    const target = dom(evt).rootTarget;
    const index = target.forcolumn;
    const count = target.renderedItemCount;
    if (typeof count !== 'number') return;
    this.set(`__context.columns.${index}.visibleCount`, count);
  },

  _updateVisibleCountFavorited() {
    if (this.favoritedOpened) {
      const target = dom(this.root).querySelector('#favoritedRepeater');
      if (!target) return;
      const count = target.renderedItemCount;
      if (typeof count !== 'number') return;
      this._favoritedVisibleCount = count;
    }
  },

  _getColumns(active, rootColumn) {
    const {item, path} = active;
    if (!Array.isArray(this.__context.columns)) {
      // First run, add the root column to the columns array so it will
      // be drawn
      this.__context.columns = [rootColumn];
    }

    if (!Array.isArray(path) && Array.isArray(this.__context.columns) && this.__context.columns[0] !== rootColumn) {
      // The asset graph was re-created from a new items list, clear out
      // the columns and reset to only showing root
      this.__context.columns = [rootColumn];
    }

    if (!Array.isArray(path)) {
      // No path to an asset, return the context graph with an active index
      // of the root column
      return Object.assign({}, this.__context, {
        activeIndex: 0
      });
    }

    const columns = this.__context.columns.slice(0);
    let activeIndex;

    for (let i=0; i<path.length; i++) {
      if (columns[i+1] && columns[i+1].parent === item) {
        activeIndex = i+1;
        break;
      }

      columns[i+1] = Object.assign({}, columns[i+1] ? columns[i+1] : {}, {
        index: i+1,
        parent: path[i],
        items: this._assetGraph.hasChildren(path[i]) ? this._assetGraph.getChildren(path[i]) : [],
        visibleCount: null
      });
    }

    return Object.assign({}, this.__context, {
      columns: columns,
      activeIndex: (typeof activeIndex === 'number') ? activeIndex : path.length
    });
  },

  _getRootColumn(items) {
    return {
      index: 0,
      parent: null,
      items: items,
      visibleCount: null
    };
  },

  // ********************************************************************** //
  // Bind to open/favorited trigger, open/close on trigger tap
  // ********************************************************************** //

  _openTriggerChanged(newTrigger, oldTrigger) {
    if (oldTrigger && oldTrigger instanceof HTMLElement && this._openTriggerTapped) {
      oldTrigger.removeEventListener('trigger-tapped', this._openTriggerTapped);
    }
    if (newTrigger && newTrigger instanceof HTMLElement) {
      this._positionTarget = newTrigger;
      this._openTriggerTapped = () => {
        this._handleOpenTriggerTapped();
      };
      newTrigger.addEventListener('trigger-tapped', this._openTriggerTapped, false);
    }
  },

  _favoritedTriggerChanged(newTrigger, oldTrigger) {
    if (oldTrigger && oldTrigger instanceof HTMLElement && this._favoritedTriggerTapped) {
      oldTrigger.removeEventListener('trigger-tapped', this._favoritedTriggerTapped);
    }
    if (newTrigger && newTrigger instanceof HTMLElement) {
      this._favoritedPositionTarget = newTrigger;
      this._favoritedTriggerTapped = () => {
        this._handleFavoritedTriggerTapped();
      };
      newTrigger.addEventListener('trigger-tapped', this._favoritedTriggerTapped, false);
    }
  },

  _handleOpenTriggerTapped(evt) {
    if (!this.opened) {
      this.favoritedOpened = false;
      this.opened = true;
    }
    else {
      this.$.dropdown.close();
    }
  },

  _handleFavoritedTriggerTapped(evt) {
    if (!this.favoritedOpened) {
      this.opened = false;
      this.favoritedOpened = true;
      if (PolymerElement) {
        afterNextRender(this, () => {
          this._updateVisibleCountFavorited();
        });
      } else {
        requestAnimationFrame(() => {
          setTimeout(() => {
            this._updateVisibleCountFavorited();
          });
        });
      }
    }
    else {
      this.$.favoritedDropdown.close();
    }
  },

  // ********************************************************************** //
  // Reset active state (if necessary) when browser is closed/opened
  // ********************************************************************** //

  /**
   * If the user clicked on the open or the favorited trigger, we'll let the
   * trigger close the dropdown on its own.
   */
  _handleBrowserCanceled(evt) {
    if (!this.openTrigger) return;
    const path = dom(evt.detail).path;
    if (path.indexOf(this.openTrigger) > -1) {
      evt.preventDefault();
    }
  },

  _handleFavoritedBrowserCanceled(evt) {
    if (!this.favoritedTrigger) return;
    const path = dom(evt.detail).path;
    if (path.indexOf(this.favoritedTrigger) > -1) {
      evt.preventDefault();
    }
  },

  /**
   * If the browser is opened before the reset active task runs, cancel it.
   */
  _handleBrowserOpened(evt) {
    if (this._squashNextResetActiveTask) {
      this._squashNextResetActiveTask = null;
    }
    if (this._resetActiveTask) {
      this.cancelAsync(this._resetActiveTask);
      this._resetActiveTask = null;
    } else {
      this._resetActive(); // necessary to update active if a new item is selected via. API while the browser was closed
    }
  },

  /**
   * After 5 seconds, reset the active to the parent of the selected item,
   * or to the root if no item is selected.
   */
  _handleBrowserClosed(evt) {
    if (this._squashNextResetActiveTask) {
      this._squashNextResetActiveTask = null;
      return;
    }
    if (this._resetActiveTask) {
      this.cancelAsync(this._resetActiveTask);
      this._resetActiveTask = null;
    }
    this._resetActiveTask = this.async(this._resetActive.bind(this), 5000);
  },

  _resetActive() {
    if (!this.selected && this.active) {
      this.activate(null, 'DOM_EVENT');
    }
    else if (this.selected && this.active !== this.selectedMeta.parent) {
      this.activate(this.selectedMeta.parent, 'DOM_EVENT');
    }
  },

  _handleInitialOpenedValue(nextVal, lastVal) {
    if (typeof nextVal === 'boolean' && typeof lastVal == 'undefined') {
      // We are in the initial state. We must try to squash the next closed
      // event from the iron-dropdown or we will fail to handle the initial
      // item being selected and fail to show the correct active item. Bof.
      this._squashNextResetActiveTask = true;
    }
  },

  // ********************************************************************** //
  // Calculate iron-dropdown properties
  // ********************************************************************** //

  _getDropdownVerticalAlign(collapsed) {
    return collapsed ? 'bottom' : 'top';
  },

  _getDropdownHorizontalAlign(collapsed) {
    return collapsed ? 'right' : 'left';
  },

  _getPositionTarget(openTarget, collapsed) {
    if (collapsed || !(openTarget instanceof HTMLElement)) {
      return window;
    }
    return openTarget;
  },

  // ********************************************************************** //
  // Handle keyboard events
  // ********************************************************************** //

  // _focusLast(evt) {
  //   evt.detail.keyboardEvent.preventDefault();
  //   const srcItem = Polymer.dom(evt.detail.keyboardEvent).rootTarget;
  //   const lastItem = srcItem.previousElementSibling;
  //   if (lastItem && lastItem.nodeName === 'PX-CONTEXT-BROWSER-ITEM') {
  //     lastItem.focus();
  //   }
  //   else if (this.showFilter) {
  //     const listEl = Polymer.dom(this.root).querySelector('#list');
  //     if (listEl) {
  //       listEl.focusInput();
  //     }
  //   }
  // },
  //
  // _focusNext(evt) {
  //   evt.detail.keyboardEvent.preventDefault();
  //   const srcItem = Polymer.dom(evt.detail.keyboardEvent).rootTarget;
  //   const nextItem = srcItem.nextElementSibling;
  //   if (nextItem && nextItem.nodeName === 'PX-CONTEXT-BROWSER-ITEM') {
  //     // If the next element is another context browser item, focus it
  //     nextItem.focus();
  //   }
  //   else if (srcItem.parentElement.childElementCount > 1) {
  //     // If the next element isn't an item, focus the first item in the list
  //     const firstSibling = this._getFirstSibling(srcItem, srcItem.parentElement.children, 'PX-CONTEXT-BROWSER-ITEM');
  //     if (firstSibling) {
  //       firstSibling.focus();
  //     }
  //   }
  // },
  //
  // _focusFirstVisibleItem(evt) {
  //   if (typeof this._columns === 'object' && typeof this._activeColumn === 'number' && this._columns[this._activeColumn]) {
  //     const firstItem = this._getFirstSibling(null, this._columns[this._activeColumn].el.children, 'PX-CONTEXT-BROWSER-ITEM');
  //     if (firstItem) {
  //       firstItem.focus();
  //     }
  //   }
  // },
  //
  // _handleEnterKey(evt) {
  //   const target = Polymer.dom(evt.detail.keyboardEvent).rootTarget;
  //   if (target.nodeName === 'PX-CONTEXT-BROWSER-ITEM') {
  //     const repeatEl = Polymer.dom(this._columns[this._activeColumn].el).querySelector('template[is="dom-repeat"]');
  //     const model = repeatEl.modelForElement(target);
  //     this.select(model.item.source, 'DOM_EVENT');
  //   }
  // },
  //
  // _handleArrowLeftKey(evt) {
  //   // @TODO: Starting to be a lot of repeat code here. What's a better
  //   // way to do this that's succinct?
  //
  //   // DESIRED BEHAVIOR: If there's a parent, go up to it. If not, go up to root.
  //
  //   const target = Polymer.dom(evt.detail.keyboardEvent).rootTarget;
  //   if (target.nodeName === 'PX-CONTEXT-BROWSER-ITEM') {
  //     const repeatEl = Polymer.dom(this._columns[this._activeColumn].el).querySelector('template[is="dom-repeat"]');
  //     const item = repeatEl.modelForElement(target).item.source;
  //     const parent = this._assetGraph.getNodeInfo(item).parent;
  //     if (parent) {
  //       this.activate(parent, 'DOM_EVENT');
  //     } else {
  //       this.activate(null, 'DOM_EVENT');
  //     }
  //   }
  // },
  //
  // _getFirstSibling(source, siblings, targetNodeName) {
  //   for (let i=0; i<siblings.length; i++) {
  //     if (siblings[i].nodeName === targetNodeName && siblings[i] !== source) {
  //       return siblings[i];
  //     }
  //   }
  // },

  // ********************************************************************** //
  // Select or activate or favorite items when tapped
  // Select or activate or favorite parent item when header tapped
  // ********************************************************************** //

  _handleItemTapped(evt) {
    evt.stopPropagation();
    const path = dom(evt).path;
    const action = this._findActionInPath(path);
    const item = evt.model.item;

    if (typeof action === 'string' && action.length > 0 && typeof item === 'object') {
      const isTerminal = this._assetGraph.isTerminal(item);
      if (!isTerminal && action === 'activate') {
        this.activate(item, 'DOM_EVENT');
      }
      else if (action === 'select' || (isTerminal && action === 'activate')) {
        this.select(item, 'DOM_EVENT');
        if (!this.keepOpen) {
          this.$.dropdown.close();
        }
      }
      else if (action === 'favorite') {
        this._favoritedCop.handleItemTapped(item);
      }
    }
  },

  _getFavoritedItemPath(item) {
    if (item && typeof item === 'object') {
      const path = this._assetGraph.getPath(item);
      let pathArray = [];
      path.forEach(function (element) {
        pathArray.push(element.label);
      });
      return pathArray.slice(0,-1);
    }
    return null;
  },

  _handleHeaderTapped(evt) {
    const path = dom(evt).path;
    const action = this._findActionInPath(path);

    if (typeof action !== 'string' || action.length > 0) {
      switch(action) {
        case 'back':
          // if activeParent is `null`, the root will be activated
          this.activate(this.activeMeta.parent, 'DOM_EVENT');
          break;
        case 'select':
          this.select(this.active, 'DOM_EVENT');
          if(!this.keepOpen) {
            this.$.dropdown.close();
          }
          break;
        case 'favorite':
          if (Array.isArray(this.favorited) && this.favorited.indexOf(this.active) === -1) {
            this.favorite(this.active, 'DOM_EVENT');
          } else {
            this.defavorite(this.active, 'DOM_EVENT');
          }
          break;
      }
    }
  },

  _findActionInPath(path) {
    let action;
    for (let i=0; i<path.length; i++) {
      if (path[i] instanceof Node && path[i].hasAttribute && path[i].hasAttribute('asset-action')) {
        action = path[i].getAttribute('asset-action');
        break;
      }
    }
    return action;
  },

  // ********************************************************************** //
  // Helpers to get values for binding to properties/attributes in template
  // ********************************************************************** //

  _isItemSelected(item, selected) {
    return typeof selected === 'object' && selected === item;
  },

  _isItemFavorited(item, favorited) {
    return typeof favorited === 'object' && Array.isArray(favorited) && favorited.indexOf(item) > -1;
  },

  _isItemVisible(item) {
    return item.visible === true;
  },

  _isItemOpenable(canOpen, item) {
    return canOpen && !this._assetGraph.isTerminal(item);
  },

  _isItemSelectable(item) {
    return item && this._assetGraph.isSelectable(item);
  },

  _isItemFavoritable(item) {
    return item && this._assetGraph.isSelectable(item);
  },

  _isNotNull(val) {
    return (typeof val !== 'undefined' && val !== null);
  },

  _showFavoritedAndItemFavoritable(showFavorited, item) {
    return showFavorited && this._isItemFavoritable(item);
  },

  _showFavoritedEmptyState(favorited) {
    return (!favorited || !Array.isArray(favorited) || favorited.length === 0);
  },

  /**
   * Fetches an item's property at the configured key. Used to dynamically
   * fetch the item's label, icon, children, etc. based on the configured
   * `keys` for the app.
   */
  _getItemProp(item, key) {
    if (item && typeof item === 'object' && typeof key === 'string' && item.hasOwnProperty(key)) {
      return item[key];
    }
    return null;
  }
});

/*
 * Object.assign polyfill for IE11. Will only be used if `Object.assign` does
 * not already exist on the window (e.g. won't overwrite globals if it
 * does not need to).
 *
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 *
 * The following license applies only to the Object.assign polyfill code below.
 *
 * Copyright 2015 sjohnsonaz (MDN contributor)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
if (typeof Object.assign != 'function') {
  Object.assign = function(target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}