const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/graphql-no-test-fixtures');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});
const docLink =
  'https://github.com/Shopify/web-foundation/blob/master/Best%20practices/GraphQL/Testing.md#mock-data';

function errors(type) {
  return [
    {
      type,
      message: `Prefer using fillGraphQL to mock GraphQL data instead of graphql fixtures. See docs, ${docLink}`,
    },
  ];
}

ruleTester.run('graphql-no-test-fixtures', rule, {
  valid: [
    {code: `import {foo} from './index'`},
    {code: `import thing from '../../ParentThing';`},
    {code: `import {thing} from 'some-cool-package';`},
    {
      code: `import DefaultCoolThing, {
      COOL_CONSTANT_THING,
      coolQueryThing,
    } from '../WhereTheCoolThingsAre';`,
    },
  ],

  invalid: [
    {
      code: `import foo from './fixtures/foo.json';`,
      errors: errors('ImportDeclaration'),
    },
    {
      code: `import collectionsThing from './fixtures/CollectionPickerThing/collections-2.json';`,
      errors: errors('ImportDeclaration'),
    },
    {
      code: `import hypens from './fixtures/HypensQuery/lots-of-hypen-things.json';`,
      errors: errors('ImportDeclaration'),
    },
    {
      code: `import hyphenatedPath from './fixtures/path-that-should-not-be-hypens/lots-of-hypen-things.json';`,
      errors: errors('ImportDeclaration'),
    },
  ],
});
