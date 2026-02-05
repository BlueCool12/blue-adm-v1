export const AI_KEYS = {
  all: ['ai'] as const,
  suggestion: () => [...AI_KEYS.all, 'suggestion'] as const,
};
