/**
 * CompTIA Security+ SY0-701 - Combined PrepSet Master Question Bank
 * Aggregates all 250 verified, dual-layer autopsied scenario questions
 * from Domains 1.0, 2.0, 3.0, 4.0, and 5.0 (50 questions each).
 */

import { DOMAIN1_PREPSET_QUESTIONS } from './domain1PrepSetQuestions.js';
import { DOMAIN2_PREPSET_QUESTIONS } from './domain2PrepSetQuestions.js';
import { DOMAIN3_PREPSET_QUESTIONS } from './domain3PrepSetQuestions.js';
import { DOMAIN4_PREPSET_QUESTIONS } from './domain4PrepSetQuestions.js';
import { DOMAIN5_PREPSET_QUESTIONS } from './domain5PrepSetQuestions.js';

// Standardize questions into a unified master array of 250 questions
export const ALL_PREPSET_QUESTIONS = [
  ...DOMAIN1_PREPSET_QUESTIONS.map(q => ({ ...q, globalId: `D1-Q${q.id}`, domainNumber: 1 })),
  ...DOMAIN2_PREPSET_QUESTIONS.map(q => ({ ...q, globalId: `D2-Q${q.id}`, domainNumber: 2 })),
  ...DOMAIN3_PREPSET_QUESTIONS.map(q => ({ ...q, globalId: `D3-Q${q.id}`, domainNumber: 3 })),
  ...DOMAIN4_PREPSET_QUESTIONS.map(q => ({ ...q, globalId: `D4-Q${q.id}`, domainNumber: 4 })),
  ...DOMAIN5_PREPSET_QUESTIONS.map(q => ({ ...q, globalId: `D5-Q${q.id}`, domainNumber: 5 }))
];

/**
 * Split Strategy:
 * 250 Total Questions:
 * - Mock Exam 1: 18 questions from each domain (18 * 5 = 90 Questions)
 * - Mock Exam 2: 18 questions from each domain (18 * 5 = 90 Questions)
 * - Mock Exam 3: 14 questions from each domain (14 * 5 = 70 Questions)
 * 90 + 90 + 70 = 250 questions. 100% coverage, perfectly balanced across all 5 domains!
 */

export const MOCK_EXAM_1_QUESTIONS = [
  ...DOMAIN1_PREPSET_QUESTIONS.slice(0, 18).map(q => ({ ...q, globalId: `D1-Q${q.id}`, domainNumber: 1 })),
  ...DOMAIN2_PREPSET_QUESTIONS.slice(0, 18).map(q => ({ ...q, globalId: `D2-Q${q.id}`, domainNumber: 2 })),
  ...DOMAIN3_PREPSET_QUESTIONS.slice(0, 18).map(q => ({ ...q, globalId: `D3-Q${q.id}`, domainNumber: 3 })),
  ...DOMAIN4_PREPSET_QUESTIONS.slice(0, 18).map(q => ({ ...q, globalId: `D4-Q${q.id}`, domainNumber: 4 })),
  ...DOMAIN5_PREPSET_QUESTIONS.slice(0, 18).map(q => ({ ...q, globalId: `D5-Q${q.id}`, domainNumber: 5 }))
];

export const MOCK_EXAM_2_QUESTIONS = [
  ...DOMAIN1_PREPSET_QUESTIONS.slice(18, 36).map(q => ({ ...q, globalId: `D1-Q${q.id}`, domainNumber: 1 })),
  ...DOMAIN2_PREPSET_QUESTIONS.slice(18, 36).map(q => ({ ...q, globalId: `D2-Q${q.id}`, domainNumber: 2 })),
  ...DOMAIN3_PREPSET_QUESTIONS.slice(18, 36).map(q => ({ ...q, globalId: `D3-Q${q.id}`, domainNumber: 3 })),
  ...DOMAIN4_PREPSET_QUESTIONS.slice(18, 36).map(q => ({ ...q, globalId: `D4-Q${q.id}`, domainNumber: 4 })),
  ...DOMAIN5_PREPSET_QUESTIONS.slice(18, 36).map(q => ({ ...q, globalId: `D5-Q${q.id}`, domainNumber: 5 }))
];

export const MOCK_EXAM_3_QUESTIONS = [
  ...DOMAIN1_PREPSET_QUESTIONS.slice(36, 50).map(q => ({ ...q, globalId: `D1-Q${q.id}`, domainNumber: 1 })),
  ...DOMAIN2_PREPSET_QUESTIONS.slice(36, 50).map(q => ({ ...q, globalId: `D2-Q${q.id}`, domainNumber: 2 })),
  ...DOMAIN3_PREPSET_QUESTIONS.slice(36, 50).map(q => ({ ...q, globalId: `D3-Q${q.id}`, domainNumber: 3 })),
  ...DOMAIN4_PREPSET_QUESTIONS.slice(36, 50).map(q => ({ ...q, globalId: `D4-Q${q.id}`, domainNumber: 4 })),
  ...DOMAIN5_PREPSET_QUESTIONS.slice(36, 50).map(q => ({ ...q, globalId: `D5-Q${q.id}`, domainNumber: 5 }))
];

// Helper to get 90 randomly sampled questions across all 250 questions
export function getRandom90Questions() {
  const pool = [...ALL_PREPSET_QUESTIONS];
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 90);
}
