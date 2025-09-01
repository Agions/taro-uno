import React, { useState, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { Checkbox, CheckboxGroup } from './Checkbox';
import type { CheckboxProps, CheckboxGroupProps } from './Checkbox.types';

/** 基础复选框示例 */
export const BasicCheckboxExample: React.FC = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <View>
      <Text>基础复选框示例</Text>
      <Checkbox
        checked={checked}
        onChange={(checked) => setChecked(checked)}
        label="接受条款和条件"
      />
      <Text>当前状态: {checked ? '已选中' : '未选中'}</Text>
    </View>
  );
};

/** 不同尺寸的复选框示例 */
export const SizeCheckboxExample: React.FC = () => {
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  
  return (
    <View>
      <Text>不同尺寸的复选框</Text>
      {sizes.map((size) => (
        <View key={size} style={{ marginBottom: 8 }}>
          <Checkbox
            size={size}
            label={`${size.toUpperCase()} 尺寸`}
            defaultChecked={size === 'md'}
          />
        </View>
      ))}
    </View>
  );
};

/** 不同状态的复选框示例 */
export const StatusCheckboxExample: React.FC = () => {
  const statuses: Array<'normal' | 'error' | 'warning' | 'success' | 'disabled'> = 
    ['normal', 'error', 'warning', 'success', 'disabled'];
  
  return (
    <View>
      <Text>不同状态的复选框</Text>
      {statuses.map((status) => (
        <View key={status} style={{ marginBottom: 8 }}>
          <Checkbox
            status={status}
            label={`${status} 状态`}
            disabled={status === 'disabled'}
            defaultChecked={status === 'success'}
          />
        </View>
      ))}
    </View>
  );
};

/** 不同颜色的复选框示例 */
export const ColorCheckboxExample: React.FC = () => {
  const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = 
    ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  
  return (
    <View>
      <Text>不同颜色的复选框</Text>
      {colors.map((color) => (
        <View key={color} style={{ marginBottom: 8 }}>
          <Checkbox
            color={color}
            label={`${color} 颜色`}
            defaultChecked={color === 'primary'}
          />
        </View>
      ))}
    </View>
  );
};

/** 半选状态示例 */
export const IndeterminateCheckboxExample: React.FC = () => {
  const [indeterminate, setIndeterminate] = useState(true);
  
  return (
    <View>
      <Text>半选状态示例</Text>
      <Checkbox
        indeterminate={indeterminate}
        onChange={(checked) => {
          setIndeterminate(false);
          console.log('Checked:', checked);
        }}
        label="半选状态"
      />
      <Text onClick={() => setIndeterminate(true)}>重置为半选状态</Text>
    </View>
  );
};

/** 带验证的复选框示例 */
export const ValidationCheckboxExample: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const validate = (value: boolean) => {
    if (!value) {
      return '必须接受条款才能继续';
    }
    return true;
  };
  
  const handleChange = (value: boolean) => {
    setChecked(value);
    const result = validate(value);
    setError(typeof result === 'string' ? result : null);
  };
  
  return (
    <View>
      <Text>带验证的复选框</Text>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        status={error ? 'error' : 'normal'}
        errorText={error}
        rules={[{ required: true, message: '此项为必选项' }]}
        label="我已阅读并同意服务条款"
      />
      <Text>验证结果: {error ? error : '通过'}</Text>
    </View>
  );
};

/** 复选框组示例 */
export const CheckboxGroupExample: React.FC = => {
  const [selectedValues, setSelectedValues] = useState<Array<string | number>>([]);
  
  const options = [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' },
    { label: '选项 4', value: '4' },
  ];
  
  return (
    <View>
      <Text>复选框组示例</Text>
      <CheckboxGroup
        options={options}
        value={selectedValues}
        onChange={setSelectedValues}
        showSelectAll={true}
        showCount={true}
        direction="vertical"
      />
      <Text>选中的值: {selectedValues.join(', ')}</Text>
    </View>
  );
};

/** 自定义图标示例 */
export const CustomIconCheckboxExample: React.FC = () => {
  return (
    <View>
      <Text>自定义图标示例</Text>
      <Checkbox
        checkedIcon="⭐"
        uncheckedIcon="☆"
        indeterminateIcon="❓"
        defaultChecked={true}
        label="自定义图标"
      />
      <Checkbox
        checkedIcon="✅"
        uncheckedIcon="❌"
        label="另一种自定义图标"
      />
    </View>
  );
};

/** 动画效果示例 */
export const AnimationCheckboxExample: React.FC = () => {
  const checkboxRef = useRef<any>(null);
  
  return (
    <View>
      <Text>动画效果示例</Text>
      <Checkbox
        ref={checkboxRef}
        animation={true}
        ripple={true}
        label="带动画和涟漪效果"
      />
      <View style={{ marginTop: 16 }}>
        <Text onClick={() => checkboxRef.current?.shake()}>
          触发震动效果
        </Text>
        <Text onClick={() => checkboxRef.current?.pulse()}>
          触发脉冲效果
        </Text>
      </View>
    </View>
  );
};

/** 受控组件示例 */
export const ControlledCheckboxExample: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  return (
    <View>
      <Text>受控组件示例</Text>
      <Checkbox
        checked={checked}
        onChange={setChecked}
        disabled={disabled}
        label="受控复选框"
      />
      <View style={{ marginTop: 16 }}>
        <Text onClick={() => setChecked(!checked)}>
          切换选中状态
        </Text>
        <Text onClick={() => setDisabled(!disabled)}>
          切换禁用状态
        </Text>
      </View>
      <Text>当前状态: 选中={checked ? '是' : '否'}, 禁用={disabled ? '是' : '否'}</Text>
    </View>
  );
};

/** 完整表单示例 */
export const FormCheckboxExample: React.FC = () => {
  const [formData, setFormData] = useState({
    terms: false,
    newsletter: false,
    marketing: false,
    preferences: [] as Array<string | number>,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.terms) {
      newErrors.terms = '必须接受服务条款';
    }
    
    if (formData.preferences.length === 0) {
      newErrors.preferences = '至少选择一个偏好';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('表单提交:', formData);
    }
  };
  
  const preferenceOptions = [
    { label: '体育', value: 'sports' },
    { label: '音乐', value: 'music' },
    { label: '电影', value: 'movies' },
    { label: '读书', value: 'books' },
  ];
  
  return (
    <View>
      <Text>完整表单示例</Text>
      
      <View style={{ marginBottom: 16 }}>
        <Checkbox
          checked={formData.terms}
          onChange={(checked) => setFormData({ ...formData, terms: checked })}
          status={errors.terms ? 'error' : 'normal'}
          errorText={errors.terms}
          rules={[{ required: true, message: '必须接受服务条款' }]}
          label="我已阅读并同意服务条款"
        />
      </View>
      
      <View style={{ marginBottom: 16 }}>
        <Checkbox
          checked={formData.newsletter}
          onChange={(checked) => setFormData({ ...formData, newsletter: checked })}
          label="订阅新闻邮件"
        />
      </View>
      
      <View style={{ marginBottom: 16 }}>
        <Checkbox
          checked={formData.marketing}
          onChange={(checked) => setFormData({ ...formData, marketing: checked })}
          label="接收营销信息"
        />
      </View>
      
      <View style={{ marginBottom: 16 }}>
        <Text>选择您的兴趣偏好:</Text>
        <CheckboxGroup
          options={preferenceOptions}
          value={formData.preferences}
          onChange={(values) => setFormData({ ...formData, preferences: values })}
          status={errors.preferences ? 'error' : 'normal'}
          minCount={1}
          showCount={true}
          direction="vertical"
        />
        {errors.preferences && (
          <Text style={{ color: 'red' }}>{errors.preferences}</Text>
        )}
      </View>
      
      <Text onClick={handleSubmit}>
        提交表单
      </Text>
    </View>
  );
};

/** 所有示例的导出 */
export const CheckboxExamples: React.FC = () => {
  return (
    <View>
      <BasicCheckboxExample />
      <View style={{ height: 32 }} />
      <SizeCheckboxExample />
      <View style={{ height: 32 }} />
      <StatusCheckboxExample />
      <View style={{ height: 32 }} />
      <ColorCheckboxExample />
      <View style={{ height: 32 }} />
      <IndeterminateCheckboxExample />
      <View style={{ height: 32 }} />
      <ValidationCheckboxExample />
      <View style={{ height: 32 }} />
      <CheckboxGroupExample />
      <View style={{ height: 32 }} />
      <CustomIconCheckboxExample />
      <View style={{ height: 32 }} />
      <AnimationCheckboxExample />
      <View style={{ height: 32 }} />
      <ControlledCheckboxExample />
      <View style={{ height: 32 }} />
      <FormCheckboxExample />
    </View>
  );
};