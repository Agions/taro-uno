export default {
  // TypeScript 和 JavaScript 文件
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write', 'git add'],

  // 样式文件
  '*.{css,scss,less}': ['prettier --write', 'git add'],

  // JSON 文件
  '*.json': ['prettier --write', 'git add'],

  // Markdown 文件
  '*.md': ['prettier --write', 'git add'],

  // YAML 文件
  '*.{yml,yaml}': ['prettier --write', 'git add'],

  // 包文件
  'package.json': ['prettier --write', 'git add'],
};
