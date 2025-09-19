import { useState, useRef } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { Progress } from './Progress';

export const ProgressExample = () => {
  const [lineProgress, setLineProgress] = useState(30);
  const [circleProgress, setCircleProgress] = useState(60);
  const [dashboardProgress, setDashboardProgress] = useState(45);
  const progressRef = useRef<any>(null);

  const handleLineProgress = () => {
    setLineProgress(prev => prev >= 100 ? 0 : prev + 10);
  };

  const handleCircleProgress = () => {
    setCircleProgress(prev => prev >= 100 ? 0 : prev + 15);
  };

  const handleDashboardProgress = () => {
    setDashboardProgress(prev => prev >= 100 ? 0 : prev + 20);
  };

  const handleStartAnimation = () => {
    progressRef.current?.startAnimation();
  };

  const handleResetProgress = () => {
    progressRef.current?.reset();
  };

  // 分段进度条数据
  const segments = [
    { color: '#ef4444', percent: 20 },
    { color: '#f59e0b', percent: 30 },
    { color: '#10b981', percent: 25 },
    { color: '#3b82f6', percent: 25 },
  ];

  // 渐变色配置
  const gradient = {
    type: 'linear' as const,
    direction: 'to right',
    colors: ['#3b82f6', '#8b5cf6', '#ec4899'],
  };

  // 自定义格式化函数
  const customFormat = (percent: number) => {
    return `${percent} 项完成`;
  };

  return (
    <View style={{ padding: '20px' }}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Progress 进度条组件示例
      </Text>

      {/* 基础线型进度条 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>基础线型进度条</Text>
        <Progress
          type="line"
          percent={lineProgress}
          status="normal"
          size="default"
          title="任务进度"
          description="正在处理中..."
        />
        <Button onClick={handleLineProgress} style={{ marginTop: '10px' }}>
          更新进度
        </Button>
      </View>

      {/* 不同状态的线型进度条 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>不同状态的进度条</Text>
        <Progress type="line" percent={25} status="normal" style={{ marginBottom: '10px' }} />
        <Progress type="line" percent={50} status="active" style={{ marginBottom: '10px' }} />
        <Progress type="line" percent={75} status="success" style={{ marginBottom: '10px' }} />
        <Progress type="line" percent={100} status="exception" style={{ marginBottom: '10px' }} />
      </View>

      {/* 不同尺寸的线型进度条 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>不同尺寸的进度条</Text>
        <Progress type="line" percent={30} size="xs" style={{ marginBottom: '10px' }} />
        <Progress type="line" percent={50} size="sm" style={{ marginBottom: '10px' }} />
        <Progress type="line" percent={70} size="default" style={{ marginBottom: '10px' }} />
        <Progress type="line" percent={90} size="lg" style={{ marginBottom: '10px' }} />
      </View>

      {/* 渐变色进度条 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>渐变色进度条</Text>
        <Progress
          type="line"
          percent={70}
          strokeColor={gradient}
          animated={true}
          style={{ marginBottom: '10px' }}
        />
      </View>

      {/* 分段进度条 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>分段进度条</Text>
        <Progress
          type="line"
          segments={segments}
          style={{ marginBottom: '10px' }}
        />
      </View>

      {/* 圆形进度条 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>圆形进度条</Text>
        <Progress
          type="circle"
          percent={circleProgress}
          size="default"
          format={customFormat}
          description="圆形进度"
          style={{ marginBottom: '10px' }}
        />
        <Button onClick={handleCircleProgress} style={{ marginRight: '10px' }}>
          更新进度
        </Button>
      </View>

      {/* 仪表盘进度条 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>仪表盘进度条</Text>
        <Progress
          type="dashboard"
          percent={dashboardProgress}
          size="lg"
          gapDegree={75}
          gapPosition="bottom"
          status="success"
          ref={progressRef}
          style={{ marginBottom: '10px' }}
        />
        <Button onClick={handleDashboardProgress} style={{ marginRight: '10px' }}>
          更新进度
        </Button>
        <Button onClick={handleStartAnimation} style={{ marginRight: '10px' }}>
          开始动画
        </Button>
        <Button onClick={handleResetProgress}>
          重置
        </Button>
      </View>

      {/* 成功进度示例 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>成功进度示例</Text>
        <Progress
          type="line"
          percent={80}
          successPercent={60}
          status="normal"
          title="上传进度"
          description="已完成 60%，总计 80%"
          style={{ marginBottom: '10px' }}
        />
      </View>

      {/* 自定义样式示例 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>自定义样式示例</Text>
        <Progress
          type="line"
          percent={90}
          strokeColor="#ec4899"
          trailColor="#fce7f3"
          strokeWidth={12}
          strokeLinecap="square"
          style={{ marginBottom: '10px' }}
        />
      </View>

      {/* 隐藏信息示例 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>隐藏进度信息</Text>
        <Progress
          type="line"
          percent={70}
          showInfo={false}
          style={{ marginBottom: '10px' }}
        />
      </View>

      {/* 完整功能示例 */}
      <View style={{ marginBottom: '30px' }}>
        <Text style={{ fontSize: '18px', marginBottom: '10px' }}>完整功能示例</Text>
        <Progress
          type="line"
          percent={85}
          status="active"
          size="lg"
          strokeColor={gradient}
          animated={true}
          title="综合示例"
          description="包含多种功能的进度条"
          format={(percent) => `已完成 ${percent}%`}
          style={{ marginBottom: '10px' }}
        />
      </View>
    </View>
  );
};

export default ProgressExample;