import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';
import * as db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock the database functions to avoid actual database operations during testing
vi.mock('../db.js', () => ({
  userExists: vi.fn(),
  createUser: vi.fn(),
  getUserAuth: vi.fn(),
  getUser: vi.fn(),
  putUser: vi.fn(),
  delUser: vi.fn(),
}));

// Mock bcrypt and jwt to have predictable results
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn()
  }
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
    verify: vi.fn()
  }
}));

describe('Auth Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Заполни все поля');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'User' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Заполни все поля');
    });

    it('should return 400 if name is empty whitespace', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: '   ', password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Заполни все поля');
    });

    it('should return 400 if name is less than 2 characters (after trim)', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: ' A ', password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Имя минимум 2 символа');
    });

    it('should return 400 if password is less than 4 characters', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'User', password: '123' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Пароль минимум 4 символа');
    });

    it('should return 409 if user already exists', async () => {
      db.userExists.mockReturnValue(true);

      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'ExistingUser', password: 'password123' });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe('Пользователь уже существует');
      expect(db.userExists).toHaveBeenCalledWith('ExistingUser');
    });

    it('should return 200 with token and name on successful registration', async () => {
      db.userExists.mockReturnValue(false);
      bcrypt.hash.mockResolvedValue('hashed_password');
      jwt.sign.mockReturnValue('fake_jwt_token');

      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: ' NewUser ', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: 'fake_jwt_token',
        name: 'NewUser' // Should be trimmed
      });

      expect(db.userExists).toHaveBeenCalledWith('NewUser');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(db.createUser).toHaveBeenCalledWith('NewUser', 'hashed_password');
      expect(jwt.sign).toHaveBeenCalledWith(
        { name: 'NewUser' },
        expect.any(String),
        { expiresIn: '30d' }
      );
    });
  });
});
