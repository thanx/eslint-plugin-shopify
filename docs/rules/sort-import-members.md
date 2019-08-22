# Enforce sorted members with import declarations. (sort-import-members)

## Rule Details

This rule accepts one option that toggles case-sensitivty.

### `ignoreCase`

Ingores case when sorting. Optional, defaults to `true`.

With `{ignoreCase: true}`, the following patterns are considered warnings:

```js
import {c, a, b} from "foo";
import {B, D, a, c} from "foo";
import {a, c, B, D} from "foo";
```

With `{ignoreCase: true}`, the following patterns are not considered warnings:

```js
import {a, b, c} from "foo";
import {a, B, c, D} from "foo";
import {A, a, Z, z} from "foo";
```

With `{ignoreCase: false}`, the following patterns are considered warnings:

```js
import {a, B, c, D} from "foo";
import {a, c, B, D} from "foo";
import {a, A, z, Z} from "foo";
```

With `{ignoreCase: false}`, the following patterns are not considered warnings:

```js
import {B, D, a, c} from "foo";
import {A, Z, a, z} from "foo";
```
