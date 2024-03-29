import TurndownService from 'turndown';
import { strikethrough } from 'turndown-plugin-gfm';

/**
 * remark의 inverse를 활용해볼 것
 *
 * https://unifiedjs.com/learn/recipe/remark-html/#how-to-turn-html-into-markdown
 */

/**
 * FIXME: table에 대해 동작에 이상동작을 함
 *
 * table에 thead 혹은 th가 없기 때문
 * 이는 head없는 table을 markdown에서 허용치 않음에도
 * blockNote에서 head없는 table을 만들기 때문.
 * 이를 해결하기 위해선 thead를 허용하는 table spec을 만들어줄 필요가 있음
 * 급한 사안이 아니기 때문에 일단 table 사용을 막고, 이후 table을 직접 구현하던, 업데이트된 table을 이용하던 해야함
 *
 * 이후 turndown-plugin-gfm를 이용해 markdown 파싱을 할 것
 */

// TODO: 아래 플러그인들 파일 분리하기
function underline(turndownService) {
  turndownService.addRule('underline', {
    filter: ['ins', 'u'],
    replacement: function (content) {
      return `<u>${content}</u>`;
    },
  });
}

function figure(turndownService) {
  turndownService.addRule('figure', {
    filter: ['figure'],
    replacement: function (content, node) {
      const img = node.querySelector('img');
      const figcaption = node.querySelector('figcaption');

      if (img) {
        const filename = img.getAttribute('alt');
        const caption = figcaption?.textContent || filename;
        return `![${caption}](./images/${filename})\n`;
      }

      return content;
    },
  });
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  fence: '```',
  linkStyle: 'inlined',
  codeBlockStyle: 'fenced',
  blankReplacement: (_, node) => {
    if (node.tagName === 'P') return '<p></p>\n';
    return '';
  },
});

turndownService.use([strikethrough, underline, figure]);
turndownService.addRule('image', {
  filter: ['img'],
  replacement(_, node) {
    const alt = node.alt;
    const src = node.getAttribute('src');

    return `![${alt}](${src})`;
  },
});

export async function htmlToMarkdown(html) {
  return turndownService.turndown(html);
}
