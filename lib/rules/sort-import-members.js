const {docsUrl} = require('../utilities');

module.exports = {
  meta: {
    docs: {
      description: 'Enforce sorted members with import declarations',
      type: 'suggestion',
      recommended: false,
      url: docsUrl('sort-import-members'),
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          ignoreCase: {
            type: 'boolean',
            default: true,
          },
        },
      },
    ],
  },

  create(context) {
    const config = context.options[0] || {};
    const ignoreCase =
      typeof config.ignoreCase === 'undefined' ? true : config.ignoreCase;
    const sourceCode = context.getSourceCode();

    function checkImportDeclaration(node) {
      const importSpecifiers = node.specifiers.filter(
        (specifier) => specifier.type === 'ImportSpecifier',
      );
      const getSortableName = ignoreCase
        ? (specifier) => specifier.local.name.toLowerCase()
        : (specifier) => specifier.local.name;
      const firstUnsortedIndex = importSpecifiers
        .map(getSortableName)
        .findIndex((name, index, array) => array[index - 1] > name);

      if (firstUnsortedIndex !== -1) {
        context.report({
          node: importSpecifiers[firstUnsortedIndex],
          message:
            'Member "{{memberName}}" of the import declaration should be sorted alphabetically.',
          data: {memberName: importSpecifiers[firstUnsortedIndex].local.name},
          fix(fixer) {
            if (
              importSpecifiers.some(
                (specifier) =>
                  sourceCode.getCommentsBefore(specifier).length ||
                  sourceCode.getCommentsAfter(specifier).length,
              )
            ) {
              // If there are comments in the ImportSpecifier list, don't rearrange the specifiers.
              return null;
            }

            return fixer.replaceTextRange(
              [
                importSpecifiers[0].range[0],
                importSpecifiers[importSpecifiers.length - 1].range[1],
              ],
              importSpecifiers

                // Clone the importSpecifiers array to avoid mutating it
                .slice()

                // Sort the array into the desired order
                .sort((specifierA, specifierB) => {
                  const aName = getSortableName(specifierA);
                  const bName = getSortableName(specifierB);

                  return aName > bName ? 1 : -1;
                })

                // Build a string out of the sorted list of import specifiers and the text between the originals
                .reduce((sourceText, specifier, index) => {
                  const textAfterSpecifier =
                    index === importSpecifiers.length - 1
                      ? ''
                      : sourceCode
                          .getText()
                          .slice(
                            importSpecifiers[index].range[1],
                            importSpecifiers[index + 1].range[0],
                          );

                  return (
                    sourceText +
                    sourceCode.getText(specifier) +
                    textAfterSpecifier
                  );
                }, ''),
            );
          },
        });
      }
    }

    return {
      ImportDeclaration: checkImportDeclaration,
    };
  },
};
