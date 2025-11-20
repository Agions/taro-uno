import React, { useState } from 'react';
import { Typography } from '@taro-uno/ui';

const TypographyExample: React.FC = () => {
  const [editText, setEditText] = useState('可编辑的文本');

  return (
    <View className="typography-example">
      <Typography variant="h1">一级标题</Typography>
      <Typography variant="h2">二级标题</Typography>
      <Typography variant="h3">三级标题</Typography>
      <Typography variant="h4">四级标题</Typography>
      <Typography variant="h5">五级标题</Typography>
      <Typography variant="h6">六级标题</Typography>

      <Typography variant="p">这是一个段落，用于展示文本内容。这是一个段落，用于展示文本内容。这是一个段落，用于展示文本内容。</Typography>
      <Typography variant="p" type="secondary">这是一个次要段落。这是一个次要段落。这是一个次要段落。</Typography>

      <Typography variant="span" type="primary">主要文本</Typography>
      <Typography variant="span" type="secondary">次要文本</Typography>
      <Typography variant="span" type="success">成功文本</Typography>
      <Typography variant="span" type="warning">警告文本</Typography>
      <Typography variant="span" type="danger">错误文本</Typography>

      <Typography variant="span" underline>下划线</Typography>
      <Typography variant="span" delete>删除线</Typography>
      <Typography variant="span" code>代码样式</Typography>
      <Typography variant="span" keyboard>键盘样式</Typography>

      <Typography variant="span" strong>粗体</Typography>
      <Typography variant="span" italic>斜体</Typography>
      <Typography variant="span" strong italic>粗体斜体</Typography>

      <Typography variant="span" copyable onCopy={() => console.log('复制成功')}>
        可复制的文本
      </Typography>

      <Typography variant="span" editable onEdit={(text) => setEditText(text)}>
        {editText}
      </Typography>

      <Typography variant="p" align="left">左对齐文本。这是一个左对齐的段落，用于展示文本对齐效果。</Typography>
      <Typography variant="p" align="center">居中对齐文本。这是一个居中对齐的段落，用于展示文本对齐效果。</Typography>
      <Typography variant="p" align="right">右对齐文本。这是一个右对齐的段落，用于展示文本对齐效果。</Typography>
      <Typography variant="p" align="justify">两端对齐文本。这是一个两端对齐的段落，用于展示文本对齐效果。这是一个两端对齐的段落，用于展示文本对齐效果。</Typography>

      <Typography variant="p" ellipsis maxRows={2}>
        这是一段很长的文本，将会在第二行末尾显示省略号。这是一段很长的文本，将会在第二行末尾显示省略号。这是一段很长的文本，将会在第二行末尾显示省略号。这是一段很长的文本，将会在第二行末尾显示省略号。
      </Typography>

      <Typography variant="span" size="xs">超小文本</Typography>
      <Typography variant="span" size="sm">小文本</Typography>
      <Typography variant="span" size="md">中等文本</Typography>
      <Typography variant="span" size="lg">大文本</Typography>
      <Typography variant="span" size="xl">超大文本</Typography>
      <Typography variant="span" size="xxl">特大文本</Typography>

      <Typography variant="span" color="primary">主色调文本</Typography>
      <Typography variant="span" color="secondary">次要色调文本</Typography>
      <Typography variant="span" color="success">成功色文本</Typography>
      <Typography variant="span" color="warning">警告色文本</Typography>
      <Typography variant="span" color="danger">错误色文本</Typography>

      <Typography variant="span" weight="normal">正常权重</Typography>
      <Typography variant="span" weight="medium">中等权重</Typography>
      <Typography variant="span" weight="semibold">半粗体</Typography>
      <Typography variant="span" weight="bold">粗体</Typography>

      <Typography variant="span" disabled>禁用文本</Typography>

      <Typography variant="span" onClick={() => console.log('文本被点击')} style={{ cursor: 'pointer' }}>
        可点击文本
      </Typography>

      <Typography variant="p" wrap={false}>
        不换行文本。这是一个不换行的段落，将会在一行显示，超出部分会被截断。
      </Typography>

      <Typography variant="p" style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
        带背景色的段落。这是一个带背景色的段落，用于突出显示重要信息。
      </Typography>

      <Typography variant="p" style={{ borderLeft: '3px solid #1890ff', paddingLeft: '10px' }}>
        带左侧边框的段落。这是一个带左侧边框的段落，用于引用或强调内容。
      </Typography>
    </View>
  );
};

export default TypographyExample;