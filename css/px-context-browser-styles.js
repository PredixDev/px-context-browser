const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="px-context-browser-styles">
<template>
<style>
@charset "UTF-8";/*! normalize.css v3.0.2 | MIT License | git.io/normalize */.heading--subsection,.label{text-transform:uppercase;letter-spacing:var(--px-headings-letter-spacing,.3px)}html{background-color:var(--px-base-background-color,#fff);font-size:15px;overflow-y:scroll;min-height:100%;box-sizing:border-box}:host,html{color:var(--px-base-text-color,#2c404c);line-height:1.33333;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased}body,figure{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}address,blockquote,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,ol,p,pre,table,ul{margin-bottom:1rem}li>ol,li>ul{margin-bottom:0}dd,ol,ul{margin-left:2rem}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}hr{box-sizing:content-box;height:0}pre{overflow:auto}*,:after,:before{box-sizing:inherit}:host{/*! Comment to prevent cssmin munging this rule with html above and borking Safari */box-sizing:border-box}.alpha{font-size:5rem;line-height:1.06667;font-weight:400}.beta{font-size:4rem;line-height:1;font-weight:400}.delta,.gamma{line-height:1.33333;font-weight:400}.gamma{font-size:3rem}.delta{font-size:2rem}.epsilon{font-size:1.33333rem;line-height:1;font-weight:400}.zeta{font-size:.8rem;line-height:1.66667;font-weight:400}.heading--page{font-size:2rem;line-height:1.33333;color:var(--px-headings-heading-page-color,#2c404c)}.heading--section{font-size:1.33333rem;line-height:1;color:var(--px-headings-heading-section-color,#677e8c);text-transform:uppercase}.heading--subsection{font-size:1rem;line-height:1.33333;color:var(--px-headings-heading-subsection-color,#2c404c);background-color:var(--px-headings-heading-subsection-background,rgba(136,154,165,.15));display:flex;padding-left:5px;padding-right:5px}.label{font-size:.8rem;line-height:1.66667;color:var(--px-headings-label-color,#677e8c)}.value{font-size:1rem;line-height:1.33333;color:var(--px-headings-value-color,#2c404c)}:host([collapsed]) .backdrop{position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.65);opacity:0;transition:opacity .2s ease;z-index:-1}:host([collapsed]) .backdrop[visible]{opacity:1}:host([collapsed]) px-context-browser-panel{position:relative;z-index:2}.column{display:block;position:absolute;left:0;top:0;width:100%;height:100%;overflow-y:hidden}.column.active{overflow-y:auto}.column.animating{overflow-y:hidden}px-context-browser-columns{display:block;position:relative;overflow:hidden;min-height:30px;transition:min-height 350ms;padding-top:1px}:host([favorited-opened]) px-context-browser-columns{min-height:60px}px-context-browser-columns[visible-count]{min-height:301px}px-context-browser-columns[visible-count="1"]{min-height:31px}px-context-browser-columns[visible-count="2"]{min-height:61px}px-context-browser-columns[visible-count="3"]{min-height:91px}px-context-browser-columns[visible-count="4"]{min-height:121px}px-context-browser-columns[visible-count="5"]{min-height:151px}px-context-browser-columns[visible-count="6"]{min-height:181px}px-context-browser-columns[visible-count="7"]{min-height:211px}px-context-browser-columns[visible-count="8"]{min-height:241px}px-context-browser-columns[visible-count="9"]{min-height:271px}:host([favorited-opened]) px-context-browser-columns[visible-count]{min-height:601px}:host([favorited-opened]) px-context-browser-columns[visible-count="1"]{min-height:61px}:host([favorited-opened]) px-context-browser-columns[visible-count="2"]{min-height:121px}:host([favorited-opened]) px-context-browser-columns[visible-count="3"]{min-height:181px}:host([favorited-opened]) px-context-browser-columns[visible-count="4"]{min-height:241px}:host([favorited-opened]) px-context-browser-columns[visible-count="5"]{min-height:301px}:host([favorited-opened]) px-context-browser-columns[visible-count="6"]{min-height:361px}:host([favorited-opened]) px-context-browser-columns[visible-count="7"]{min-height:421px}:host([favorited-opened]) px-context-browser-columns[visible-count="8"]{min-height:481px}:host([favorited-opened]) px-context-browser-columns[visible-count="9"]{min-height:541px}px-context-browser-columns[collapsed],px-context-browser-columns[collapsed][visible-count="*"],px-context-browser-columns[collapsed][visible-count]{min-height:auto;flex:1 1 auto}.context-browser-favorites--empty__container{display:flex;flex-direction:column;align-items:center;justify-content:center;max-width:80%;margin-left:auto;margin-right:auto;height:22.66667rem}.context-browser-favorites--empty__text{color:var(--px-context-browser-item-text-color,#000);margin-bottom:.66667rem;text-align:center}.context-browser-favorites--empty__subtext{color:var(--px-context-browser-item-breadcrumbs-color,gray);line-height:.8rem;text-align:center;max-width:100%}.context-browser-favorites--empty__icon{margin-bottom:2rem;--iron-icon-height:4.66667rem;--iron-icon-width:4.66667rem;--iron-icon-fill-color:var(--px-context-browser-empty-favorites-icon-color, whitesmoke);--iron-icon-stroke-color:var(--px-context-browser-empty-favorites-icon-stroke-color, lightgray);stroke-width:.03333rem}
</style>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;