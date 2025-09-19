import React, { useState, useRef } from 'react';
import { Transfer } from './Transfer';
import type { TransferOption } from './Transfer.types';

/** Transfer组件使用示例 */
export const TransferExample: React.FC = () => {
  // 示例数据源
  const mockData: TransferOption[] = [
    { key: '1', title: '选项1', description: '这是选项1的描述' },
    { key: '2', title: '选项2', description: '这是选项2的描述' },
    { key: '3', title: '选项3', description: '这是选项3的描述', disabled: true },
    { key: '4', title: '选项4', description: '这是选项4的描述' },
    { key: '5', title: '选项5', description: '这是选项5的描述' },
    { key: '6', title: '选项6', description: '这是选项6的描述' },
    { key: '7', title: '选项7', description: '这是选项7的描述' },
    { key: '8', title: '选项8', description: '这是选项8的描述' },
    { key: '9', title: '选项9', description: '这是选项9的描述' },
    { key: '10', title: '选项10', description: '这是选项10的描述' },
    { key: '11', title: '选项11', description: '这是选项11的描述' },
    { key: '12', title: '选项12', description: '这是选项12的描述' },
  ];

  // 受控组件示例
  const [targetKeys, setTargetKeys] = useState<(string | number)[]>(['1', '2']);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  
  // 非受控组件示例
  const [defaultTargetKeys] = useState<(string | number)[]>(['3', '4']);
  
  // 引用示例
  const transferRef = useRef<any>(null);

  // 处理变化
  const handleChange = (newTargetKeys: (string | number)[], direction: 'left' | 'right', moveKeys: (string | number)[]) => {
    setTargetKeys(newTargetKeys);
    console.log('Target Keys:', newTargetKeys);
    console.log('Direction:', direction);
    console.log('Move Keys:', moveKeys);
  };

  // 处理选中变化
  const handleSelectChange = (sourceSelectedKeys: (string | number)[], targetSelectedKeys: (string | number)[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    console.log('Source Selected Keys:', sourceSelectedKeys);
    console.log('Target Selected Keys:', targetSelectedKeys);
  };

  // 处理搜索
  const handleSearch = (direction: 'left' | 'right', value: string) => {
    console.log('Search:', direction, value);
  };

  // 自定义渲染函数
  const customRender = (item: TransferOption) => (
    <div>
      <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{item.title}</span>
      {item.description && (
        <div style={{ fontSize: '12px', color: '#666' }}>{item.description}</div>
      )}
    </div>
  );

  // 自定义底部渲染
  const customFooter = ({ direction }: { direction: 'left' | 'right' }) => (
    <div style={{ padding: '8px', textAlign: 'center', color: '#666' }}>
      自定义底部 - {direction === 'left' ? '源列表' : '目标列表'}
    </div>
  );

  return (
    <div style={{ padding: '24px' }}>
      <h2>Transfer 穿梭框组件示例</h2>
      
      {/* 受控组件示例 */}
      <div style={{ marginBottom: '32px' }}>
        <h3>受控组件</h3>
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onSearch={handleSearch}
          showSearch
          pagination={{ pageSize: 5, simple: true }}
          titles={['源列表', '目标列表']}
          operations={['添加到右侧', '添加到左侧']}
          style={{ width: '600px', height: '400px' }}
        />
      </div>

      {/* 非受控组件示例 */}
      <div style={{ marginBottom: '32px' }}>
        <h3>非受控组件</h3>
        <Transfer
          dataSource={mockData}
          defaultTargetKeys={defaultTargetKeys}
          showSearch
          pagination
          render={customRender}
          footer={customFooter}
          style={{ width: '600px', height: '400px' }}
        />
      </div>

      {/* 单向模式示例 */}
      <div style={{ marginBottom: '32px' }}>
        <h3>单向模式</h3>
        <Transfer
          dataSource={mockData}
          oneWay
          showSearch
          operations={['>']}
          titles={['可选列表', '已选列表']}
          style={{ width: '600px', height: '400px' }}
        />
      </div>

      {/* 引用控制示例 */}
      <div style={{ marginBottom: '32px' }}>
        <h3>引用控制</h3>
        <Transfer
          ref={transferRef}
          dataSource={mockData}
          showSearch
          style={{ width: '600px', height: '400px' }}
        />
        <div style={{ marginTop: '16px' }}>
          <button onClick={() => transferRef.current?.selectAll('left')}>
            全选左侧
          </button>
          <button onClick={() => transferRef.current?.clearSelect('right')}>
            清空右侧选择
          </button>
          <button onClick={() => transferRef.current?.reset()}>
            重置
          </button>
          <button onClick={() => {
            const keys = transferRef.current?.getTargetKeys();
            console.log('当前目标键:', keys);
          }}>
            获取目标键
          </button>
        </div>
      </div>

      {/* 禁用状态示例 */}
      <div style={{ marginBottom: '32px' }}>
        <h3>禁用状态</h3>
        <Transfer
          dataSource={mockData}
          disabled
          style={{ width: '600px', height: '400px' }}
        />
      </div>
    </div>
  );
};

export default TransferExample;