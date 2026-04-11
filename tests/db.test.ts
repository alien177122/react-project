import test from 'node:test'
import assert from 'node:assert/strict'
import { createDb } from '../server/db.js'

test('createDb supports in-memory databases for isolated tests', t => {
  const db = createDb({ dbPath: ':memory:' })
  t.after(() => db.close())

  assert.equal(db.userExists('ghost'), false)

  db.createUser('Steve', 'hash')
  assert.equal(db.userExists('Steve'), true)
  assert.deepEqual(db.getUserAuth('Steve'), {
    name: 'Steve',
    password_hash: 'hash',
  })
  assert.deepEqual(db.getUser('Steve'), {})
})

test('createDb persists, updates, and deletes user payloads', t => {
  const db = createDb({ dbPath: ':memory:' })
  t.after(() => db.close())

  db.createUser('Athlete', 'hash')

  const payload = {
    name: 'Athlete',
    exercises: [
      {
        exerciseKey: 'bench',
        testWeight: 100,
        testReps: 5,
        oneRM: 117.5,
        date: '2026-04-11',
      },
    ],
    trainingProgress: { completedSessions: 2 },
  }

  db.putUser('Athlete', payload)
  assert.deepEqual(db.getUser('Athlete'), payload)

  db.delUser('Athlete')
  assert.equal(db.userExists('Athlete'), false)
  assert.equal(db.getUserAuth('Athlete'), undefined)
  assert.equal(db.getUser('Athlete'), null)
})

test('createDb rejects duplicate users', t => {
  const db = createDb({ dbPath: ':memory:' })
  t.after(() => db.close())

  db.createUser('dup', 'hash-1')

  assert.throws(() => {
    db.createUser('dup', 'hash-2')
  })
})
