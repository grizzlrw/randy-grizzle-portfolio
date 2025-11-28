// app/notes/page.tsx
import { fetchNotes } from "@/lib/graphqlClient";
import { dayjs } from "@/lib/date";;

export const dynamic = "force-dynamic"; // so it always fetches fresh data

export default async function NotesPage() {
  const notes = await fetchNotes();

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      {notes.length === 0 ? (
        <p id="no-notes">No notes yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="border rounded p-4">
              <h2 className="font-semibold text-xl">{note.title}</h2>
              <p className="mt-2">{note.content}</p>
              <p data-testid={`note-${note.id}-date`} className="mt-1 text-xs text-gray-500">
                { dayjs(note.createdAt).format('lll') }
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
