import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Loading({ page }) {
  const router = useRouter();
  useEffect(() => {
    const id = setTimeout(() => {
      router.replace(page);
    }, 2000);

    return () => clearTimeout(id);
  }, []);
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <img
        src='./logo.png'
        className="size-56 animate-scale-pulse"
      />
    </div>
  );
}
export default Loading;
