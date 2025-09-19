export const stepsStyles = {
  steps: {
    display: 'flex',
  },
  stepsHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepsVertical: {
    flexDirection: 'column',
  },
  step: {
    flex: 1,
    position: 'relative',
  },
  stepHorizontal: {
    minWidth: 100,
  },
  stepVertical: {
    marginBottom: 16,
  },
  stepLast: {
    flex: 'none',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '1px solid #d9d9d9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  stepIconProcess: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    color: '#fff',
  },
  stepIconFinish: {
    backgroundColor: '#fff',
    borderColor: '#1890ff',
    color: '#1890ff',
  },
  stepIconError: {
    backgroundColor: '#fff',
    borderColor: '#ff4d4f',
    color: '#ff4d4f',
  },
  stepIconSmall: {
    width: 24,
    height: 24,
    fontSize: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  stepTitleProcess: {
    color: '#1890ff',
  },
  stepTitleFinish: {
    color: '#000',
  },
  stepTitleError: {
    color: '#ff4d4f',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  stepTail: {
    position: 'absolute',
    top: 16,
    left: '50%',
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  stepTailFinish: {
    backgroundColor: '#1890ff',
  },
  stepVerticalTail: {
    top: 32,
    left: 16,
    width: 1,
    height: '100%',
  },
}

export const getStepsStyle = (direction?: 'horizontal' | 'vertical', customStyle?: React.CSSProperties) => ({
  ...stepsStyles.steps,
  ...(direction === 'horizontal' && stepsStyles.stepsHorizontal),
  ...(direction === 'vertical' && stepsStyles.stepsVertical),
  ...customStyle,
})

export const getStepStyle = (direction?: 'horizontal' | 'vertical', isLast?: boolean, customStyle?: React.CSSProperties) => ({
  ...stepsStyles.step,
  ...(direction === 'horizontal' && stepsStyles.stepHorizontal),
  ...(direction === 'vertical' && stepsStyles.stepVertical),
  ...(isLast && stepsStyles.stepLast),
  ...customStyle,
})

export const getStepItemStyle = (customStyle?: React.CSSProperties) => ({
  ...stepsStyles.stepItem,
  ...customStyle,
})

export const getStepIconStyle = (status?: 'wait' | 'process' | 'finish' | 'error', size?: 'default' | 'small', customStyle?: React.CSSProperties) => ({
  ...stepsStyles.stepIcon,
  ...(status === 'process' && stepsStyles.stepIconProcess),
  ...(status === 'finish' && stepsStyles.stepIconFinish),
  ...(status === 'error' && stepsStyles.stepIconError),
  ...(size === 'small' && stepsStyles.stepIconSmall),
  ...customStyle,
})

export const getStepContentStyle = (customStyle?: React.CSSProperties) => ({
  ...stepsStyles.stepContent,
  ...customStyle,
})

export const getStepTitleStyle = (status?: 'wait' | 'process' | 'finish' | 'error', customStyle?: React.CSSProperties) => ({
  ...stepsStyles.stepTitle,
  ...(status === 'process' && stepsStyles.stepTitleProcess),
  ...(status === 'finish' && stepsStyles.stepTitleFinish),
  ...(status === 'error' && stepsStyles.stepTitleError),
  ...customStyle,
})

export const getStepDescriptionStyle = (customStyle?: React.CSSProperties) => ({
  ...stepsStyles.stepDescription,
  ...customStyle,
})

export const getStepTailStyle = (direction?: 'horizontal' | 'vertical', isFinish?: boolean, customStyle?: React.CSSProperties) => ({
  ...stepsStyles.stepTail,
  ...(isFinish && stepsStyles.stepTailFinish),
  ...(direction === 'vertical' && stepsStyles.stepVerticalTail),
  ...customStyle,
})