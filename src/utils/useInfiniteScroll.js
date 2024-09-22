import { useEffect } from 'react';

const useInfiniteScroll = (callback, isLoading, hasMore) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 &&
        !isLoading && hasMore
      ) {
        callback();  
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, isLoading, hasMore]);
};

export default useInfiniteScroll;
