import React, { useState } from 'react';
import { Input } from '@/components/form/Input';
import { Icon } from '@/components/basic/Icon';
import { View } from '@tarojs/components';

const InputExample: React.FC = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'success' | 'warning' | 'error' | ''>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (setValue: React.Dispatch<React.SetStateAction<string>>) => (e: any) => {
    setValue(e.detail.value);
  };

  const handleClear = (setValue: React.Dispatch<React.SetStateAction<string>>) => () => {
    setValue('');
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailStatus('error');
      setErrorMessage('请输入有效的邮箱地址');
    } else if (email) {
      setEmailStatus('success');
      setErrorMessage('');
    } else {
      setEmailStatus('');
      setErrorMessage('');
    }
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  // 格式化手机号
  const handlePhoneChange = (e: any) => {
    let inputValue = e.detail.value.replace(/\D/g, ''); // 只保留数字
    if (inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3) + ' ' + inputValue.slice(3);
    }
    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8) + ' ' + inputValue.slice(8, 11);
    }
    setValue7(inputValue);
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>默认输入框</View>
        <Input placeholder="请输入内容" />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>受控组件</View>
        <Input
          value={value1}
          onChange={handleChange(setValue1)}
          placeholder="请输入内容"
        />
        <View style={{ marginTop: 5, fontSize: 14, color: '#666' }}>
          当前值：{value1}
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>禁用状态</View>
        <Input placeholder="禁用输入框" disabled />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>带清除按钮</View>
        <Input
          value={value2}
          onChange={handleChange(setValue2)}
          placeholder="带清除按钮"
          clearable
          onClear={handleClear(setValue2)}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>密码输入</View>
        <Input
          value={value3}
          onChange={handleChange(setValue3)}
          placeholder="请输入密码"
          type="password"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>数字输入</View>
        <Input
          value={value4}
          onChange={handleChange(setValue4)}
          placeholder="请输入数字"
          type="number"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>不同尺寸</View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Input placeholder="大号输入框" size="large" />
          <Input placeholder="中号输入框" size="medium" />
          <Input placeholder="小号输入框" size="small" />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>带标签</View>
        <Input placeholder="带标签输入框" label="用户名" />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>验证状态</View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Input placeholder="默认状态" />
          <Input placeholder="成功状态" status="success" />
          <Input placeholder="警告状态" status="warning" />
          <Input placeholder="错误状态" status="error" errorMessage="输入错误" />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>自定义验证函数</View>
        <Input
          value={email}
          onChange={(e) => setEmail(e.detail.value)}
          onBlur={handleEmailBlur}
          placeholder="请输入邮箱"
          status={emailStatus}
          errorMessage={errorMessage}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>多行输入框</View>
        <Input
          value={value5}
          onChange={handleChange(setValue5)}
          placeholder="多行输入框"
          type="textarea"
          rows={4}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>带前缀后缀</View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Input
            placeholder="带前缀"
            prefix={<Icon type="user" />}
          />
          <Input
            placeholder="带后缀"
            suffix={<Icon type="search" />}
          />
          <Input
            placeholder="带前后缀"
            prefix={<Icon type="lock" />}
            suffix={<Icon type="eye" />}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>特殊类型输入</View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Input placeholder="手机号" type="tel" />
          <Input placeholder="URL" type="url" />
          <Input placeholder="邮箱" type="email" />
          <Input placeholder="身份证" type="idcard" />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>只读模式</View>
        <Input value="只读内容" readOnly />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>自定义样式</View>
        <Input
          placeholder="自定义样式"
          style={{
            borderRadius: 8,
            backgroundColor: '#f5f5f5',
            borderColor: '#d9d9d9',
          }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>密码可见性切换</View>
        <Input
          value={value6}
          onChange={handleChange(setValue6)}
          placeholder="请输入密码"
          type={passwordVisible ? 'text' : 'password'}
          suffix={
            <Icon
              type={passwordVisible ? 'eye' : 'eye-off'}
              onClick={togglePasswordVisible}
            />
          }
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>输入格式化</View>
        <Input
          value={value7}
          onChange={handlePhoneChange}
          placeholder="手机号格式：138 0000 0000"
          type="tel"
        />
      </View>
    </View>
  );
};

export default InputExample;