import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { AppProvider, useAppContext } from './AppProvider';

vi.mock('../platform', () => ({
  getPlatformInfo: () => ({
    platform: 'h5',
    isMiniProgram: false,
    isH5: true,
    isRN: false,
  }),
  getPlatformName: () => 'H5',
}));

const TestHarness: React.FC = () => {
  const { theme, platform, isReady } = useAppContext();

  if (!isReady) {
    return <span data-testid="loading">loading</span>;
  }

  return (
    <div>
      <span data-testid="platform">{platform.name}</span>
      <button data-testid="theme" onClick={theme.toggleTheme}>
        {theme.isDark ? 'To light' : 'To dark'}
      </button>
    </div>
  );
};

const renderProvider = () =>
  render(
    <AppProvider>
      <TestHarness />
    </AppProvider>
  );

describe('AppProvider', () => {
  it('initialises and exposes platform info', async () => {
    renderProvider();

    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());

    expect(screen.getByTestId('platform').textContent).toBe('H5');
  });

  it('toggles theme mode via context', async () => {
    renderProvider();

    const themeButton = await screen.findByTestId('theme');

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    await userEvent.click(themeButton);

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });
});
