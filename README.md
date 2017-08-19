# Ember-Router-Helpers (alpha)

This addon provides a set of helpers that internally use the new new public Router service (https://github.com/emberjs/rfcs/blob/84f5239100d2c6d20cb74382ba7eedfc5fa3b8b4/text/0000-router-service.md), either directly or via polyfill (https://github.com/rwjblue/ember-router-service-polyfill).

Check out ember-href-to, if you need alternative to link-to, that is actually battle-tested.
https://github.com/intercom/ember-href-to

Simplest usage

```hbs
<a href={{url-for "world"}} onclick={{transition-to}}>World</a>
```

With is-active and with
(checking for active route by URL is super naive ATM)
```hbs
{{#with (url-for "world") as |url|}}
  <a
    class={{if (is-active url) "active"}}
    href={{url}} onclick={{transition-to}}>
    World
  </a>
{{/with}}
```

Explicit usage (with replace)
```hbs
<a
  class={{if (is-active "world" (query-params nightMode=true)) "active"}}
  onclick={{transition-to "world" (query-params nightMode=true) replace=true}}>
  World
</a>
```

<s>Explicit usage + with helper</s> (TODO, does not work so far)
```hbs
{{#with (array "world" (query-params nightMode=true) as |params|)}}
  <a
    href={{url-for params}}
    class={{if (is-active params) "active"}}
    onclick={{transition-to params}}>
    World
  </a>
{{/with}}
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-router-helpers`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
