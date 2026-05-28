#!/usr/bin/env node
import bcrypt from 'bcryptjs';
import {createDb} from '../server/db.js';
import {
  JOURNAL_DEMO_NAME,
  JOURNAL_DEMO_PASSWORD,
  applyJournalDemoSeed,
} from '../server/journalDemoSeed.js';

const db = createDb();
try {
  await applyJournalDemoSeed(db, bcrypt);
  const data = db.getUser(JOURNAL_DEMO_NAME);
  const journalCount = data?.journal?.length ?? 0;
  const exerciseCount = data?.exercises?.length ?? 0;

  console.log(`JournalDemo seeded: ${exerciseCount} exercises, ${journalCount} journal sessions`);
  console.log(`Login: ${JOURNAL_DEMO_NAME} / ${JOURNAL_DEMO_PASSWORD}`);
} finally {
  db.close();
}
