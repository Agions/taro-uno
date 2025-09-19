/**
 * 测试 Icon 组件的无障碍属性类型
 */
import { Icon } from './Icon';

// 测试基本的无障碍属性
const TestIcon = () => {
  return (
    <div>
      {/* 基本无障碍属性 */}
      <Icon
        source="home"
        accessible={true}
        accessibilityLabel="主页图标"
        accessibilityRole="button"
      />

      {/* 完整的无障碍属性 */}
      <Icon
        source="settings"
        accessible={true}
        accessibilityLabel="设置图标"
        accessibilityRole="button"
        accessibilityHint="点击打开设置页面"
        accessibilityState={{
          disabled: false,
          selected: true,
          busy: false,
          expanded: false
        }}
        accessibilityValue={{
          min: 0,
          max: 100,
          now: 50,
          text: '设置'
        }}
        accessibilityId="settings-icon"
        accessibilityActions={[
          { name: 'activate', label: '激活' },
          { name: 'deactivate', label: '停用' }
        ]}
        accessibilityLiveRegion="polite"
        accessibilityImportant={true}
        accessibilityViewIsModal={false}
        accessibilityElementsHidden={false}
      />

      {/* 禁用状态 */}
      <Icon
        source="lock"
        accessible={true}
        accessibilityLabel="锁定图标"
        accessibilityRole="img"
        accessibilityState={{
          disabled: true,
          busy: false
        }}
      />

      {/* 加载状态 */}
      <Icon
        source="loading"
        accessible={true}
        accessibilityLabel="加载中"
        accessibilityRole="img"
        accessibilityState={{
          disabled: false,
          busy: true
        }}
      />
    </div>
  );
};

export default TestIcon;
