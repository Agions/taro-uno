// React is required for JSX
import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Debug Text Styles', () => {
  it('debug text styling issue', () => {
    const utils = render(
      <Divider
        textStyle={{ color: '#ff0000', fontSize: '16px' }}
        textBackground="#f0f0f0"
        textPadding="8px 16px"
        textBorderRadius={4}
      >
        Text Content
      </Divider>
    );
    const text = utils.container.querySelector('[data-testid="divider-text"]');
    console.log('Text element:', text);
    if (text) {
      console.log('Text style attribute:', text.getAttribute('style'));
    }
  });
});
