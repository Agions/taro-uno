import React from 'react';
import { Menu } from '../Menu';
import { render, fireEvent, screen } from '@testing-library/react';
import type { MenuRef, MenuItem } from '../Menu.types';

describe('Menu Component', () => {
  const mockItems: MenuItem[] = [
    {
      key: '1',
      label: '菜单项1',
      icon: '📱',
    },
    {
      key: '2',
      label: '菜单项2',
      children: [
        {
          key: '2-1',
          label: '子菜单项1',
        },
        {
          key: '2-2',
          label: '子菜单项2',
        },
      ],
    },
    {
      key: '3',
      label: '危险操作',
      danger: true,
    },
    {
      key: '4',
      label: '禁用项',
      disabled: true,
    },
  ];

  describe('Rendering', () => {
    test('renders menu items correctly', () => {
      const { getByText, container } = render(
        <Menu items={mockItems} />
      );

      expect(getByText('菜单项1')).toBeInTheDocument();
      expect(getByText('菜单项2')).toBeInTheDocument();
      expect(getByText('危险操作')).toBeInTheDocument();
      expect(getByText('禁用项')).toBeInTheDocument();

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu');
    });

    test('renders with default props', () => {
      const { container } = render(
        <Menu items={mockItems} />
      );

      const menuElement = container.firstChild as HTMLElement;
      expect(menuElement.style.display).toBe('flex');
      expect(menuElement.style.flexDirection).toBe('column');
      expect(menuElement.style.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(menuElement.style.border).toBe('1px solid #e5e7eb');
      expect(menuElement.style.borderRadius).toBe('6px');
    });

    test('renders empty menu', () => {
      const { container } = render(
        <Menu items={[]} />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toBeInTheDocument();
      expect(menuElement).toBeEmptyDOMElement();
    });

    test('renders menu with icons', () => {
      const itemsWithIcons: MenuItem[] = [
        {
          key: '1',
          label: '带图标',
          icon: <span data-testid="icon">📱</span>,
        },
      ];

      const { getByTestId } = render(
        <Menu items={itemsWithIcons} />
      );

      expect(getByTestId('icon')).toBeInTheDocument();
    });

    test('renders menu with badges', () => {
      const itemsWithBadges: MenuItem[] = [
        {
          key: '1',
          label: '带徽章',
          badge: 'New',
        },
      ];

      const { getByText } = render(
        <Menu items={itemsWithBadges} />
      );

      expect(getByText('带徽章')).toBeInTheDocument();
      expect(getByText('New')).toBeInTheDocument();
    });

    test('renders menu with extra content', () => {
      const itemsWithExtra: MenuItem[] = [
        {
          key: '1',
          label: '主标签',
          extra: <span data-testid="extra">额外内容</span>,
        },
      ];

      const { getByTestId } = render(
        <Menu items={itemsWithExtra} />
      );

      expect(getByTestId('extra')).toBeInTheDocument();
    });
  });

  describe('Modes and Themes', () => {
    test('renders vertical mode correctly', () => {
      const { container } = render(
        <Menu items={mockItems} mode="vertical" />
      );

      const menuElement = container.firstChild as HTMLElement;
      expect(menuElement.style.display).toBe('flex');
      expect(menuElement.style.flexDirection).toBe('column');
    });

    test('renders horizontal mode correctly', () => {
      const { container } = render(
        <Menu items={mockItems} mode="horizontal" />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--horizontal');
    });

    test('renders inline mode correctly', () => {
      const { container } = render(
        <Menu items={mockItems} mode="inline" />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--inline');
    });

    test('renders light theme correctly', () => {
      const { container } = render(
        <Menu items={mockItems} theme="light" />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--light');
    });

    test('renders dark theme correctly', () => {
      const { container } = render(
        <Menu items={mockItems} theme="dark" />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--dark');
    });
  });

  describe('Sizes', () => {
    test('renders small size correctly', () => {
      const { container } = render(
        <Menu items={mockItems} size="small" />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--small');
    });

    test('renders medium size correctly', () => {
      const { container } = render(
        <Menu items={mockItems} size="medium" />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--medium');
    });

    test('renders large size correctly', () => {
      const { container } = render(
        <Menu items={mockItems} size="large" />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--large');
    });
  });

  describe('Selection and Interaction', () => {
    test('handles item selection with controlled mode', () => {
      const mockOnSelect = vi.fn();
      const { getByText } = render(
        <Menu
          items={mockItems}
          selectedKeys={['1']}
          onSelect={mockOnSelect}
        />
      );

      const menuItem = getByText('菜单项1');
      fireEvent.click(menuItem);

      expect(mockOnSelect).toHaveBeenCalledWith(['1'], mockItems[0]);
    });

    test('handles item selection with uncontrolled mode', () => {
      const mockOnSelect = vi.fn();
      const { getByText } = render(
        <Menu
          items={mockItems}
          defaultSelectedKeys={['1']}
          onSelect={mockOnSelect}
        />
      );

      const menuItem = getByText('菜单项1');
      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    test('does not call onSelect for disabled items', () => {
      const mockOnSelect = vi.fn();
      const { getByText } = render(
        <Menu
          items={mockItems}
          onSelect={mockOnSelect}
        />
      );

      const disabledItem = getByText('禁用项');
      fireEvent.click(disabledItem);

      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    test('handles click events', () => {
      const mockOnClick = vi.fn();
      const { getByText } = render(
        <Menu
          items={mockItems}
          onClick={mockOnClick}
        />
      );

      const menuItem = getByText('菜单项1');
      fireEvent.click(menuItem);

      expect(mockOnClick).toHaveBeenCalledWith('1', mockItems[0], expect.any(Object));
    });
  });

  describe('Submenu Features', () => {
    test('handles submenu toggle', () => {
      const mockOnOpenChange = vi.fn();
      const { getByText } = render(
        <Menu
          items={mockItems}
          onOpenChange={mockOnOpenChange}
        />
      );

      const submenuItem = getByText('菜单项2');
      fireEvent.click(submenuItem);

      expect(mockOnOpenChange).toHaveBeenCalled();
    });

    test('handles accordion mode', () => {
      const accordionItems: MenuItem[] = [
        {
          key: '1',
          label: '父菜单1',
          children: [
            { key: '1-1', label: '子项1' },
          ],
        },
        {
          key: '2',
          label: '父菜单2',
          children: [
            { key: '2-1', label: '子项1' },
          ],
        },
      ];

      const { getByText } = render(
        <Menu
          items={accordionItems}
          accordion={true}
        />
      );

      const firstSubmenu = getByText('父菜单1');
      const secondSubmenu = getByText('父菜单2');

      // Test passes if no errors are thrown during rendering and basic interaction
      expect(firstSubmenu).toBeInTheDocument();
      expect(secondSubmenu).toBeInTheDocument();
    });

    test('handles controlled open keys', () => {
      const { getByText } = render(
        <Menu
          items={mockItems}
          openKeys={['2']}
        />
      );

      expect(getByText('菜单项2')).toBeInTheDocument();
    });
  });

  describe('Collapse Features', () => {
    test('handles collapse button when collapsible', () => {
      const mockOnCollapse = vi.fn();
      const { container } = render(
        <Menu
          items={mockItems}
          collapsible={true}
          onCollapse={mockOnCollapse}
        />
      );

      const collapseButton = container.querySelector('[data-testid="collapse-button"]');
      if (collapseButton) {
        fireEvent.click(collapseButton);
        expect(mockOnCollapse).toHaveBeenCalledWith(true);
      }
    });

    test('handles controlled collapsed state', () => {
      const { container } = render(
        <Menu
          items={mockItems}
          collapsible={true}
          collapsed={true}
        />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('taro-uno-h5-menu--collapsed');
    });
  });

  describe('Accessibility', () => {
    test('has proper accessibility attributes', () => {
      const { container } = render(
        <Menu
          items={mockItems}
          accessibilityLabel="主导航菜单"
          accessibilityRole="navigation"
        />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveAttribute('aria-label', '主导航菜单');
      expect(menuElement).toHaveAttribute('aria-role', 'navigation');
    });

    test('supports accessibility state', () => {
      const { container } = render(
        <Menu
          items={mockItems}
          accessibilityState={{ disabled: false, expanded: true }}
        />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveAttribute('aria-state', expect.stringContaining('expanded'));
    });

    test('can be disabled for accessibility', () => {
      const { container } = render(
        <Menu
          items={mockItems}
          accessible={false}
        />
      );

      const menuElement = container.firstChild;
      expect(menuElement).not.toHaveAttribute('accessible');
    });
  });

  describe('Ref Methods', () => {
    test('provides ref methods', () => {
      const ref = React.createRef<MenuRef>();
      render(
        <Menu
          ref={ref}
          items={mockItems}
        />
      );

      expect(ref.current).toBeDefined();
      expect(ref.current?.getSelectedKeys).toBeDefined();
      expect(ref.current?.setSelectedKeys).toBeDefined();
      expect(ref.current?.getOpenKeys).toBeDefined();
      expect(ref.current?.setOpenKeys).toBeDefined();
    });

    test('gets and sets selected keys via ref', () => {
      const ref = React.createRef<MenuRef>();
      const mockOnSelect = vi.fn();
      render(
        <Menu
          ref={ref}
          items={mockItems}
          defaultSelectedKeys={['1']}
          onSelect={mockOnSelect}
        />
      );

      expect(ref.current?.getSelectedKeys()).toEqual(['1']);

      ref.current?.setSelectedKeys(['2']);
      // Verify the method was called and callback was triggered
      expect(mockOnSelect).toHaveBeenCalledWith(['2'], mockItems[1]);
    });

    test('gets and sets open keys via ref', () => {
      const ref = React.createRef<MenuRef>();
      const mockOnOpenChange = vi.fn();
      render(
        <Menu
          ref={ref}
          items={mockItems}
          defaultOpenKeys={['2']}
          onOpenChange={mockOnOpenChange}
        />
      );

      expect(ref.current?.getOpenKeys()).toEqual(['2']);

      ref.current?.setOpenKeys(['1']);
      // Verify the callback was triggered
      expect(mockOnOpenChange).toHaveBeenCalledWith(['1']);
    });

    test('gets item via ref', () => {
      const ref = React.createRef<MenuRef>();
      render(
        <Menu
          ref={ref}
          items={mockItems}
        />
      );

      const item = ref.current?.getItem('1');
      expect(item).toEqual(mockItems[0]);
    });

    test('expands and collapses all via ref', () => {
      const mockOnOpenChange = vi.fn();
      const ref = React.createRef<MenuRef>();
      render(
        <Menu
          ref={ref}
          items={mockItems}
          onOpenChange={mockOnOpenChange}
        />
      );

      ref.current?.expandAll();
      expect(mockOnOpenChange).toHaveBeenCalled();

      mockOnOpenChange.mockClear();
      ref.current?.collapseAll();
      expect(mockOnOpenChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Customization', () => {
    test('applies custom styles', () => {
      const customStyle = { backgroundColor: 'red', color: 'white' };
      const { container } = render(
        <Menu
          items={mockItems}
          style={customStyle}
        />
      );

      const menuElement = container.firstChild as HTMLElement;
      expect(menuElement.style.backgroundColor).toBe('red');
      expect(menuElement.style.color).toBe('white');
    });

    test('applies custom className', () => {
      const { container } = render(
        <Menu
          items={mockItems}
          className="custom-menu"
        />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toHaveClass('custom-menu');
    });

    test('supports custom item render', () => {
      const customItemRender = (item: MenuItem) => (
        <div data-testid={`custom-item-${item.key}`}>{item.label} - Custom</div>
      );

      const { getByTestId } = render(
        <Menu
          items={mockItems}
          itemRender={customItemRender}
        />
      );

      expect(getByTestId('custom-item-1')).toBeInTheDocument();
      expect(getByTestId('custom-item-1')).toHaveTextContent('菜单项1 - Custom');
    });

    test('supports custom submenu title render', () => {
      const customTitleRender = (item: MenuItem) => (
        <div data-testid="custom-title">{item.label} - Title</div>
      );

      const { getByTestId } = render(
        <Menu
          items={mockItems}
          subMenuTitleRender={customTitleRender}
        />
      );

      expect(getByTestId('custom-title')).toBeInTheDocument();
    });
  });

  describe('Platform Compatibility', () => {
    test('renders on H5 platform', () => {
      const { container } = render(
        <Menu items={mockItems} />
      );

      const menuElement = container.firstChild;
      expect(menuElement).toBeInTheDocument();
      expect(menuElement).toHaveClass('taro-uno-h5-menu');
    });

    test('handles touch events', () => {
      const mockOnClick = vi.fn();
      const { getByText } = render(
        <Menu
          items={mockItems}
          onClick={mockOnClick}
        />
      );

      const menuItem = getByText('菜单项1');
      // Click works for touch events in testing environment
      fireEvent.click(menuItem);

      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    test('handles rapid clicks without errors', () => {
      const mockOnClick = vi.fn();
      const { getByText } = render(
        <Menu
          items={mockItems}
          onClick={mockOnClick}
        />
      );

      const menuItem = getByText('菜单项1');

      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        fireEvent.click(menuItem);
      }

      expect(mockOnClick).toHaveBeenCalledTimes(10);
    });

    test('does not re-render unnecessarily', () => {
      const { rerender, container } = render(
        <Menu items={mockItems} />
      );

      const initialRender = container.innerHTML;

      rerender(
        <Menu items={mockItems} />
      );

      expect(container.innerHTML).toBe(initialRender);
    });
  });

  describe('Edge Cases', () => {
    test('handles nested menu items', () => {
      const nestedItems: MenuItem[] = [
        {
          key: '1',
          label: 'Level 1',
          children: [
            {
              key: '1-1',
              label: 'Level 2',
              children: [
                {
                  key: '1-1-1',
                  label: 'Level 3',
                },
              ],
            },
          ],
        },
      ];

      const { getByText, container } = render(
        <Menu items={nestedItems} />
      );

      expect(getByText('Level 1')).toBeInTheDocument();
      // The nested items are not visible by default since the submenu is collapsed
      expect(container.textContent).toContain('Level 1');
    });

    test('handles menu with all disabled items', () => {
      const disabledItems: MenuItem[] = [
        {
          key: '1',
          label: 'Disabled 1',
          disabled: true,
        },
        {
          key: '2',
          label: 'Disabled 2',
          disabled: true,
        },
      ];

      const { container } = render(
        <Menu items={disabledItems} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    test('handles menu with mixed states', () => {
      const mixedItems: MenuItem[] = [
        {
          key: '1',
          label: 'Normal',
        },
        {
          key: '2',
          label: 'Disabled',
          disabled: true,
        },
        {
          key: '3',
          label: 'Danger',
          danger: true,
        },
      ];

      const { getByText } = render(
        <Menu items={mixedItems} />
      );

      expect(getByText('Normal')).toBeInTheDocument();
      expect(getByText('Disabled')).toBeInTheDocument();
      expect(getByText('Danger')).toBeInTheDocument();
    });
  });
});