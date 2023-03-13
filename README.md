# Some UserScripts

This repo will assemble some simple UserScripts written for Safari, in particular Safari running the [UserScripts extension by Justin Wasack](https://github.com/quoid/userscripts).

## Notes for myself

- UserScripts checks for the same kind of front-matter at `@updateURL` as is present in a script, so this URL might as well be the same as `@downloadURL`, unless the script becomes very large

### How to... CSS → JS

#### `some-userstyle.css`

```css
/* ==UserStyle==
@name           Some UserStyle
...
==/UserStyle== */

body {
    display: none;
}
```

#### `some-userscript.js`

```js
/* ==UserScript==
@name           Some UserScript
@grant          GM.addStyle
...
==/UserScript== */

(function() {
    GM.addStyle(`
        body {
            display: none;
        }
    `)
}) ();
```

## Related

- [GreasyFork](https://greasyfork.org/en/scripts), a library of UserScripts
- VS Code dev extension, [andywang.vscode-scriptmonkey](https://marketplace.visualstudio.com/items?itemName=andywang.vscode-scriptmonkey)
- Other people's scripts
    - [Mottie](https://github.com/Mottie/GitHub-userscripts)'s for GitHub
