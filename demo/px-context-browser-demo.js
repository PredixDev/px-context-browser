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
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set.js';
import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-context-browser.js';
import '../px-context-browser-trigger.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
Polymer({
  _template: html`
    <style>
      .triggers {
        display: flex;
      }
    </style>

    <!-- Header -->
    <px-demo-header module-name="px-context-browser" description="The context browser allows the user to drill down through a hierarchical menu in order to switch the context of the overall view. Examples of possible contexts include specific locations organized geographically, physical assets organized by model or other classification, or employees organized by department or function. When a user clicks on the title or arrow, the expanded view of the context browser covers cards and other content on the page. Selecting an item in the context browser causes the children of that item to show up in the next panel over, and also causes a button to appear within that selected row that allows the user to submit/save that context, which also re-collapses the browser." desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}" config="[[chosenConfig]]"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component" style="display:flex; width:600px">
        <div>
          <div class="triggers">
            <px-context-browser-trigger trigger="{{openTrigger}}"></px-context-browser-trigger>

            <template is="dom-if" if="[[props.showFavorited.value]]" restamp="">
              <px-context-browser-trigger trigger="{{favoritedTrigger}}" favorited=""></px-context-browser-trigger>
            </template>
          </div>

          <px-context-browser open-trigger="[[openTrigger]]" favorited-trigger="[[favoritedTrigger]]" opened="{{props.opened.value}}" keep-open="{{props.keepOpen.value}}" items="{{props.items.value}}" selected-route="{{props.selectedRoute.value}}" filter="{{props.filter.value}}" show-filter="[[props.showFilter.value]]" show-arrow="[[props.showArrow.value]]" show-favorited="[[props.showFavorited.value]]" collapsed="[[props.collapsed.value]]" collapse-at="[[props.collapseAt.value]]" loading-timeout="[[props.loadingTimeout.value]]" selected="{{data}}"></px-context-browser>
        </div>
        <div style="flex: auto; border: 1px solid #D8E0E5; padding-left: 15px; margin-left: 20px;">
          <p><strong>Selected item:</strong> {{data.label}}</p>
          <p><strong>Item info:</strong> {{data.info}}</p>
          <p class="caps">(For demo purposes only)</p>
        </div>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-context-browser">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-context-browser" hide="[[apiHide]]" api-source-file-path="px-context-browser/px-context-browser-api.json">
    </px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-context-browser-demo',

  properties: {
    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "Basic",
            configReset: true
          },
          { configName: "Advanced",
            configReset: true,
            opened: false,
            selectedRoute: ["alerts"],
            showFilter: true,
            showArrow: true,
            collapseAt: 600,
            loadingTimeout: 7000
          },
          { configName: "Favorites",
            configReset: true,
            opened: false,
            showFavorited: true,
            items: [{"id":"us","label":"United States","children":[{"id":"calif","label":"California","children":[{"id":"los-angeles","label":"Los Angeles"},{"id":"san-francisco","label":"San Francisco","children":[{"id":"mission","label":"The Mission", "children":[{"id":"valencia","label":"Valencia St."}]},{"id":"noe-valley","label":"Noe Valley"},{"id":"castro","label":"The Castro"}]},{"id":"oakland","label":"Oakland","children":[{"id":"adams-point","label":"Adams Point", "children":[{"id":"perkins", "label":"Perkins St"}, {"id":"lee", "label":"Lee St"}]},{"id":"temescal","label":"Temescal"}]}]},{"id":"mass","label":"Massachusetts","children":[{"id":"boston","label":"Boston","children":[{"id":"back-bay","label":"Back Bay"},{"id":"south-end","label":"South End"},{"id":"seaport","label":"Seaport"}]},{"id":"cambridge","label":"Cambridge","children":[{"id":"cambridgeport","label":"Cambridgeport"},{"id":"west-cambridge","label":"West Cambridge"},{"id":"riverside","label":"Riverside"}]}]}]}]
          }
        ];
      }
    },

    apiHide: {
      type: Array,
      value: function() {
        return [
          "multiActivate",
          "multiSelect"
        ]
      }
    }
},

  /**
   * A reference for `this.props`. Read the documentation there.
   */
  demoProps: {
    opened: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    keepOpen: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    items: {
      type: Array,
      defaultValue: [
        { "label" : "Home",   "id" : "home" },
        { "label" : "Alerts", "id" : "alerts", "info" : "This is a list of alerts", "children": [
          { "label" : "Alert #1", "id" : "al1", "info" : "Oh no! Your turbine has stopped spinning"},
          { "label" : "Alert #2", "id" : "al2", "info" : "Looks like something is not working"},
          { "label" : "Alert #3", "id" : "al3", "info" : "I am a helpful alert message"},
          { "label" : "Alert #4", "id" : "al4", "info" : "Danger: Something is not right." }
        ] },
        { "label" : "Assets", "id" : "assets", "children": [
          { "label" : "Asset #1", "id" : "a1", "info" : "Here is some information about this asset" },
          { "label" : "Asset #2", "id" : "a2", "info" : "This is a different asset. Here is more information about this asset." }
        ] }
      ],
      inputType: 'code:JSON'
    },
    selectedRoute: {
      type: Array,
      defaultValue: ["assets", "a1"],
      inputType: 'code:JSON'
    },
    filter: {
      type: String,
      inputType: 'text'
    },
    showFilter: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle',
    },
    showArrow: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    showFavorited: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    collapsed: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    collapseAt: {
      type: Number,
      defaultValue: 450,
      inputType: 'number'
    },
    loadingTimeout: {
      type: Number,
      defaultValue: 5000,
      inputType: 'number'
    }
  },

  ready: function() {
    const disableCancelOnOutsideClick = () => {
      const cb = dom(this.root).querySelector('px-context-browser');
      const dropdown = dom(cb.root).querySelector('iron-dropdown');
      dropdown.noCancelOnOutsideClick = true;
    };
    /*
     * In Polymer 2.x, ready can happen before the template is initialized
     * and stamped in the DOM. Wait for first render to disable click.
     * In Polymer 1.x, just disable click right away.
     */
    if (PolymerElement) {
      afterNextRender(this, () => {
        disableCancelOnOutsideClick();
      });
    } else {
      disableCancelOnOutsideClick();
    }
  }
});
