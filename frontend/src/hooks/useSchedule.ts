import useSWR from 'swr';

import fetcher from "../utils/fetcher"

function useSchedule () {
  const { data, error } = useSWR(`/schedule`, fetcher)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useSchedule;