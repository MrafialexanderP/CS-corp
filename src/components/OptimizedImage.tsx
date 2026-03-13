import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  priority?: boolean;
  rootMargin?: string;
  fallbackSrc?: string;
};

const OptimizedImage = ({
  src,
  alt,
  className,
  priority = false,
  rootMargin = '300px 0px',
  fallbackSrc = '/placeholder.svg',
  loading,
  decoding,
  fetchPriority,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  const [isLoaded, setIsLoaded] = useState(priority);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin,
    skip: priority,
  });

  useEffect(() => {
    setIsLoaded(priority);

    if (priority) {
      setCurrentSrc(src);
      return;
    }

    if (inView) {
      setCurrentSrc(src);
    }
  }, [inView, priority, src]);

  return (
    <img
      ref={ref}
      src={currentSrc || undefined}
      alt={alt}
      loading={priority ? 'eager' : loading ?? 'lazy'}
      decoding={decoding ?? 'async'}
      fetchPriority={priority ? 'high' : fetchPriority ?? 'low'}
      className={[
        className,
        'transition-opacity duration-500',
        isLoaded ? 'opacity-100' : 'opacity-0',
      ]
        .filter(Boolean)
        .join(' ')}
      onLoad={(event) => {
        setIsLoaded(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        if (fallbackSrc && currentSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }

        setIsLoaded(true);
        onError?.(event);
      }}
      {...props}
    />
  );
};

export default OptimizedImage;