# Disallows the use of graphql fixtures in tests as mock data

Historically, we have used fixtures to mock GraphQL data in tests. Moving forward, we prefer factories over fixtures for supplying this data, as noted in our [Decision records](https://github.com/Shopify/web-foundation/blob/master/Decision%20records/07%20-%20We%20use%20factories%20instead%20of%20fixtures%20for%20GraphQL%20tests.md).

When providing mock data for [GraphQL testing](https://github.com/Shopify/web-foundation/blob/master/Best%20practices/GraphQL/Testing.md#mock-data), we suggest using a `fillGraphQL` utility which can be created using our [graphql-fixtures](https://github.com/Shopify/graphql-tools-web/tree/master/packages/graphql-fixtures) package.

## Rule Details

The following patterns are considered warnings:

```js
import fixtureQueryThing from './fixtures/SomeQuery/basic.json';
import fixtureFragmentThing from './fixtures/SomeFragment/basic.json';
```

The following patterns are not warnings:

```js
import productThingQuery from '../graphql/ProductThingQuery.graphql';
```
