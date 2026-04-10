import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadUser } from '../../App';

describe('loadUser', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('returns data when fetch is successful', async () => {
    const mockData = { name: 'testUser', exercises: [{ exerciseKey: 'bench', testWeight: 100, testReps: 5, oneRM: 112.5, date: '2023-01-01' }] };
    (global.fetch as any) = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await loadUser('testUser', 'fake-token');

    expect(result).toEqual(mockData);
  });

  it('returns default object when fetch response is not ok', async () => {
    (global.fetch as any) = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const result = await loadUser('testUser', 'fake-token');

    expect(result).toEqual({ name: 'testUser', exercises: [] });
  });

  it('returns default object when fetch throws an error', async () => {
    (global.fetch as any) = vi.fn(() => Promise.reject(new Error('Network error')));

    const result = await loadUser('testUser', 'fake-token');

    expect(result).toEqual({ name: 'testUser', exercises: [] });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/testUser'),
      expect.objectContaining({
        headers: { Authorization: 'Bearer fake-token' }
      })
    );
  });
});
