import { syntaxTree } from '@codemirror/language';

const tagOptions = [
  'constructor',
  'deprecated',
  'link',
  'param',
  'returns',
  'type',
].map((tag) => ({ label: '@' + tag, type: 'keyword' }));

export function completeJSDoc(context) {
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (
    nodeBefore.name != 'BlockComment' ||
    context.state.sliceDoc(nodeBefore.from, nodeBefore.from + 3) != '/**'
  )
    return null;
  let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos);
  let tagBefore = /@\w*$/.exec(textBefore);
  if (!tagBefore && !context.explicit) return null;
  return {
    from: tagBefore ? nodeBefore.from + tagBefore.index : context.pos,
    options: tagOptions,
    validFor: /^(@\w*)?$/,
  };
}
