import { useQuery } from '@tanstack/react-query';
import { getSuggestedTopic } from '../api';
import { AI_KEYS } from '../keys';

export function useSuggestedTopic() {
  return useQuery({
    queryKey: AI_KEYS.suggestion(),
    queryFn: getSuggestedTopic,
    enabled: false,
  });
}
