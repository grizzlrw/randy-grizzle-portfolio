import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotesPage from './page';

jest.mock('@/lib/actions', () => ({
    fetchNotes: jest.fn().mockResolvedValue([
        {
            id: '1',
            title: 'Test Note',
            content: 'Test content',
            createdAt: '2025-11-16 22:22:01',
        },
    ]),
}));

// in a test file or jest.setup.ts
jest.mock("refractor", () => ({
  highlight: () => ({}),
  register: () => {},
}));

describe('Page', () => {
    it('renders the Notes header', async () => {
        const component = await NotesPage();
        render(component);
        
        const notes = screen.getByRole('heading', { name: /Notes/i });

        expect(notes).toBeInTheDocument();
    })

    it('renders a note', async () => {
        const component = await NotesPage();
        render(component);

        const note = screen.getByRole('heading', { name: /Test Note/i });

        expect(note).toBeInTheDocument();
    })

    it('renders no notes message when there are no notes', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { fetchNotes } = require('@/lib/actions');
        fetchNotes.mockResolvedValueOnce([]);
        const component = await NotesPage();
        render(component);

        const noNotesMessage = screen.getByText(/No notes yet./i);
        expect(noNotesMessage).toBeInTheDocument();
    })

    it('renders note creation date', async () => {
        const component = await NotesPage();
        render(component);

        const noteDateEl = screen.getByTestId('note-1-date');
        expect(noteDateEl).toBeInTheDocument(); // sanity check

        const dateText = noteDateEl.textContent;
        expect(dateText).toBeTruthy(); // not null / empty
    })

    // it('does not render an invalid date string', async () => {
    //     const component = await NotesPage();
    //     render(component);

    //     const noteDateEl = screen.getByTestId('note-1-date');
    //     const dateText = noteDateEl.textContent ?? '';

    //     expect(new Date(dateText).toISOString()).not.toMatch(/Invalid Date/i);
    // });
})