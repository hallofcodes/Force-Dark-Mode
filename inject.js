/*
*
* Copyright (c) 2021 Melvin Jones Repol (mrepol742.github.io). All rights reserved.
*
* License under the GNU General Public License, Version 3.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://www.gnu.org/licenses/gpl-3.0.en.html
*
* Unless required by the applicable law or agreed in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

javascript: (
    function () { 
        var css = 'html {-webkit-filter: invert(100%);' +
                  '-moz-filter: invert(100%);' + 
                  '-o-filter: invert(100%);' + 
                  '-ms-filter: invert(100%);}' +
                  'img, iframe, video, canvas, svg, picture , .webvium-pictograph-class {-webkit-filter: invert(100%) !important;' +
                  '-moz-filter: invert(100%) !important;' + 
                  '-o-filter: invert(100%) !important;' + 
                  '-ms-filter: invert(100%) !important;}',
        head = document.getElementsByTagName('head')[0], style = document.createElement('style') , body = document.getElementsByTagName('body')[0];
        if (!window.counter) { 
            window.counter = 1;
        } else { 
            window.counter ++;
            if (window.counter % 2 == 0) { 
                var css = 'html {-webkit-filter: invert(0%); -moz-filter: invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }' +
                    'img, iframe, video, canvas, svg, picture , .webvium-pictograph-class {-webkit-filter: invert(0%) !important; -moz-filter: invert(0%) !important; -o-filter: invert(0%) !important; -ms-filter: invert(0%) !important;}'
            }
        };
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        function rewriteString (string) {
            const regex = /\p{Extended_Pictographic}/ug;
            
            const indexes = [];
            const match = string.match(regex);
            if(match) {
                const matchLength = match.length;
                
                const newString = Array.from(string);
                
                while(indexes.length < matchLength ) {
                    if(indexes.length === 0) {
                        indexes.push(string.search(regex));
                    }
                    else {
                        indexes.push(string.substring(indexes[indexes.length - 1] + 1).search(regex) + indexes[indexes.length - 1] + 1);
                    }
                }
                for(let i = 0; i < matchLength; i++) {
                    newString[indexes[i]] = `<span class="webvium-pictograph-class">${match[i]}</span>`;
                }
                return newString.join("")
            }
            else {
                return string
            }
        }
        body.innerHTML = rewriteString(body.innerHTML);
    }
());
