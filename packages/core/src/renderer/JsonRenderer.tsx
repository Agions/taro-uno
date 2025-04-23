import React from 'react';
import { jsonToProps } from '../utils/json';

export interface JsonComponent {
  type: string;
  props?: Record<string, any>;
  children?: (JsonComponent | string)[];
}

export interface JsonRendererProps {
  json: JsonComponent;
  components: Record<string, React.ComponentType<any>>;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface JsonRendererState {
  hasError: boolean;
  error?: Error;
}

/**
 * JSON渲染器组件
 * 根据JSON配置渲染React组件
 */
export class JsonRenderer extends React.Component<JsonRendererProps, JsonRendererState> {
  constructor(props: JsonRendererProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true, error });
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  renderComponent = (config: JsonComponent | string): React.ReactNode => {
    if (typeof config === 'string') {
      return config;
    }

    const { type, props = {}, children = [] } = config;
    
    // 从组件映射中获取组件
    const Component = this.props.components[type];
    
    if (!Component) {
      console.warn(`Component "${type}" not found in component map`);
      return null;
    }
    
    // 处理子组件
    const childNodes = children.map((child, index) => {
      return React.createElement(
        React.Fragment,
        { key: index },
        this.renderComponent(child)
      );
    });
    
    // 将JSON配置转换为组件props
    const componentProps = jsonToProps(props);
    
    // 如果组件接受children prop，则传入子组件
    return React.createElement(Component, componentProps, ...(childNodes || []));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '16px', border: '1px solid red' }}>
          <h3>渲染错误</h3>
          <p>{this.state.error?.message || '未知错误'}</p>
        </div>
      );
    }

    try {
      return this.renderComponent(this.props.json);
    } catch (error) {
      console.error('渲染JSON时出错:', error);
      return (
        <div style={{ color: 'red', padding: '16px', border: '1px solid red' }}>
          <h3>渲染错误</h3>
          <p>{(error as Error)?.message || '未知错误'}</p>
        </div>
      );
    }
  }
}

/**
 * 通过JSON配置创建组件的工厂函数
 */
export function createComponentFromJson(
  json: JsonComponent,
  components: Record<string, React.ComponentType<any>>
): React.FC<any> {
  return (props) => {
    // 合并外部传入的props和JSON配置中的props
    const combinedJson = {
      ...json,
      props: {
        ...(json.props || {}),
        ...props
      }
    };
    
    return <JsonRenderer json={combinedJson} components={components} />;
  };
} 