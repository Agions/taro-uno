import type { CSSProperties } from 'react';

export const calendarStyles: Record<string, CSSProperties> = {
  base: {
    backgroundColor: '#ffffff',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    padding: '16px',
    width: '100%',
    maxWidth: '400px',
  },
  
  // 头部
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    padding: '0 8px',
  },
  
  headerTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#262626',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  
  headerTitleHover: {
    backgroundColor: '#f5f5f5',
  },
  
  headerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#8c8c8c',
    transition: 'all 0.3s ease',
  },
  
  headerButtonHover: {
    backgroundColor: '#f5f5f5',
    color: '#262626',
  },
  
  headerButtonDisabled: {
    color: '#d9d9d9',
    cursor: 'not-allowed',
  },
  
  // 操作按钮组
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  todayButton: {
    padding: '4px 8px',
    fontSize: '12px',
    border: '1px solid #d9d9d9',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#1890ff',
    transition: 'all 0.3s ease',
  },
  
  todayButtonHover: {
    borderColor: '#1890ff',
    backgroundColor: '#f0f8ff',
  },
  
  // 星期头部
  weekHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    marginBottom: '8px',
  },
  
  weekHeaderCell: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#8c8c8c',
    fontWeight: '500',
    padding: '8px 4px',
  },
  
  // 日期网格
  dateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
  },
  
  // 月份网格
  monthGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  
  // 日期单元格
  dateCell: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '32px',
    padding: '4px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#262626',
    transition: 'all 0.3s ease',
    border: '1px solid transparent',
  },
  
  dateCellHover: {
    backgroundColor: '#f5f5f5',
  },
  
  dateCellToday: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
    fontWeight: '500',
  },
  
  dateCellSelected: {
    backgroundColor: '#1890ff',
    color: '#ffffff',
    fontWeight: '500',
  },
  
  dateCellDisabled: {
    color: '#d9d9d9',
    cursor: 'not-allowed',
    backgroundColor: 'transparent',
  },
  
  dateCellOtherMonth: {
    color: '#d9d9d9',
  },
  
  // 月份单元格
  monthCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#262626',
    transition: 'all 0.3s ease',
    border: '1px solid transparent',
  },
  
  monthCellHover: {
    backgroundColor: '#f5f5f5',
  },
  
  monthCellCurrent: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
    fontWeight: '500',
  },
  
  monthCellSelected: {
    backgroundColor: '#1890ff',
    color: '#ffffff',
    fontWeight: '500',
  },
  
  // 事件指示器
  eventIndicator: {
    position: 'absolute',
    bottom: '2px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '2px',
  },
  
  eventDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#1890ff',
  },
  
  eventDotDefault: {
    backgroundColor: '#d9d9d9',
  },
  
  eventDotPrimary: {
    backgroundColor: '#1890ff',
  },
  
  eventDotSuccess: {
    backgroundColor: '#52c41a',
  },
  
  eventDotWarning: {
    backgroundColor: '#faad14',
  },
  
  eventDotDanger: {
    backgroundColor: '#ff4d4f',
  },
  
  // 事件列表
  eventList: {
    marginTop: '16px',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '16px',
  },
  
  eventItem: {
    padding: '8px 12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  
  eventTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#262626',
    marginBottom: '4px',
  },
  
  eventDescription: {
    fontSize: '12px',
    color: '#8c8c8c',
    lineHeight: '1.4',
  },
  
  eventTime: {
    fontSize: '12px',
    color: '#8c8c8c',
    marginTop: '4px',
  },
};