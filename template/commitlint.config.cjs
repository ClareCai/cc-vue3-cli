/**
 * feat：新增功能
 * fix：修复缺陷
 * docs：文档更新
 * style：不影响程序逻辑的代码修改（修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑）
 * refactor：代码重构
 * perf：性能提升
 * test：测试相关
 * build：构建相关
 * ci：持续集成
 * chore：不属于以上类型的其他类型，比如构建流程, 依赖管理
 * revert：回退代码
 */
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'release',
      ],
    ],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit (y/n)?',
    },
    types: [
      { value: 'feat', name: '特性:  🚀  新增功能', emoji: '🚀' },
      { value: 'fix', name: '修复:  🧩  修复缺陷', emoji: '🧩' },
      { value: 'docs', name: '文档:  📝  文档变更', emoji: '📝' },
      {
        value: 'style',
        name: '格式:  🎨  代码格式（不影响功能，例如空格、分号等格式修正）',
        emoji: '🎨',
      },
      {
        value: 'refactor',
        name: '重构:  ♻️  代码重构（不包括 bug 修复、功能新增）',
        emoji: '♻️',
      },
      { value: 'perf', name: '性能:  ⚡️  性能优化', emoji: '⚡️' },
      {
        value: 'test',
        name: '测试:  ✅  添加疏漏测试或已有测试改动',
        emoji: '✅',
      },
      {
        value: 'build',
        name: '构建:  📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）',
        emoji: '📦️',
      },
      { value: 'ci', name: '集成:  🎡  修改 CI 配置、脚本', emoji: '🎡' },
      { value: 'revert', name: '回退:  ⏪️  回滚 commit', emoji: '⏪️' },
      {
        value: 'chore',
        name: '其他:  🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
        emoji: '🔨',
      },
    ],
    // scope 类型，针对 vue 项目
    scopes: [
      { value: 'view', name: 'view 视图页面相关' },
      { value: 'components', name: 'components 组件相关' },
      { value: 'styles', name: 'styles 样式相关' },
      { value: 'utils', name: 'utils 工具类相关' },
      { value: 'auth', name: 'auth 权限相关' },
      { value: 'logger', name: 'logger 日志相关' },
      { value: 'deps', name: 'deps 依赖相关' },
      { value: 'hooks', name: 'hooks hooks相关' },
      { value: 'other', name: 'other 其他修改' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
    allowBreakingChanges: false,
    issuePrefixes: [{ value: '关联 task/bug id: ', name: '关联 task/bug id: ' }],
  },
};
