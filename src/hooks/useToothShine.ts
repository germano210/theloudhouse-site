import { useState, type PointerEvent } from 'react';

interface ToothShine {
  siteId: string;
  x: number;
  y: number;
}

export function useToothShine() {
  const [shine, setShine] = useState<ToothShine | null>(null);

  function followPointer(event: PointerEvent<Element>, siteId: string) {
    // Toque não tem hover; evita deixar um brilho preso depois do tap.
    if (event.pointerType === 'touch') return;

    const matrix = event.currentTarget.closest<SVGSVGElement>('svg')?.getScreenCTM();
    if (!matrix) return;

    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    setShine({ siteId, x: point.x, y: point.y });
  }

  return {
    shine,
    followPointer,
    showAt: (siteId: string, x: number, y: number) => setShine({ siteId, x, y }),
    clear: () => setShine(null),
  };
}
