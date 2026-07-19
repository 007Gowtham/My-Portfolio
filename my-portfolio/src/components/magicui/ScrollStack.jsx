import { useEffect, useRef, useCallback } from 'react';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  endSpacing = '30vh',
  onStackComplete
}) => {
  const containerRef = useRef(null);
  const stackCompletedRef = useRef(false);

  const parsePercentage = useCallback((value) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * window.innerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!containerRef.current) return;

    const cards = Array.from(containerRef.current.querySelectorAll('.scroll-stack-card'));
    if (!cards.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition);

    const endEl = containerRef.current.querySelector('.scroll-stack-end');
    const endElementTop = endEl
      ? endEl.getBoundingClientRect().top + scrollTop
      : 0;

    cards.forEach((card, i) => {
      const cardTop = card.getBoundingClientRect().top + scrollTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      // Scale progress
      const scaleProgress = Math.min(1, Math.max(0,
        (scrollTop - triggerStart) / Math.max(1, triggerEnd - triggerStart)
      ));
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Blur
      let blur = 0;
      if (blurAmount) {
        let topIdx = 0;
        cards.forEach((c, j) => {
          const cTop = c.getBoundingClientRect().top + scrollTop;
          const cTrigger = cTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= cTrigger) topIdx = j;
        });
        if (i < topIdx) blur = Math.max(0, (topIdx - i) * blurAmount);
      }

      // Pin
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : '';
      card.style.transformOrigin = 'top center';
      card.style.willChange = 'transform, filter';

      // Callback
      if (i === cards.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, rotationAmount, blurAmount, onStackComplete, parsePercentage
  ]);

  useEffect(() => {
    // Set margins between cards
    const cards = containerRef.current
      ? Array.from(containerRef.current.querySelectorAll('.scroll-stack-card'))
      : [];
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    updateCardTransforms();
    window.addEventListener('scroll', updateCardTransforms, { passive: true });
    window.addEventListener('resize', updateCardTransforms);

    return () => {
      window.removeEventListener('scroll', updateCardTransforms);
      window.removeEventListener('resize', updateCardTransforms);
    };
  }, [updateCardTransforms, itemDistance]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      <div
        className="scroll-stack-inner pt-[20vh] px-4"
        style={{ paddingBottom: endSpacing }}
      >
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
