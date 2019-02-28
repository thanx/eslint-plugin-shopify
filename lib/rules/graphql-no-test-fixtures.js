const {docsUrl} = require('../utilities');

module.exports = {
  meta: {
    docs: {
      description:
        'Disallows the use of graphql fixtures in tests as mock data',
      category: 'Best Practices',
      recommended: false,
      uri: docsUrl('graphql-no-test-fixtures'),
    },
    fixable: null,
  },
  create(context) {
    function checkNode(node) {
      if (!node.source || !node.source.value) {
        return;
      }

      if (node.source.type === 'Literal') {
        const importedPath = node.source.value;

        const usesGraphqlFixtures =
          importedPath.startsWith('./fixtures/') &&
          importedPath.endsWith('.json');

        if (usesGraphqlFixtures) {
          context.report({
            node,
            message: `Prefer using fillGraphQL to mock GraphQL data instead of graphql fixtures. See docs, {{docs}}`,
            data: {
              docs:
                'https://github.com/Shopify/web-foundation/blob/master/Best%20practices/GraphQL/Testing.md#mock-data',
            },
          });
        }
      }
    }
    return {
      ImportDeclaration: checkNode,
    };
  },
};
