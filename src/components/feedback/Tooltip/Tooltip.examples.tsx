import { useState, useRef } from 'react';
import { Tooltip } from './Tooltip';

/**
 * Tooltip 使用示例
 * 展示各种 Tooltip 的使用方式和功能特性
 */

export const TooltipExamples = () => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef < any > (null);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Tooltip 组件示例</h1>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">基础用法</h2>
        <div className="flex space-x-4">
          <Tooltip title="这是一个基础的 Tooltip">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">悬停我</button>
          </Tooltip>

          <Tooltip title="支持 ReactNode" defaultVisible>
            <button className="px-4 py-2 bg-green-500 text-white rounded">默认显示</button>
          </Tooltip>
        </div>
      </section>

      {/* 触发方式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">触发方式</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Tooltip title="鼠标悬停触发" trigger="hover">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover</button>
          </Tooltip>

          <Tooltip title="点击触发" trigger="click">
            <button className="px-4 py-2 bg-green-500 text-white rounded">Click</button>
          </Tooltip>

          <Tooltip title="聚焦触发" trigger="focus">
            <button className="px-4 py-2 bg-purple-500 text-white rounded">Focus</button>
          </Tooltip>

          <Tooltip title="右键触发" trigger="contextMenu">
            <button className="px-4 py-2 bg-orange-500 text-white rounded">右键</button>
          </Tooltip>
        </div>
      </section>

      {/* 位置展示 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">位置展示</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
          <div className="flex justify-center">
            <Tooltip title="上左" placement="topLeft">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">上左</button>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <Tooltip title="上" placement="top">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">上</button>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <Tooltip title="上右" placement="topRight">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">上右</button>
            </Tooltip>
          </div>

          <div className="flex justify-center">
            <Tooltip title="左" placement="left">
              <button className="px-4 py-2 bg-green-500 text-white rounded">左</button>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <Tooltip title="右" placement="right">
              <button className="px-4 py-2 bg-green-500 text-white rounded">右</button>
            </Tooltip>
          </div>

          <div className="flex justify-center">
            <Tooltip title="下左" placement="bottomLeft">
              <button className="px-4 py-2 bg-purple-500 text-white rounded">下左</button>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <Tooltip title="下" placement="bottom">
              <button className="px-4 py-2 bg-purple-500 text-white rounded">下</button>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <Tooltip title="下右" placement="bottomRight">
              <button className="px-4 py-2 bg-purple-500 text-white rounded">下右</button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* 主题展示 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">主题展示</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Tooltip title="浅色主题" theme="light">
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded">Light</button>
          </Tooltip>

          <Tooltip title="深色主题" theme="dark">
            <button className="px-4 py-2 bg-gray-800 text-white rounded">Dark</button>
          </Tooltip>

          <Tooltip title="主色主题" theme="primary">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Primary</button>
          </Tooltip>

          <Tooltip title="成功主题" theme="success">
            <button className="px-4 py-2 bg-green-500 text-white rounded">Success</button>
          </Tooltip>

          <Tooltip title="警告主题" theme="warning">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded">Warning</button>
          </Tooltip>

          <Tooltip title="错误主题" theme="error">
            <button className="px-4 py-2 bg-red-500 text-white rounded">Error</button>
          </Tooltip>

          <Tooltip title="信息主题" theme="info">
            <button className="px-4 py-2 bg-cyan-500 text-white rounded">Info</button>
          </Tooltip>
        </div>
      </section>

      {/* 动画效果 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">动画效果</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Tooltip title="淡入淡出" animation="fade">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Fade</button>
          </Tooltip>

          <Tooltip title="缩放" animation="scale">
            <button className="px-4 py-2 bg-green-500 text-white rounded">Scale</button>
          </Tooltip>

          <Tooltip title="滑动" animation="slide">
            <button className="px-4 py-2 bg-purple-500 text-white rounded">Slide</button>
          </Tooltip>

          <Tooltip title="无动画" animation="none">
            <button className="px-4 py-2 bg-gray-500 text-white rounded">None</button>
          </Tooltip>
        </div>
      </section>

      {/* 高级功能 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">高级功能</h2>

        {/* 延迟显示 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">延迟显示/隐藏</h3>
          <div className="flex space-x-4">
            <Tooltip title="延迟 500ms 显示" showDelay={500}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">延迟显示</button>
            </Tooltip>

            <Tooltip title="延迟 300ms 隐藏" hideDelay={300}>
              <button className="px-4 py-2 bg-green-500 text-white rounded">延迟隐藏</button>
            </Tooltip>
          </div>
        </div>

        {/* 受控模式 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">受控模式</h3>
          <div className="flex items-center space-x-4">
            <Tooltip title="受控 Tooltip" visible={visible}>
              <button className="px-4 py-2 bg-purple-500 text-white rounded">受控模式</button>
            </Tooltip>
            <button
              onClick={() => setVisible(!visible)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              {visible ? '隐藏' : '显示'}
            </button>
          </div>
        </div>

        {/* 自定义样式 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">自定义样式</h3>
          <div className="flex space-x-4">
            <Tooltip
              title="自定义样式"
              popupStyle={{
                backgroundColor: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                color: 'white',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded">自定义样式</button>
            </Tooltip>

            <Tooltip
              title="自定义箭头"
              arrow
              popupStyle={{
                backgroundColor: '#ff6b6b',
                color: 'white'
              }}
            >
              <button className="px-4 py-2 bg-green-500 text-white rounded">自定义箭头</button>
            </Tooltip>
          </div>
        </div>

        {/* 复杂内容 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">复杂内容</h3>
          <div className="flex space-x-4">
            <Tooltip
              title={
                <div className="space-y-2">
                  <h4 className="font-bold">用户信息</h4>
                  <p>姓名：张三</p>
                  <p>职位：前端工程师</p>
                  <p>邮箱：zhangsan@example.com</p>
                </div>
              }
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded">用户信息</button>
            </Tooltip>

            <Tooltip
              title={
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>操作成功！</span>
                </div>
              }
              theme="success"
            >
              <button className="px-4 py-2 bg-green-500 text-white rounded">成功提示</button>
            </Tooltip>
          </div>
        </div>

        {/* 禁用状态 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">禁用状态</h3>
          <div className="flex space-x-4">
            <Tooltip title="已禁用" disabled>
              <button className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">禁用按钮</button>
            </Tooltip>
          </div>
        </div>

        {/* 嵌套触发 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">嵌套触发</h3>
          <div className="flex space-x-4">
            <Tooltip title="外层 Tooltip" nested>
              <div className="p-4 bg-blue-100 rounded">
                <Tooltip title="内层 Tooltip" nested>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">嵌套按钮</button>
                </Tooltip>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* 最大宽度 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">最大宽度</h3>
          <div className="flex space-x-4">
            <Tooltip
              title="这是一个很长的提示内容，用于测试最大宽度的效果。当内容超过最大宽度时，文本会自动换行显示。"
              maxWidth={200}
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded">最大宽度 200px</button>
            </Tooltip>

            <Tooltip
              title="这是一个很长的提示内容，用于测试最大宽度的效果。当内容超过最大宽度时，文本会自动换行显示。"
              maxWidth={300}
            >
              <button className="px-4 py-2 bg-green-500 text-white rounded">最大宽度 300px</button>
            </Tooltip>
          </div>
        </div>

        {/* 偏移量 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">偏移量</h3>
          <div className="flex space-x-4">
            <Tooltip
              title="偏移量 [10, 10]"
              offset={[10, 10]}
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded">偏移 10px</button>
            </Tooltip>

            <Tooltip
              title="偏移量 [20, -10]"
              offset={[20, -10]}
            >
              <button className="px-4 py-2 bg-green-500 text-white rounded">偏移 20px</button>
            </Tooltip>
          </div>
        </div>

        {/* 无包裹模式 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">无包裹模式</h3>
          <div className="flex space-x-4">
            <Tooltip title="不包裹子元素" wrap={false}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">无包裹</button>
            </Tooltip>
          </div>
        </div>

        {/* API 调用 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">API 调用</h3>
          <div className="flex space-x-4">
            <Tooltip
              title="可通过 ref 调用"
              ref={tooltipRef}
            >
              <button className="px-4 py-2 bg-purple-500 text-white rounded">API 控制</button>
            </Tooltip>

            <button
              onClick={() => tooltipRef.current?.show()}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              显示
            </button>

            <button
              onClick={() => tooltipRef.current?.hide()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              隐藏
            </button>

            <button
              onClick={() => tooltipRef.current?.toggle()}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              切换
            </button>
          </div>
        </div>
      </section>

      {/* 实际应用场景 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">实际应用场景</h2>

        {/* 表单提示 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">表单提示</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="w-24">用户名：</label>
              <input
                type="text"
                className="px-3 py-2 border rounded"
                placeholder="请输入用户名"
              />
              <Tooltip title="用户名长度应为 3-20 个字符">
                <span className="text-gray-400 cursor-help">?</span>
              </Tooltip>
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-24">密码：</label>
              <input
                type="password"
                className="px-3 py-2 border rounded"
                placeholder="请输入密码"
              />
              <Tooltip title="密码应包含字母、数字和特殊字符">
                <span className="text-gray-400 cursor-help">?</span>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">操作按钮</h3>
          <div className="flex space-x-4">
            <Tooltip title="保存数据">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">保存</button>
            </Tooltip>

            <Tooltip title="取消操作">
              <button className="px-4 py-2 bg-gray-500 text-white rounded">取消</button>
            </Tooltip>

            <Tooltip title="删除数据，此操作不可恢复">
              <button className="px-4 py-2 bg-red-500 text-white rounded">删除</button>
            </Tooltip>
          </div>
        </div>

        {/* 状态指示 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">状态指示</h3>
          <div className="flex space-x-4">
            <Tooltip title="在线">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            </Tooltip>

            <Tooltip title="离线">
              <span className="w-4 h-4 bg-gray-500 rounded-full"></span>
            </Tooltip>

            <Tooltip title="忙碌">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            </Tooltip>

            <Tooltip title="离开">
              <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
            </Tooltip>
          </div>
        </div>

        {/* 链接提示 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">链接提示</h3>
          <div className="flex space-x-4">
            <Tooltip title="访问官方网站">
              <a href="#" className="text-blue-500 underline">官方网站</a>
            </Tooltip>

            <Tooltip title="查看文档">
              <a href="#" className="text-blue-500 underline">文档</a>
            </Tooltip>

            <Tooltip title="提交问题">
              <a href="#" className="text-blue-500 underline">问题反馈</a>
            </Tooltip>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TooltipExamples;
