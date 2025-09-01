/**
 * Taro-Uno Switch Component Examples
 * 开关组件使用示例
 */

import React, { useState, useRef } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { Switch, Form, FormItem } from '@/components/form';

// 基础开关示例
export function BasicSwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <View>
      <Text>基础开关</Text>
      <Switch
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="基础开关"
      />
      <Text>当前状态: {checked ? '开启' : '关闭'}</Text>
    </View>
  );
}

// 带标签的开关示例
export function LabeledSwitchExample() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <View>
      <Text>通知设置</Text>
      <Switch
        checked={notifications}
        onChange={setNotifications}
        showLabel={true}
        checkedLabel="接收通知"
        uncheckedLabel="不接收通知"
        accessibilityLabel="通知设置开关"
      />
      
      <Text>营销邮件</Text>
      <Switch
        checked={marketing}
        onChange={setMarketing}
        showLabel={true}
        checkedLabel="订阅"
        uncheckedLabel="取消订阅"
        accessibilityLabel="营销邮件开关"
      />
    </View>
  );
}

// 不同尺寸的开关示例
export function SizeSwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <View>
      <Text>小尺寸开关</Text>
      <Switch
        size="sm"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="小尺寸开关"
      />
      
      <Text>中尺寸开关</Text>
      <Switch
        size="md"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="中尺寸开关"
      />
      
      <Text>大尺寸开关</Text>
      <Switch
        size="lg"
        checked={checked}
        onChange={setChecked}
        accessibilityLabel="大尺寸开关"
      />
    </View>
  );
}

// 不同颜色的开关示例
export function ColorSwitchExample() {
  const [checked, setChecked] = useState(false);

  const colors = ['primary', 'success', 'warning', 'error', 'info'] as const;

  return (
    <View>
      {colors.map((color) => (
        <View key={color}>
          <Text>{color} 颜色</Text>
          <Switch
            color={color}
            checked={checked}
            onChange={setChecked}
            accessibilityLabel={`${color}颜色开关`}
          />
        </View>
      ))}
    </View>
  );
}

// 带验证的开关示例
export function ValidationSwitchExample() {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const validateAgreement = (value: boolean) => {
    if (!value) {
      setError('必须同意服务条款才能继续');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <View>
      <Text>服务条款</Text>
      <Switch
        checked={agreed}
        onChange={(value) => {
          setAgreed(value);
          validateAgreement(value);
        }}
        rules={[{ required: true, message: '请同意服务条款' }]}
        errorText={error}
        accessibilityLabel="服务条款同意开关"
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      
      <Button
        disabled={!agreed}
        onClick={() => {
          if (validateAgreement(agreed)) {
            console.log('提交成功');
          }
        }}
      >
        提交
      </Button>
    </View>
  );
}

// 加载状态开关示例
export function LoadingSwitchExample() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAsyncChange = async (value: boolean) => {
    setLoading(true);
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1500));
      setChecked(value);
      console.log('设置已保存:', value);
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>异步设置</Text>
      <Switch
        checked={checked}
        onChange={handleAsyncChange}
        loading={loading}
        loadingText="保存中..."
        showLoadingMask={true}
        accessibilityLabel="异步设置开关"
      />
      <Text>当前状态: {checked ? '已启用' : '已禁用'}</Text>
    </View>
  );
}

// 表单集成示例
export function FormIntegrationExample() {
  const formRef = useRef<any>();

  const handleSubmit = async () => {
    try {
      const values = await formRef.current.submit();
      console.log('表单提交成功:', values);
    } catch (errors) {
      console.log('表单验证失败:', errors);
    }
  };

  return (
    <View>
      <Text>用户设置</Text>
      <Form ref={formRef}>
        <FormItem name="notifications" label="推送通知">
          <Switch
            rules={[{ required: true, message: '请选择通知设置' }]}
            accessibilityLabel="推送通知开关"
          />
        </FormItem>
        
        <FormItem name="marketing" label="营销邮件">
          <Switch accessibilityLabel="营销邮件开关" />
        </FormItem>
        
        <FormItem name="analytics" label="数据分析">
          <Switch accessibilityLabel="数据分析开关" />
        </FormItem>
        
        <Button onClick={handleSubmit}>保存设置</Button>
      </Form>
    </View>
  );
}

// 批量设置示例
export function BatchSettingsExample() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveAllSettings = async () => {
    console.log('保存所有设置:', settings);
    // 这里可以添加保存到服务器的逻辑
  };

  const settingLabels = {
    emailNotifications: '邮件通知',
    pushNotifications: '推送通知',
    smsNotifications: '短信通知',
    marketingEmails: '营销邮件',
    weeklyDigest: '周报摘要',
  };

  return (
    <View>
      <Text>通知设置</Text>
      
      {Object.entries(settings).map(([key, value]) => (
        <View key={key}>
          <Text>{settingLabels[key as keyof typeof settingLabels]}</Text>
          <Switch
            checked={value}
            onChange={(v) => handleSettingChange(key, v)}
            showLabel={true}
            checkedLabel="开启"
            uncheckedLabel="关闭"
            accessibilityLabel={`${settingLabels[key as keyof typeof settingLabels]}开关`}
          />
        </View>
      ))}
      
      <Button onClick={saveAllSettings}>
        保存所有设置
      </Button>
    </View>
  );
}

// 受控组件示例
export function ControlledSwitchExample() {
  const [switchState, setSwitchState] = useState({
    mainSwitch: true,
    subSwitch1: false,
    subSwitch2: true,
  });

  const handleMainSwitchChange = (value: boolean) => {
    setSwitchState(prev => ({
      mainSwitch: value,
      subSwitch1: value ? prev.subSwitch1 : false,
      subSwitch2: value ? prev.subSwitch2 : false,
    }));
  };

  const handleSubSwitchChange = (key: string, value: boolean) => {
    setSwitchState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View>
      <Text>主开关</Text>
      <Switch
        checked={switchState.mainSwitch}
        onChange={handleMainSwitchChange}
        accessibilityLabel="主开关"
      />
      
      <Text>子开关1</Text>
      <Switch
        checked={switchState.subSwitch1}
        disabled={!switchState.mainSwitch}
        onChange={(v) => handleSubSwitchChange('subSwitch1', v)}
        accessibilityLabel="子开关1"
      />
      
      <Text>子开关2</Text>
      <Switch
        checked={switchState.subSwitch2}
        disabled={!switchState.mainSwitch}
        onChange={(v) => handleSubSwitchChange('subSwitch2', v)}
        accessibilityLabel="子开关2"
      />
    </View>
  );
}

// 自定义验证示例
export function CustomValidationExample() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const ageValidator = (value: boolean) => {
    if (!value) {
      return '必须确认已年满18岁';
    }
    return true;
  };

  const termsValidator = (value: boolean) => {
    if (!value) {
      return '必须同意服务条款';
    }
    return true;
  };

  const handleSubmit = () => {
    if (ageConfirmed && termsAccepted) {
      console.log('验证通过，可以提交');
    } else {
      console.log('验证失败，请检查设置');
    }
  };

  return (
    <View>
      <Text>年龄确认</Text>
      <Switch
        checked={ageConfirmed}
        onChange={setAgeConfirmed}
        validator={ageValidator}
        validateTrigger="onChange"
        accessibilityLabel="年龄确认开关"
      />
      
      <Text>服务条款</Text>
      <Switch
        checked={termsAccepted}
        onChange={setTermsAccepted}
        validator={termsValidator}
        validateTrigger="onChange"
        accessibilityLabel="服务条款开关"
      />
      
      <Button onClick={handleSubmit}>
        提交注册
      </Button>
    </View>
  );
}

// 导出所有示例
export const SwitchExamples = {
  BasicSwitchExample,
  LabeledSwitchExample,
  SizeSwitchExample,
  ColorSwitchExample,
  ValidationSwitchExample,
  LoadingSwitchExample,
  FormIntegrationExample,
  BatchSettingsExample,
  ControlledSwitchExample,
  CustomValidationExample,
};

export default SwitchExamples;