# 常见问题

本页面收集了用户在使用 Taro Uno UI 组件库时可能遇到的常见问题及其解决方案。

## 📦 安装和配置

### Q: 安装 Taro Uno UI 后，组件样式不生效怎么办？

**A:** 请确保在项目入口文件中正确引入了全局样式：

```tsx
// app.tsx 或 app.jsx
import 'taro-uno-ui/dist/style.css';
```

如果仍然有问题，请检查是否正确配置了 Taro 项目的 `esnextModules`：

```javascript
// config/index.js
module.exports = {
  // ...
  h5: {
    esnextModules: ['taro-uno-ui'],
  },
};
```

### Q: 如何在 Taro 3.x 项目中使用 Taro Uno UI？

**A:** Taro Uno UI 支持 Taro 4.x 及以上版本，不兼容 Taro 3.x。请升级 Taro 到最新版本后再使用。

升级 Taro 命令：

```bash
# 使用 npm
npm install -g @tarojs/cli
npm install @tarojs/taro@latest @tarojs/components@latest

# 使用 yarn
yarn global add @tarojs/cli
yarn add @tarojs/taro@latest @tarojs/components@latest
```

### Q: 如何按需引入组件？

**A:** Taro Uno UI 支持按需引入，直接从包中导入所需组件即可：

```tsx
// 按需引入单个组件
import { Button } from 'taro-uno-ui';

// 或直接从组件目录导入
import { Button } from 'taro-uno-ui/button';
```

## 🎨 样式和主题

### Q: 如何自定义组件主题？

**A:** 可以通过 `AppProvider` 组件配置全局主题：

```tsx
import { AppProvider } from 'taro-uno-ui';

const themeConfig = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
  // 其他主题配置...
};

<AppProvider theme={themeConfig}>
  <App />
</AppProvider>;
```

### Q: 如何覆盖单个组件的样式？

**A:** 可以通过以下几种方式覆盖组件样式：

1. 使用 `style` 属性直接设置内联样式：

```tsx
<Button
  type="primary"
  style={{
    backgroundColor: '#ff4d4f',
    borderRadius: '8px',
  }}
>
  自定义按钮
</Button>
```

2. 使用 `className` 属性添加自定义类名：

```tsx
<Button type="primary" className="custom-button">
  自定义按钮
</Button>
```

```css
.custom-button {
  background-color: #ff4d4f;
  border-radius: 8px;
}
```

3. 使用 CSS 变量覆盖主题变量：

```css
:root {
  --primary-color: #ff4d4f;
}
```

### Q: 如何使用暗色主题？

**A:** Taro Uno UI 支持自动跟随系统暗色主题，也可以手动切换：

```tsx
import { useTheme, ThemeProvider } from 'taro-uno-ui';

const { theme, toggleTheme } = useTheme();

<Button onClick={toggleTheme}>
  切换到 {theme === 'light' ? '暗色' : '亮色'} 主题
</Button>
```

## 📱 跨平台兼容

### Q: 某些组件在微信小程序上不显示怎么办？

**A:** 请检查以下几点：

1. 确保已正确配置小程序的 `webpackChain`，添加 Taro Uno UI 到 `esnextModules`：

```javascript
// config/index.js
module.exports = {
  // ...
  mini: {
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/taro-uno-ui/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader'),
                },
              },
            },
          },
        },
      });
    },
  },
};
```

2. 检查组件是否支持微信小程序平台，所有组件的平台支持情况可以在组件文档中查看。

### Q: 如何处理不同平台的差异？

**A:** Taro Uno UI 内部会自动处理大部分平台差异，但某些特定场景可能需要手动处理：

```tsx
import { usePlatform } from 'taro-uno-ui';

const platform = usePlatform();

// 根据不同平台显示不同内容
{platform === 'weapp' ? <WeappComponent /> : <OtherPlatformComponent />}
```

### Q: 如何在 React Native 中使用 Taro Uno UI？

**A:** Taro Uno UI 支持 React Native 平台，但需要额外安装一些依赖：

```bash
# 使用 npm
npm install react-native-web react-native-svg

# 使用 yarn
yarn add react-native-web react-native-svg
```

然后在 `App.js` 中配置：

```javascript
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

## ⚡ 组件使用

### Q: 如何使用组件的自定义事件？

**A:** 所有组件的事件都通过 `on` 前缀的属性传递，例如：

```tsx
<Button onClick={() => console.log('点击了按钮')}>
  按钮
</Button>

<Input onChange={(value) => console.log('输入值：', value)} />
```

### Q: 如何获取表单组件的值？

**A:** 可以通过以下几种方式获取表单组件的值：

1. 使用 `onChange` 事件实时获取：

```tsx
const [value, setValue] = useState('');

<Input onChange={setValue} />
```

2. 使用 `ref` 获取组件实例，然后调用实例方法获取值：

```tsx
const inputRef = useRef(null);

const handleSubmit = () => {
  const value = inputRef.current.getValue();
  console.log('表单值：', value);
};

<Input ref={inputRef} />
<Button onClick={handleSubmit}>提交</Button>
```

3. 使用 `Form` 组件管理多个表单字段：

```tsx
import { Form, Input, Button } from 'taro-uno-ui';

const onFinish = (values) => {
  console.log('表单值：', values);
};

<Form onFinish={onFinish}>
  <Form.Item name="username" label="用户名">
    <Input placeholder="请输入用户名" />
  </Form.Item>
  <Form.Item name="password" label="密码">
    <Input type="password" placeholder="请输入密码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">提交</Button>
  </Form.Item>
</Form>
```

### Q: 如何禁用组件的默认行为？

**A:** 可以通过以下方式禁用组件的默认行为：

1. 使用 `disabled` 属性禁用组件：

```tsx
<Button type="primary" disabled>
  禁用按钮
</Button>
```

2. 使用 `e.preventDefault()` 禁用事件的默认行为：

```tsx
const handleClick = (e) => {
  e.preventDefault();
  // 自定义逻辑
};

<Button onClick={handleClick}>
  自定义按钮
</Button>
```

## 🎨 样式问题

### Q: 如何调整组件的间距？

**A:** 可以使用以下几种方式调整组件间距：

1. 使用 `Space` 组件包裹需要调整间距的组件：

```tsx
import { Space, Button } from 'taro-uno-ui';

<Space size="middle">
  <Button type="primary">按钮 1</Button>
  <Button type="primary">按钮 2</Button>
  <Button type="primary">按钮 3</Button>
</Space>
```

2. 使用 `margin` 样式直接设置：

```tsx
<Button type="primary" style={{ marginRight: '10px' }}>
  按钮 1
</Button>
<Button type="primary">按钮 2</Button>
```

### Q: 如何调整组件的尺寸？

**A:** 可以使用 `size` 属性调整组件尺寸：

```tsx
<Button type="primary" size="small">
  小按钮
</Button>
<Button type="primary" size="middle">
  中按钮
</Button>
<Button type="primary" size="large">
  大按钮
</Button>
```

支持的尺寸值：`xs`、`sm`、`md`、`lg`、`xl`

## 🔧 开发和调试

### Q: 如何查看组件的源码？

**A:** 可以通过以下方式查看组件源码：

1. 在 GitHub 上查看：[https://github.com/agions/taro-uno/tree/main/src/components](https://github.com/agions/taro-uno/tree/main/src/components)

2. 在本地项目的 `node_modules/taro-uno-ui/src` 目录下查看

### Q: 如何调试组件？

**A:** 可以使用以下方式调试组件：

1. 使用 Taro DevTools 调试微信小程序：

```bash
# 启动微信小程序调试
npm run dev:weapp
```

然后在微信开发者工具中打开项目进行调试。

2. 使用浏览器开发者工具调试 H5：

```bash
# 启动 H5 调试
npm run dev:h5
```

然后在浏览器中打开 `http://localhost:10086` 进行调试。

### Q: 如何报告 bug 或请求新功能？

**A:** 可以通过以下方式报告 bug 或请求新功能：

1. 在 GitHub Issues 中提交：[https://github.com/agions/taro-uno/issues](https://github.com/agions/taro-uno/issues)

2. 在 GitHub Discussions 中讨论：[https://github.com/agions/taro-uno/discussions](https://github.com/agions/taro-uno/discussions)

提交 Issue 时，请提供以下信息：

- Taro Uno UI 版本
- Taro 版本
- 平台（微信小程序/H5/React Native）
- 完整的错误信息
- 复现步骤
- 预期结果
- 实际结果

## 🚀 性能优化

### Q: 如何优化长列表性能？

**A:** 对于长列表数据，建议使用 `VirtualList` 组件，它可以只渲染可见区域的内容，显著提高长列表的渲染性能：

```tsx
import { VirtualList } from 'taro-uno-ui';

<VirtualList
  data={longListData}
  height={400}
  itemHeight={50}
  renderItem={({ item }) => <View>{item}</View>}
/>
```

### Q: 如何优化组件的渲染性能？

**A:** 可以通过以下方式优化组件的渲染性能：

1. 使用 `React.memo` 包装组件，避免不必要的重新渲染：

```tsx
const MemoizedComponent = React.memo(MyComponent);
```

2. 使用 `useCallback` 和 `useMemo` 缓存函数和计算结果：

```tsx
const handleClick = useCallback(() => {
  // 处理点击事件
}, []);

const computedValue = useMemo(() => {
  // 计算结果
  return heavyCalculation(value);
}, [value]);
```

3. 使用 `LazyComponent` 延迟加载重量级组件：

```tsx
import { LazyComponent } from 'taro-uno-ui';

<LazyComponent>
  <HeavyComponent />
</LazyComponent>
```

4. 按需加载组件，减小初始包体积：

```tsx
// 按需引入单个组件
import { Button } from 'taro-uno-ui/button';
```

## 📊 其他问题

### Q: Taro Uno UI 支持 TypeScript 吗？

**A:** 是的，Taro Uno UI 完全支持 TypeScript，提供完整的类型定义。

### Q: 如何获取 Taro Uno UI 的版本信息？

**A:** 可以通过以下方式获取版本信息：

1. 在 `package.json` 中查看：

```json
{
  "dependencies": {
    "taro-uno-ui": "^1.0.0"
  }
}
```

2. 在代码中获取：

```tsx
import { version } from 'taro-uno-ui';

console.log('Taro Uno UI 版本：', version);
```

### Q: 如何贡献代码？

**A:** 欢迎通过以下方式贡献代码：

1. Fork 仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 创建 Pull Request

详细的贡献指南请查看 [CONTRIBUTING.md](https://github.com/agions/taro-uno/blob/main/CONTRIBUTING.md)。

### Q: Taro Uno UI 的许可证是什么？

**A:** Taro Uno UI 采用 MIT 许可证，详情请查看 [LICENSE](https://github.com/agions/taro-uno/blob/main/LICENSE) 文件。

## 📚 更多帮助

如果您遇到的问题不在此列表中，可以通过以下方式获取帮助：

- [查看组件文档](./components/basic/button)
- [阅读开发指南](./guides/installation)
- [查看 API 参考](./api)
- [提交 Issue](https://github.com/agions/taro-uno/issues)
- [加入社区讨论](https://github.com/agions/taro-uno/discussions)
