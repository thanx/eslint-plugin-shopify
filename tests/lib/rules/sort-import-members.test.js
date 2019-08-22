const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/sort-import-members');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const importSorted = 'import {a, b, c} from "foo"';
const importUnsorted = 'import {c, a, b} from "foo"';

const importSortedCaseSensitive = 'import {B, D, a, c} from "foo"';
const importUnsortedCaseSensitive = 'import {a, B, c, D} from "foo"';

const importSortedCaseInsensitive = 'import {a, B, c, D} from "foo"';
const importUnsortedCaseInsensitive = 'import {a, c, B, D} from "foo"';

ruleTester.run('sort-import-members', rule, {
  valid: [
    {code: importSorted},
    {code: importSortedCaseSensitive, options: [{ignoreCase: false}]},
    {code: importSortedCaseInsensitive},
    {code: importUnsortedCaseSensitive},
    {code: 'import {A, a, Z, z} from "foo"'},
    {code: 'import {A, Z, a, z} from "foo"', options: [{ignoreCase: false}]},
  ],
  invalid: [
    {
      code: importUnsorted,
      output: importSorted,
      errors: [
        {
          message:
            'Member "a" of the import declaration should be sorted alphabetically.',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: importSortedCaseSensitive,
      output: importSortedCaseInsensitive,
      errors: [
        {
          message:
            'Member "a" of the import declaration should be sorted alphabetically.',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: importSortedCaseInsensitive,
      output: importSortedCaseSensitive,
      options: [{ignoreCase: false}],
      errors: [
        {
          message:
            'Member "B" of the import declaration should be sorted alphabetically.',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: importUnsortedCaseSensitive,
      output: importSortedCaseSensitive,
      options: [{ignoreCase: false}],
      errors: [
        {
          message:
            'Member "B" of the import declaration should be sorted alphabetically.',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: importUnsortedCaseInsensitive,
      output: importSortedCaseInsensitive,
      errors: [
        {
          message:
            'Member "B" of the import declaration should be sorted alphabetically.',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: 'import {a, A, z, Z} from "foo"',
      options: [{ignoreCase: false}],
      output: 'import {A, Z, a, z} from "foo"',
      errors: [
        {
          message:
            'Member "A" of the import declaration should be sorted alphabetically.',
          type: 'ImportSpecifier',
        },
      ],
    },
  ],
});
