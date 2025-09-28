import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonProps } from '@/components/ui/button';

// Helper function to render Button with props
const renderButton = (props: Partial<ButtonProps> = {}) => {
  return render(<Button {...props} />);
};

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with default props', () => {
      renderButton({ children: 'Test Button' });

      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('inline-flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('justify-center');
    });

    it('should render as a child component when asChild prop is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<Button ref={ref}>Test Button</Button>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });

    it('should apply custom className along with default classes', () => {
      renderButton({
        children: 'Test Button',
        className: 'custom-class',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('inline-flex'); // Should still have default classes
    });
  });

  describe('Variants', () => {
    it('should apply default variant classes', () => {
      renderButton({ children: 'Default Button' });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
      expect(button).toHaveClass('text-primary-foreground');
    });

    it('should apply destructive variant classes', () => {
      renderButton({
        children: 'Destructive Button',
        variant: 'destructive',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive');
      expect(button).toHaveClass('text-destructive-foreground');
    });

    it('should apply outline variant classes', () => {
      renderButton({
        children: 'Outline Button',
        variant: 'outline',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-input');
      expect(button).toHaveClass('bg-background');
    });

    it('should apply secondary variant classes', () => {
      renderButton({
        children: 'Secondary Button',
        variant: 'secondary',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary');
      expect(button).toHaveClass('text-secondary-foreground');
    });

    it('should apply ghost variant classes', () => {
      renderButton({
        children: 'Ghost Button',
        variant: 'ghost',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent');
      expect(button).toHaveClass('hover:text-accent-foreground');
    });

    it('should apply link variant classes', () => {
      renderButton({
        children: 'Link Button',
        variant: 'link',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary');
      expect(button).toHaveClass('underline-offset-4');
    });
  });

  describe('Sizes', () => {
    it('should apply default size classes', () => {
      renderButton({ children: 'Default Size' });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10');
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('py-2');
    });

    it('should apply small size classes', () => {
      renderButton({
        children: 'Small Button',
        size: 'sm',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
      expect(button).toHaveClass('px-3');
    });

    it('should apply large size classes', () => {
      renderButton({
        children: 'Large Button',
        size: 'lg',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11');
      expect(button).toHaveClass('px-8');
    });

    it('should apply icon size classes', () => {
      renderButton({
        children: '🔍',
        size: 'icon',
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10');
      expect(button).toHaveClass('w-10');
    });
  });

  describe('States', () => {
    it('should handle disabled state correctly', () => {
      renderButton({
        children: 'Disabled Button',
        disabled: true,
      });

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none');
      expect(button).toHaveClass('disabled:opacity-50');
    });

    it('should be focusable when not disabled', async () => {
      const user = userEvent.setup();
      renderButton({ children: 'Focusable Button' });

      const button = screen.getByRole('button');
      await user.tab();

      expect(button).toHaveFocus();
    });

    it('should not be focusable when disabled', async () => {
      const user = userEvent.setup();
      renderButton({
        children: 'Disabled Button',
        disabled: true,
      });

      const button = screen.getByRole('button');
      await user.tab();

      expect(button).not.toHaveFocus();
    });
  });

  describe('Interactions', () => {
    it('should handle click events when enabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      renderButton({
        children: 'Clickable Button',
        onClick: handleClick,
      });

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not trigger click events when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      renderButton({
        children: 'Disabled Button',
        disabled: true,
        onClick: handleClick,
      });

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should handle keyboard events (Enter and Space)', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      renderButton({
        children: 'Keyboard Button',
        onClick: handleClick,
      });

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('HTML Attributes', () => {
    it('should pass through HTML button attributes', () => {
      renderButton({
        children: 'Button with attributes',
        type: 'submit',
        'aria-label': 'Submit form',
        'data-testid': 'submit-button',
      } as Partial<ButtonProps & { 'data-testid': string }>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-label', 'Submit form');
      expect(button).toHaveAttribute('data-testid', 'submit-button');
    });

    it('should support form association', () => {
      render(
        <div>
          <form id="test-form"></form>
          <Button form="test-form">External Button</Button>
        </div>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'test-form');
    });
  });

  describe('Accessibility', () => {
    it('should have proper focus indicators', () => {
      renderButton({ children: 'Focus Button' });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus-visible:outline-none');
      expect(button).toHaveClass('focus-visible:ring-2');
      expect(button).toHaveClass('focus-visible:ring-ring');
    });

    it('should support ARIA attributes', () => {
      renderButton({
        children: 'ARIA Button',
        'aria-describedby': 'button-description',
        'aria-pressed': true,
      });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'button-description');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Multiple Props Combinations', () => {
    it('should handle multiple variant and size combinations', () => {
      const { rerender } = renderButton({
        children: 'Test Button',
        variant: 'outline',
        size: 'lg',
      });

      let button = screen.getByRole('button');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-input'); // outline
      expect(button).toHaveClass('h-11');
      expect(button).toHaveClass('px-8'); // large

      rerender(
        <Button variant="destructive" size="sm">
          Test Button
        </Button>
      );

      button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive'); // destructive
      expect(button).toHaveClass('h-9'); // small
    });
  });
});
