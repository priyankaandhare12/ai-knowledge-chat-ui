import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, InputProps } from '@/components/ui/input';

// Helper function to render Input with props
const renderInput = (props: InputProps & { 'data-testid'?: string } = {}) => {
  return render(<Input {...props} />);
};

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render input with default props', () => {
      renderInput({ 'data-testid': 'test-input' });

      const input = screen.getByTestId('test-input');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('should apply default classes', () => {
      renderInput({ 'data-testid': 'test-input' });

      const input = screen.getByTestId('test-input');
      expect(input).toHaveClass('flex');
      expect(input).toHaveClass('h-10');
      expect(input).toHaveClass('w-full');
      expect(input).toHaveClass('rounded-md');
      expect(input).toHaveClass('border');
      expect(input).toHaveClass('border-input');
      expect(input).toHaveClass('bg-background');
      expect(input).toHaveClass('px-3');
      expect(input).toHaveClass('py-2');
      expect(input).toHaveClass('text-sm');
    });

    it('should apply custom className along with default classes', () => {
      renderInput({
        className: 'custom-class',
        'data-testid': 'test-input',
      });

      const input = screen.getByTestId('test-input');
      expect(input).toHaveClass('custom-class');
      expect(input).toHaveClass('flex'); // Should still have default classes
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<Input ref={ref} />);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });

  describe('Input Types', () => {
    it('should render with text type by default', () => {
      renderInput({ 'data-testid': 'test-input' });

      const input = screen.getByTestId('test-input') as HTMLInputElement;
      expect(input.type).toBe('text'); // Check the input.type property instead
    });

    it('should render with specified input type', () => {
      renderInput({
        type: 'email',
        'data-testid': 'email-input',
      });

      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should handle different input types correctly', () => {
      const types = ['password', 'number', 'tel', 'url', 'search'];

      types.forEach(type => {
        renderInput({
          type: type as React.HTMLInputTypeAttribute,
          'data-testid': `${type}-input`,
        });

        const input = screen.getByTestId(`${type}-input`);
        expect(input).toHaveAttribute('type', type);
      });
    });

    it('should handle file input type with proper styling', () => {
      renderInput({
        type: 'file',
        'data-testid': 'file-input',
      });

      const input = screen.getByTestId('file-input');
      expect(input).toHaveAttribute('type', 'file');
      expect(input).toHaveClass('file:border-0');
      expect(input).toHaveClass('file:bg-transparent');
      expect(input).toHaveClass('file:text-sm');
      expect(input).toHaveClass('file:font-medium');
    });
  });

  describe('States', () => {
    it('should handle disabled state correctly', () => {
      renderInput({
        disabled: true,
        'data-testid': 'disabled-input',
      });

      const input = screen.getByTestId('disabled-input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:cursor-not-allowed');
      expect(input).toHaveClass('disabled:opacity-50');
    });

    it('should be focusable when not disabled', async () => {
      const user = userEvent.setup();
      renderInput({ 'data-testid': 'focusable-input' });

      const input = screen.getByTestId('focusable-input');
      await user.click(input);

      expect(input).toHaveFocus();
    });

    it('should not be focusable when disabled', async () => {
      const user = userEvent.setup();
      renderInput({
        disabled: true,
        'data-testid': 'disabled-input',
      });

      const input = screen.getByTestId('disabled-input');
      await user.click(input);

      expect(input).not.toHaveFocus();
    });

    it('should handle readonly state', () => {
      renderInput({
        readOnly: true,
        value: 'Read only value',
        'data-testid': 'readonly-input',
      });

      const input = screen.getByTestId('readonly-input') as HTMLInputElement;
      expect(input).toHaveAttribute('readonly');
      expect(input.value).toBe('Read only value');
    });
  });

  describe('Values and Placeholder', () => {
    it('should display placeholder text', () => {
      renderInput({
        placeholder: 'Enter your text here',
        'data-testid': 'placeholder-input',
      });

      const input = screen.getByTestId('placeholder-input');
      expect(input).toHaveAttribute('placeholder', 'Enter your text here');
    });

    it('should handle default value', () => {
      renderInput({
        defaultValue: 'Default text',
        'data-testid': 'default-value-input',
      });

      const input = screen.getByTestId('default-value-input') as HTMLInputElement;
      expect(input.value).toBe('Default text');
    });

    it('should handle controlled value', () => {
      const { rerender } = renderInput({
        value: 'Initial value',
        onChange: () => {}, // Add onChange to avoid React warnings
        'data-testid': 'controlled-input',
      });

      let input = screen.getByTestId('controlled-input') as HTMLInputElement;
      expect(input.value).toBe('Initial value');

      rerender(<Input value="Updated value" onChange={() => {}} data-testid="controlled-input" />);

      input = screen.getByTestId('controlled-input') as HTMLInputElement;
      expect(input.value).toBe('Updated value');
    });

    it('should have placeholder styling classes', () => {
      renderInput({
        placeholder: 'Styled placeholder',
        'data-testid': 'styled-input',
      });

      const input = screen.getByTestId('styled-input');
      expect(input).toHaveClass('placeholder:text-muted-foreground');
    });
  });

  describe('User Interactions', () => {
    it('should handle text input correctly', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      renderInput({
        onChange: handleChange,
        'data-testid': 'interactive-input',
      });

      const input = screen.getByTestId('interactive-input');
      await user.type(input, 'Hello World');

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('Hello World');
    });

    it('should handle focus and blur events', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();

      renderInput({
        onFocus: handleFocus,
        onBlur: handleBlur,
        'data-testid': 'focus-input',
      });

      const input = screen.getByTestId('focus-input');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should handle keyboard events', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      const handleKeyUp = jest.fn();

      renderInput({
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
        'data-testid': 'keyboard-input',
      });

      const input = screen.getByTestId('keyboard-input');
      await user.click(input);
      await user.keyboard('a');

      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleKeyUp).toHaveBeenCalled();
    });

    it('should not trigger events when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const handleFocus = jest.fn();

      renderInput({
        disabled: true,
        onChange: handleChange,
        onFocus: handleFocus,
        'data-testid': 'disabled-input',
      });

      const input = screen.getByTestId('disabled-input');
      await user.click(input);
      await user.type(input, 'test');

      expect(handleFocus).not.toHaveBeenCalled();
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('HTML Attributes', () => {
    it('should pass through HTML input attributes', () => {
      renderInput({
        id: 'test-input-id',
        name: 'testInput',
        required: true,
        maxLength: 100,
        minLength: 2,
        pattern: '[A-Za-z]+',
        'data-testid': 'attributes-input',
      });

      const input = screen.getByTestId('attributes-input');
      expect(input).toHaveAttribute('id', 'test-input-id');
      expect(input).toHaveAttribute('name', 'testInput');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('maxlength', '100');
      expect(input).toHaveAttribute('minlength', '2');
      expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
    });

    it('should support form association', () => {
      render(
        <div>
          <form id="test-form"></form>
          <Input form="test-form" data-testid="form-input" />
        </div>
      );

      const input = screen.getByTestId('form-input');
      expect(input).toHaveAttribute('form', 'test-form');
    });

    it('should handle autoComplete attribute', () => {
      renderInput({
        autoComplete: 'email',
        'data-testid': 'autocomplete-input',
      });

      const input = screen.getByTestId('autocomplete-input');
      expect(input).toHaveAttribute('autocomplete', 'email');
    });
  });

  describe('Accessibility', () => {
    it('should support ARIA attributes', () => {
      renderInput({
        'aria-label': 'Search input',
        'aria-describedby': 'search-help',
        'aria-required': true,
        'data-testid': 'aria-input',
      });

      const input = screen.getByTestId('aria-input');
      expect(input).toHaveAttribute('aria-label', 'Search input');
      expect(input).toHaveAttribute('aria-describedby', 'search-help');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('should have proper focus styling', () => {
      renderInput({ 'data-testid': 'focus-styled-input' });

      const input = screen.getByTestId('focus-styled-input');
      expect(input).toHaveClass('focus-visible:outline-none');
      expect(input).toHaveClass('focus-visible:ring-2');
      expect(input).toHaveClass('focus-visible:ring-ring');
      expect(input).toHaveClass('focus-visible:ring-offset-2');
    });

    it('should work with labels', () => {
      render(
        <div>
          <label htmlFor="labeled-input">Input Label</label>
          <Input id="labeled-input" data-testid="labeled-input" />
        </div>
      );

      const label = screen.getByText('Input Label');
      const input = screen.getByTestId('labeled-input');

      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'labeled-input');
      expect(label).toHaveAttribute('for', 'labeled-input');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty props gracefully', () => {
      expect(() => renderInput()).not.toThrow();

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should handle null/undefined values', () => {
      renderInput({
        value: undefined,
        placeholder: undefined,
        'data-testid': 'null-input',
      });

      const input = screen.getByTestId('null-input');
      expect(input).toBeInTheDocument();
    });

    it('should handle very long values', () => {
      const longValue = 'a'.repeat(1000);
      renderInput({
        value: longValue,
        onChange: () => {},
        'data-testid': 'long-value-input',
      });

      const input = screen.getByTestId('long-value-input') as HTMLInputElement;
      expect(input.value).toBe(longValue);
    });

    it('should handle special characters in values', () => {
      const specialValue = '!@#$%^&*()_+{}|:"<>?[]\\;\',./ ñáéíóú';
      renderInput({
        value: specialValue,
        onChange: () => {},
        'data-testid': 'special-chars-input',
      });

      const input = screen.getByTestId('special-chars-input') as HTMLInputElement;
      expect(input.value).toBe(specialValue);
    });
  });
});
