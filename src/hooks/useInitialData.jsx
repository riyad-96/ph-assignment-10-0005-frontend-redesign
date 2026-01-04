import { useQuery } from '@tanstack/react-query';
import serverAPI from '../utils/server';

const server = serverAPI(false);

export default function useInitialData() {
  return useQuery({
    queryKey: ['initial-parter-data'],
    queryFn: async () => {
      const response = await server.get('base-partner/initial-data');
      return response.data;
    },
  });
}
