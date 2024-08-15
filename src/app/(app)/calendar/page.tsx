import { getCalendarEntries } from '@/actions';
import { CalendarEntry } from '@/calendar';
import { CalendarEntryWithAllData } from '@/interfaces/interfaces';
import { isSameDay } from '@/utils';

export default async function CalendarPage() {
  const entries = await getCalendarEntries();

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-secondary">Tus registros</h1>

      {<CalendarEntry entries={entries} />}
    </main>
  );
}
