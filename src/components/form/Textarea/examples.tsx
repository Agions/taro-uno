import React, { useState, useRef } from 'react';
import { Textarea } from './Textarea';
import { View, Text, Button } from '@tarojs/components';

/** 基础示例 */
export function BasicExample() {
  const [value, setValue] = useState('');
  
  return (
    <View>
      <Text>基础文本域</Text>
      <Textarea
        value={value}
        onChange={setValue}
        placeholder="请输入内容..."
        style={{ marginTop: '8px' }}
      />
      <Text style={{ marginTop: '8px' }}>当前值: {value}</Text>
    </View>
  );
}

/** 自动调整高度示例 */
export function AutoHeightExample() {
  const [value, setValue] = useState('这是一段会自动调整高度的文本。\n尝试输入更多内容来查看效果。');
  
  return (
    <View>
      <Text>自动调整高度</Text>
      <Textarea
        value={value}
        onChange={setValue}
        autoHeight
        minRows={2}
        maxRows={6}
        placeholder="输入内容将自动调整高度..."
        style={{ marginTop: '8px' }}
      />
    </View>
  );
}

/** 字符计数示例 */
export function CharacterCountExample() {
  const [value, setValue] = useState('');
  
  return (
    <View>
      <Text>字符计数</Text>
      <Textarea
        value={value}
        onChange={setValue}
        maxLength={100}
        showCount
        counterPosition="bottom-right"
        placeholder="最多输入100个字符..."
        style={{ marginTop: '8px' }}
      />
    </View>
  );
}

/** 表单验证示例 */
export function ValidationExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleValidate = async (result: any) => {
    if (!result.valid) {
      setError(result.message || '验证失败');
    } else {
      setError('');
    }
  };
  
  return (
    <View>
      <Text>表单验证</Text>
      <Textarea
        value={value}
        onChange={setValue}
        label="描述"
        placeholder="请输入10-200个字符的描述..."
        rules={[
          { required: true, message: '此字段为必填项' },
          { minLength: 10, message: '最少需要10个字符' },
          { maxLength: 200, message: '最多允许200个字符' }
        ]}
        validateTrigger="onBlur"
        onValidate={handleValidate}
        style={{ marginTop: '8px' }}
      />
      {error && (
        <Text style={{ color: 'red', marginTop: '4px' }}>{error}</Text>
      )}
    </View>
  );
}

/** 不同状态示例 */
export function StatusExample() {
  return (
    <View>
      <Text>不同状态</Text>
      
      <View style={{ marginTop: '16px' }}>
        <Text>正常状态</Text>
        <Textarea
          defaultValue="正常状态的文本域"
          status="normal"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>错误状态</Text>
        <Textarea
          defaultValue="错误状态的文本域"
          status="error"
          errorText="输入内容不符合要求"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>警告状态</Text>
        <Textarea
          defaultValue="警告状态的文本域"
          status="warning"
          helperText="请注意输入格式"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>成功状态</Text>
        <Textarea
          defaultValue="成功状态的文本域"
          status="success"
          helperText="输入格式正确"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>禁用状态</Text>
        <Textarea
          defaultValue="禁用状态的文本域"
          disabled
          style={{ marginTop: '4px' }}
        />
      </View>
    </View>
  );
}

/** 尺寸示例 */
export function SizeExample() {
  return (
    <View>
      <Text>不同尺寸</Text>
      
      <View style={{ marginTop: '16px' }}>
        <Text>小尺寸 (sm)</Text>
        <Textarea
          defaultValue="小尺寸文本域"
          size="sm"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>中尺寸 (md)</Text>
        <Textarea
          defaultValue="中尺寸文本域"
          size="md"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>大尺寸 (lg)</Text>
        <Textarea
          defaultValue="大尺寸文本域"
          size="lg"
          style={{ marginTop: '4px' }}
        />
      </View>
    </View>
  );
}

/** 样式变体示例 */
export function VariantExample() {
  return (
    <View>
      <Text>样式变体</Text>
      
      <View style={{ marginTop: '16px' }}>
        <Text>边框样式 (outlined)</Text>
        <Textarea
          defaultValue="边框样式的文本域"
          variant="outlined"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>填充样式 (filled)</Text>
        <Textarea
          defaultValue="填充样式的文本域"
          variant="filled"
          style={{ marginTop: '4px' }}
        />
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Text>下划线样式 (underlined)</Text>
        <Textarea
          defaultValue="下划线样式的文本域"
          variant="underlined"
          style={{ marginTop: '4px' }}
        />
      </View>
    </View>
  );
}

/** Ref 方法示例 */
export function RefExample() {
  const textareaRef = useRef<any>(null);
  
  const handleFocus = () => {
    textareaRef.current?.focus();
  };
  
  const handleBlur = () => {
    textareaRef.current?.blur();
  };
  
  const handleClear = () => {
    textareaRef.current?.clear();
  };
  
  const handleValidate = async () => {
    const result = await textareaRef.current?.validate();
    console.log('验证结果:', result);
  };
  
  return (
    <View>
      <Text>Ref 方法操作</Text>
      <Textarea
        ref={textareaRef}
        placeholder="通过Ref操作的文本域"
        rules={[{ required: true, message: '此字段为必填项' }]}
        style={{ marginTop: '8px' }}
      />
      
      <View style={{ marginTop: '16px', flexDirection: 'row', gap: '8px' }}>
        <Button onClick={handleFocus} size="mini">聚焦</Button>
        <Button onClick={handleBlur} size="mini">失焦</Button>
        <Button onClick={handleClear} size="mini">清除</Button>
        <Button onClick={handleValidate} size="mini">验证</Button>
      </View>
    </View>
  );
}

/** 综合示例 */
export function ComprehensiveExample() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleValidate = (field: string) => (result: any) => {
    if (!result.valid) {
      setErrors(prev => ({ ...prev, [field]: result.message }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleSubmit = async () => {
    // 这里可以添加表单提交逻辑
    console.log('表单数据:', formData);
    console.log('错误信息:', errors);
  };
  
  return (
    <View>
      <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>综合示例</Text>
      
      <View style={{ marginTop: '16px' }}>
        <Textarea
          value={formData.title}
          onChange={handleChange('title')}
          label="标题"
          placeholder="请输入标题..."
          rules={[{ required: true, message: '标题不能为空' }]}
          validateTrigger="onBlur"
          onValidate={handleValidate('title')}
          maxLength={50}
          showCount
        />
        {errors.title && (
          <Text style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            {errors.title}
          </Text>
        )}
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Textarea
          value={formData.description}
          onChange={handleChange('description')}
          label="描述"
          placeholder="请输入详细描述..."
          autoHeight
          minRows={3}
          maxRows={6}
          rules={[
            { required: true, message: '描述不能为空' },
            { minLength: 10, message: '描述至少需要10个字符' }
          ]}
          validateTrigger="onBlur"
          onValidate={handleValidate('description')}
          maxLength={500}
          showCount
        />
        {errors.description && (
          <Text style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            {errors.description}
          </Text>
        )}
      </View>
      
      <View style={{ marginTop: '16px' }}>
        <Textarea
          value={formData.requirements}
          onChange={handleChange('requirements')}
          label="特殊要求"
          placeholder="请输入特殊要求（可选）..."
          autoHeight
          minRows={2}
          maxRows={4}
          maxLength={200}
          showCount
          helperText="此项为选填"
        />
        {errors.requirements && (
          <Text style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            {errors.requirements}
          </Text>
        )}
      </View>
      
      <Button 
        onClick={handleSubmit} 
        type="primary" 
        style={{ marginTop: '24px', width: '100%' }}
      >
        提交表单
      </Button>
    </View>
  );
}

/** 默认导出所有示例 */
export default {
  BasicExample,
  AutoHeightExample,
  CharacterCountExample,
  ValidationExample,
  StatusExample,
  SizeExample,
  VariantExample,
  RefExample,
  ComprehensiveExample,
};