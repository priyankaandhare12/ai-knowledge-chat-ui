import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('should render card with default classes', () => {
      render(
        <Card data-testid="test-card">
          <p>Card content</p>
        </Card>
      );

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('bg-card');
      expect(card).toHaveClass('text-card-foreground');
      expect(card).toHaveClass('shadow-sm');
    });

    it('should apply custom className along with default classes', () => {
      render(
        <Card className="custom-class" data-testid="test-card">
          <p>Card content</p>
        </Card>
      );

      const card = screen.getByTestId('test-card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('rounded-lg'); // Should still have default classes
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<Card ref={ref}>Card content</Card>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('should pass through HTML div attributes', () => {
      render(
        <Card id="test-card" role="article" aria-label="Test card" data-testid="test-card">
          Card content
        </Card>
      );

      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('id', 'test-card');
      expect(card).toHaveAttribute('role', 'article');
      expect(card).toHaveAttribute('aria-label', 'Test card');
    });
  });

  describe('CardHeader', () => {
    it('should render card header with default classes', () => {
      render(
        <CardHeader data-testid="test-header">
          <h2>Card Header</h2>
        </CardHeader>
      );

      const header = screen.getByTestId('test-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
      expect(header).toHaveClass('space-y-1.5');
      expect(header).toHaveClass('p-6');
    });

    it('should apply custom className', () => {
      render(
        <CardHeader className="custom-header" data-testid="test-header">
          Header content
        </CardHeader>
      );

      const header = screen.getByTestId('test-header');
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass('p-6'); // Should still have default classes
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<CardHeader ref={ref}>Header content</CardHeader>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('CardTitle', () => {
    it('should render as h3 element with default classes', () => {
      render(<CardTitle data-testid="test-title">Card Title</CardTitle>);

      const title = screen.getByTestId('test-title');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H3');
      expect(title).toHaveClass('text-2xl');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('leading-none');
      expect(title).toHaveClass('tracking-tight');
    });

    it('should apply custom className', () => {
      render(
        <CardTitle className="custom-title" data-testid="test-title">
          Title content
        </CardTitle>
      );

      const title = screen.getByTestId('test-title');
      expect(title).toHaveClass('custom-title');
      expect(title).toHaveClass('text-2xl'); // Should still have default classes
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<CardTitle ref={ref}>Title content</CardTitle>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLHeadingElement));
    });

    it('should pass through HTML heading attributes', () => {
      render(
        <CardTitle id="test-title" data-testid="test-title">
          Title content
        </CardTitle>
      );

      const title = screen.getByTestId('test-title');
      expect(title).toHaveAttribute('id', 'test-title');
    });
  });

  describe('CardDescription', () => {
    it('should render as p element with default classes', () => {
      render(
        <CardDescription data-testid="test-description">Card description text</CardDescription>
      );

      const description = screen.getByTestId('test-description');
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('text-sm');
      expect(description).toHaveClass('text-muted-foreground');
    });

    it('should apply custom className', () => {
      render(
        <CardDescription className="custom-description" data-testid="test-description">
          Description content
        </CardDescription>
      );

      const description = screen.getByTestId('test-description');
      expect(description).toHaveClass('custom-description');
      expect(description).toHaveClass('text-sm'); // Should still have default classes
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<CardDescription ref={ref}>Description content</CardDescription>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLParagraphElement));
    });
  });

  describe('CardContent', () => {
    it('should render card content with default classes', () => {
      render(
        <CardContent data-testid="test-content">
          <p>Main card content</p>
        </CardContent>
      );

      const content = screen.getByTestId('test-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6');
      expect(content).toHaveClass('pt-0');
    });

    it('should apply custom className', () => {
      render(
        <CardContent className="custom-content" data-testid="test-content">
          Content
        </CardContent>
      );

      const content = screen.getByTestId('test-content');
      expect(content).toHaveClass('custom-content');
      expect(content).toHaveClass('p-6'); // Should still have default classes
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<CardContent ref={ref}>Content</CardContent>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('CardFooter', () => {
    it('should render card footer with default classes', () => {
      render(
        <CardFooter data-testid="test-footer">
          <button>Footer button</button>
        </CardFooter>
      );

      const footer = screen.getByTestId('test-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('items-center');
      expect(footer).toHaveClass('p-6');
      expect(footer).toHaveClass('pt-0');
    });

    it('should apply custom className', () => {
      render(
        <CardFooter className="custom-footer" data-testid="test-footer">
          Footer content
        </CardFooter>
      );

      const footer = screen.getByTestId('test-footer');
      expect(footer).toHaveClass('custom-footer');
      expect(footer).toHaveClass('flex'); // Should still have default classes
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<CardFooter ref={ref}>Footer content</CardFooter>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('Complete Card Structure', () => {
    it('should render complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Test Card Title</CardTitle>
            <CardDescription>Test card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the main content of the card.</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      );

      const card = screen.getByTestId('complete-card');
      expect(card).toBeInTheDocument();

      const title = screen.getByText('Test Card Title');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H3');

      const description = screen.getByText('Test card description');
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');

      const content = screen.getByText('This is the main content of the card.');
      expect(content).toBeInTheDocument();

      const button = screen.getByRole('button', { name: 'Action Button' });
      expect(button).toBeInTheDocument();
    });

    it('should handle nested card structures', () => {
      render(
        <div>
          <Card data-testid="outer-card">
            <CardHeader>
              <CardTitle>Outer Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Card data-testid="inner-card">
                <CardHeader>
                  <CardTitle>Inner Card</CardTitle>
                </CardHeader>
                <CardContent>Nested content</CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      );

      const outerCard = screen.getByTestId('outer-card');
      const innerCard = screen.getByTestId('inner-card');

      expect(outerCard).toBeInTheDocument();
      expect(innerCard).toBeInTheDocument();
      expect(outerCard).toContainElement(innerCard);
    });

    it('should handle cards with minimal structure', () => {
      render(
        <Card data-testid="minimal-card">
          <CardContent>Just content, no header or footer</CardContent>
        </Card>
      );

      const card = screen.getByTestId('minimal-card');
      expect(card).toBeInTheDocument();

      const content = screen.getByText('Just content, no header or footer');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should support ARIA attributes on card components', () => {
      render(
        <Card role="article" aria-labelledby="card-title" data-testid="accessible-card">
          <CardHeader>
            <CardTitle id="card-title">Accessible Card Title</CardTitle>
            <CardDescription>Card description for screen readers</CardDescription>
          </CardHeader>
          <CardContent>Card content that is accessible</CardContent>
        </Card>
      );

      const card = screen.getByTestId('accessible-card');
      expect(card).toHaveAttribute('role', 'article');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');

      const title = screen.getByText('Accessible Card Title');
      expect(title).toHaveAttribute('id', 'card-title');
    });
  });
});
