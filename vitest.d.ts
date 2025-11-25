/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom/vitest';

declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toBeInTheDocument(): T;
      toHaveClass(...classNames: string[]): T;
      toHaveAttribute(attr: string, value?: string): T;
      toHaveStyle(style: string | Record<string, any>): T;
      toHaveTextContent(text: string | RegExp): T;
      toBeVisible(): T;
      toBeDisabled(): T;
      toBeEnabled(): T;
      toBeChecked(): T;
      toBePartiallyChecked(): T;
      toHaveValue(value: any): T;
      toHaveDisplayValue(value: string | string[]): T;
      toBeRequired(): T;
      toBeInvalid(): T;
      toBeValid(): T;
      toContainElement(element: HTMLElement | null): T;
      toContainHTML(html: string): T;
      toHaveAccessibleDescription(description?: string | RegExp): T;
      toHaveAccessibleName(name?: string | RegExp): T;
      toHaveErrorMessage(message?: string | RegExp): T;
      toHaveFocus(): T;
    }
  }
}
