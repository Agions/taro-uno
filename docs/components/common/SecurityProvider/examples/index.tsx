import React, { useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import { SecurityProvider, useSecurity } from '../../../../src/components/common/SecurityProvider';

// 基本用法示例
function BasicUsage() {
  return (
    <View className="example-container">
      <Text className="example-title">基本用法</Text>
      <View className="content">
        <Text>SecurityProvider 包裹整个应用，提供全局安全保护</Text>
      </View>
    </View>
  );
}

// 输入净化示例
function InputSanitization() {
  const { sanitizeInput } = useSecurity();
  const [input, setInput] = useState('');
  const [sanitized, setSanitized] = useState('');

  const handleInput = (e) => {
    const value = e.detail.value;
    setInput(value);
    setSanitized(sanitizeInput(value, 'html'));
  };

  return (
    <View className="example-container">
      <Text className="example-title">输入净化</Text>
      <Input 
        value={input} 
        onInput={handleInput} 
        placeholder="输入包含HTML的内容，如 <script>alert('XSS')</script>" 
        className="input"
      />
      <View className="result">
        <Text>净化后：{sanitized}</Text>
      </View>
    </View>
  );
}

// 输入验证示例
function InputValidation() {
  const { validateInput } = useSecurity();
  const [input, setInput] = useState('');
  const [validation, setValidation] = useState(null);

  const handleInput = (e) => {
    const value = e.detail.value;
    setInput(value);
  };

  const handleValidate = () => {
    const result = validateInput(input, {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
    });
    setValidation(result);
  };

  return (
    <View className="example-container">
      <Text className="example-title">输入验证</Text>
      <Input 
        value={input} 
        onInput={handleInput} 
        placeholder="输入3-20个字母、数字或下划线" 
        className="input"
      />
      <Button onClick={handleValidate} className="button">验证</Button>
      {validation && (
        <View className={`validation-result ${validation.isValid ? 'valid' : 'invalid'}`}>
          <Text>{validation.isValid ? '验证通过' : `验证失败：${validation.message}`}</Text>
        </View>
      )}
    </View>
  );
}

// 错误报告示例
function ErrorReporting() {
  const { reportError } = useSecurity();
  const [errorReported, setErrorReported] = useState(false);

  const handleTriggerError = () => {
    try {
      // 模拟一个错误
      throw new Error('测试安全错误报告');
    } catch (error) {
      reportError(error);
      setErrorReported(true);
    }
  };

  return (
    <View className="example-container">
      <Text className="example-title">错误报告</Text>
      <Button onClick={handleTriggerError} className="button">触发错误报告</Button>
      {errorReported && (
        <Text className="success-message">错误已通过安全机制报告</Text>
      )}
    </View>
  );
}

// 综合示例组件
function SecurityProviderExample() {
  return (
    <SecurityProvider>
      <View className="security-provider-example">
        <BasicUsage />
        <InputSanitization />
        <InputValidation />
        <ErrorReporting />
      </View>
    </SecurityProvider>
  );
}

export default SecurityProviderExample;

// 样式
import './index.scss';