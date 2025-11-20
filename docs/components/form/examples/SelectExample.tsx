import React, { useState, useEffect } from 'react';
import { Select } from '@/components/form/Select';
import { Icon } from '@/components/basic/Icon';
import { View } from '@tarojs/components';

const SelectExample = () => {
  // 单选选择器
  const [singleValue, setSingleValue] = useState('');
  const basicOptions = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];

  // 受控组件
  const [controlledValue, setControlledValue] = useState('2');

  // 带清除按钮
  const [clearableValue, setClearableValue] = useState('1');
  const handleClear = () => {
    setClearableValue('');
  };

  // 不同尺寸
  const [sizeValue1, setSizeValue1] = useState('');
  const [sizeValue2, setSizeValue2] = useState('');
  const [sizeValue3, setSizeValue3] = useState('');

  // 验证状态
  const [statusValue1, setStatusValue1] = useState('');
  const [statusValue2, setStatusValue2] = useState('1');
  const [statusValue3, setStatusValue3] = useState('');
  const [statusValue4, setStatusValue4] = useState('');

  // 自定义验证
  const [customValidValue, setCustomValidValue] = useState('');
  const [customStatus, setCustomStatus] = useState<'success' | 'warning' | 'error' | ''>('');
  const [customErrorMsg, setCustomErrorMsg] = useState('');
  const handleCustomValidChange = (value: string) => {
    setCustomValidValue(value);
    if (value === '2') {
      setCustomStatus('error');
      setCustomErrorMsg('选项二不可选');
    } else if (value) {
      setCustomStatus('success');
      setCustomErrorMsg('');
    } else {
      setCustomStatus('');
      setCustomErrorMsg('');
    }
  };

  // 分组选项
  const [groupValue, setGroupValue] = useState('');
  const groupOptions = [
    { 
      label: '分组一', 
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ] 
    },
    { 
      label: '分组二', 
      options: [
        { label: '选项三', value: '3' },
        { label: '选项四', value: '4' },
      ] 
    },
  ];

  // 含禁用项
  const [disabledItemValue, setDisabledItemValue] = useState('');
  const disabledItemOptions = [
    { label: '可选选项', value: '1' },
    { label: '禁用选项', value: '2', disabled: true },
    { label: '另一个可选选项', value: '3' },
  ];

  // 自定义显示文本
  const [formatValue, setFormatValue] = useState('');
  const formatLabel = (value: string) => {
    const option = basicOptions.find(opt => opt.value === value);
    return option ? `已选择：${option.label}` : '';
  };

  // 多选模式
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const multipleOptions = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
    { label: '选项四', value: '4' },
    { label: '选项五', value: '5' },
  ];

  // 加载状态
  const [loadingValue, setLoadingValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState<any[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingOptions(basicOptions);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 不同变体
  const [variantValue1, setVariantValue1] = useState('');
  const [variantValue2, setVariantValue2] = useState('');
  const [variantValue3, setVariantValue3] = useState('');

  // 带前缀后缀
  const [prefixValue, setPrefixValue] = useState('');
  const [suffixValue, setSuffixValue] = useState('');
  const [bothValue, setBothValue] = useState('');

  // 文本字段变体
  const [textfieldValue, setTextfieldValue] = useState('');

  return (
    <View style={{ padding: 20, backgroundColor: '#fff' }}>
      <View style={{ marginBottom: 20 }}>
        <h3>单选选择器</h3>
        <Select
          value={singleValue}
          onChange={setSingleValue}
          options={basicOptions}
          placeholder="请选择"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>受控组件</h3>
        <Select
          value={controlledValue}
          onChange={setControlledValue}
          options={basicOptions}
          placeholder="请选择"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>禁用状态</h3>
        <Select
          options={basicOptions}
          placeholder="禁用选择器"
          disabled
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>带清除按钮</h3>
        <Select
          value={clearableValue}
          onChange={setClearableValue}
          options={basicOptions}
          placeholder="请选择"
          clearable
          onClear={handleClear}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>不同尺寸</h3>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Select
            value={sizeValue1}
            onChange={setSizeValue1}
            options={basicOptions}
            placeholder="大号选择器"
            size="large"
          />
          <Select
            value={sizeValue2}
            onChange={setSizeValue2}
            options={basicOptions}
            placeholder="中号选择器"
            size="medium"
          />
          <Select
            value={sizeValue3}
            onChange={setSizeValue3}
            options={basicOptions}
            placeholder="小号选择器"
            size="small"
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>带标签</h3>
        <Select
          value={singleValue}
          onChange={setSingleValue}
          options={basicOptions}
          placeholder="请选择"
          label="选择器标签"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>验证状态</h3>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Select
            value={statusValue1}
            onChange={setStatusValue1}
            options={basicOptions}
            placeholder="默认状态"
          />
          <Select
            value={statusValue2}
            onChange={setStatusValue2}
            options={basicOptions}
            placeholder="成功状态"
            status="success"
          />
          <Select
            value={statusValue3}
            onChange={setStatusValue3}
            options={basicOptions}
            placeholder="警告状态"
            status="warning"
            errorMessage="请选择正确的选项"
          />
          <Select
            value={statusValue4}
            onChange={setStatusValue4}
            options={basicOptions}
            placeholder="错误状态"
            status="error"
            errorMessage="必须选择一个选项"
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>自定义验证</h3>
        <Select
          value={customValidValue}
          onChange={handleCustomValidChange}
          options={basicOptions}
          placeholder="请选择"
          status={customStatus}
          errorMessage={customErrorMsg}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>分组选项</h3>
        <Select
          value={groupValue}
          onChange={setGroupValue}
          options={groupOptions}
          placeholder="请选择"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>含禁用项</h3>
        <Select
          value={disabledItemValue}
          onChange={setDisabledItemValue}
          options={disabledItemOptions}
          placeholder="请选择"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>自定义显示文本</h3>
        <Select
          value={formatValue}
          onChange={setFormatValue}
          options={basicOptions}
          placeholder="请选择"
          formatLabel={formatLabel}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>多选模式</h3>
        <Select
          value={multipleValue}
          onChange={setMultipleValue}
          options={multipleOptions}
          placeholder="请选择"
          multiple
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>自定义空选项文本</h3>
        <Select
          value={singleValue}
          onChange={setSingleValue}
          options={[]}
          placeholder="请选择"
          emptyText="暂无选项"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>加载状态</h3>
        <Select
          value={loadingValue}
          onChange={setLoadingValue}
          options={loadingOptions}
          placeholder="请选择"
          loading={loading}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>只读模式</h3>
        <Select
          value="1"
          options={basicOptions}
          placeholder="请选择"
          readOnly
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>不同变体</h3>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Select
            value={variantValue1}
            onChange={setVariantValue1}
            options={basicOptions}
            placeholder="默认变体"
            variant="default"
          />
          <Select
            value={variantValue2}
            onChange={setVariantValue2}
            options={basicOptions}
            placeholder="填充变体"
            variant="filled"
          />
          <Select
            value={variantValue3}
            onChange={setVariantValue3}
            options={basicOptions}
            placeholder="轮廓变体"
            variant="outlined"
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>带前缀后缀</h3>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Select
            value={prefixValue}
            onChange={setPrefixValue}
            options={basicOptions}
            placeholder="带前缀"
            prefix={<Icon type="user" />}
          />
          <Select
            value={suffixValue}
            onChange={setSuffixValue}
            options={basicOptions}
            placeholder="带后缀"
            suffix={<Icon type="search" />}
          />
          <Select
            value={bothValue}
            onChange={setBothValue}
            options={basicOptions}
            placeholder="带前后缀"
            prefix={<Icon type="lock" />}
            suffix={<Icon type="eye" />}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <h3>文本字段变体</h3>
        <Select
          value={textfieldValue}
          onChange={setTextfieldValue}
          options={basicOptions}
          placeholder="文本字段变体"
          variant="textfield"
        />
      </View>
    </View>
  );
};

export default SelectExample;