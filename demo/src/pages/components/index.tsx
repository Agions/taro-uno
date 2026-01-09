import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import {
  Button,
  Input,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Card,
  Badge,
  Avatar,
  Space,
  Divider,
  Tabs,
  Loading,
  Modal,
  Toast,
} from 'taro-uno-ui';
import './index.scss';

const Components: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);

  const tabs = [
    { key: 'basic', title: '基础' },
    { key: 'form', title: '表单' },
    { key: 'display', title: '展示' },
    { key: 'feedback', title: '反馈' },
  ];

  const handleShowToast = () => {
    Toast.show({ content: '这是一条提示消息', duration: 2000 });
  };

  const renderBasicComponents = () => (
    <View className="demo-section">
      <Text className="demo-title">Button 按钮</Text>
      <Space wrap>
        <Button type="primary">主要按钮</Button>
        <Button type="default">默认按钮</Button>
        <Button type="text">文字按钮</Button>
      </Space>
      <Space wrap style={{ marginTop: 16 }}>
        <Button type="primary" size="small">小按钮</Button>
        <Button type="primary" size="medium">中按钮</Button>
        <Button type="primary" size="large">大按钮</Button>
      </Space>
      <Space wrap style={{ marginTop: 16 }}>
        <Button type="primary" disabled>禁用</Button>
        <Button type="primary" loading>加载中</Button>
      </Space>

      <Divider />

      <Text className="demo-title">Space 间距</Text>
      <Space size="large">
        <View className="demo-box">1</View>
        <View className="demo-box">2</View>
        <View className="demo-box">3</View>
      </Space>

      <Divider />

      <Text className="demo-title">Divider 分割线</Text>
      <Divider>文字分割</Divider>
      <Divider dashed />
    </View>
  );

  const renderFormComponents = () => (
    <View className="demo-section">
      <Text className="demo-title">Input 输入框</Text>
      <Input
        placeholder="请输入内容"
        value={inputValue}
        onChange={(e) => setInputValue(e.detail.value)}
      />
      <Input
        placeholder="密码输入"
        type="password"
        style={{ marginTop: 16 }}
      />

      <Divider />

      <Text className="demo-title">Switch 开关</Text>
      <Space align="center">
        <Switch checked={switchValue} onChange={setSwitchValue} />
        <Text>{switchValue ? '开启' : '关闭'}</Text>
      </Space>

      <Divider />

      <Text className="demo-title">Checkbox 复选框</Text>
      <Checkbox
        checked={checkboxValue}
        onChange={setCheckboxValue}
      >
        同意用户协议
      </Checkbox>

      <Divider />

      <Text className="demo-title">Radio 单选框</Text>
      <Space direction="vertical">
        <Radio
          checked={radioValue === 'option1'}
          onChange={() => setRadioValue('option1')}
        >
          选项一
        </Radio>
        <Radio
          checked={radioValue === 'option2'}
          onChange={() => setRadioValue('option2')}
        >
          选项二
        </Radio>
      </Space>

      <Divider />

      <Text className="demo-title">Slider 滑块</Text>
      <Slider
        value={sliderValue}
        onChange={setSliderValue}
        min={0}
        max={100}
      />
      <Text className="demo-value">当前值: {sliderValue}</Text>
    </View>
  );

  const renderDisplayComponents = () => (
    <View className="demo-section">
      <Text className="demo-title">Card 卡片</Text>
      <Card title="卡片标题" extra="更多">
        <Text>这是卡片内容区域</Text>
      </Card>

      <Divider />

      <Text className="demo-title">Badge 徽标</Text>
      <Space size="large">
        <Badge content="5">
          <View className="demo-badge-box" />
        </Badge>
        <Badge content="99+">
          <View className="demo-badge-box" />
        </Badge>
        <Badge dot>
          <View className="demo-badge-box" />
        </Badge>
      </Space>

      <Divider />

      <Text className="demo-title">Avatar 头像</Text>
      <Space size="large" align="center">
        <Avatar size="small" />
        <Avatar size="medium" />
        <Avatar size="large" />
        <Avatar shape="square" />
      </Space>

      <Divider />

      <Text className="demo-title">Loading 加载</Text>
      <Space size="large">
        <Loading size="small" />
        <Loading size="medium" />
        <Loading size="large" />
      </Space>
    </View>
  );

  const renderFeedbackComponents = () => (
    <View className="demo-section">
      <Text className="demo-title">Modal 对话框</Text>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        打开对话框
      </Button>
      <Modal
        visible={modalVisible}
        title="提示"
        onClose={() => setModalVisible(false)}
        onConfirm={() => setModalVisible(false)}
      >
        <Text>这是一个对话框示例</Text>
      </Modal>

      <Divider />

      <Text className="demo-title">Toast 轻提示</Text>
      <Space wrap>
        <Button onClick={handleShowToast}>显示提示</Button>
        <Button onClick={() => Toast.success('操作成功')}>成功提示</Button>
        <Button onClick={() => Toast.error('操作失败')}>错误提示</Button>
      </Space>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicComponents();
      case 'form':
        return renderFormComponents();
      case 'display':
        return renderDisplayComponents();
      case 'feedback':
        return renderFeedbackComponents();
      default:
        return null;
    }
  };

  return (
    <View className="components">
      <Tabs
        items={tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
      />
      <ScrollView scrollY className="components__content">
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default Components;
