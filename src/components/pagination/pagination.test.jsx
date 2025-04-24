import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination';

describe('Pagination', () => {
    const defaultProps = {
        currentPage: 1,
        totalPages: 3,
        onPageChange: jest.fn(),
    };

    beforeEach(() => {
        defaultProps.onPageChange.mockClear();
    });

    it('renders pagination controls', () => {
        render(<Pagination {...defaultProps} />);

        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('disables Previous button on first page', () => {
        render(<Pagination {...defaultProps} currentPage={1} />);

        expect(screen.getByText('Previous')).toBeDisabled();
        expect(screen.getByText('Next')).not.toBeDisabled();
    });

    it('disables Next button on last page', () => {
        render(<Pagination {...defaultProps} currentPage={3} />);

        expect(screen.getByText('Previous')).not.toBeDisabled();
        expect(screen.getByText('Next')).toBeDisabled();
    });

    it('calls onPageChange with correct page number when clicking page buttons', () => {
        render(<Pagination {...defaultProps} />);

        fireEvent.click(screen.getByText('2'));
        expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange with correct page when clicking Next', () => {
        render(<Pagination {...defaultProps} currentPage={1} />);

        fireEvent.click(screen.getByText('Next'));
        expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange with correct page when clicking Previous', () => {
        render(<Pagination {...defaultProps} currentPage={2} />);

        fireEvent.click(screen.getByText('Previous'));
        expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
    });

    it('highlights current page button', () => {
        render(<Pagination {...defaultProps} currentPage={2} />);

        const pageButtons = screen.getAllByRole('button').filter(button => !['Previous', 'Next'].includes(button.textContent));

        expect(pageButtons[1]).toHaveClass('active'); // Second page button should be active
        expect(pageButtons[0]).not.toHaveClass('active');
        expect(pageButtons[2]).not.toHaveClass('active');
    });
}); 