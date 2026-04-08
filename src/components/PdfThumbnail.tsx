'use client';

import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PdfThumbnailProps {
  url: string;
  className?: string;
}

export default function PdfThumbnail({ url, className = '' }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasThumbnail, setHasThumbnail] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderThumbnail() {
      try {
        const response = await fetch(url);
        if (!response.ok) return;
        
        const arrayBuffer = await response.arrayBuffer();
        if (cancelled) return;

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const scale = 200 / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext('2d');
        if (!context) return;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        if (!cancelled) setHasThumbnail(true);
      } catch {
      }
    }

    renderThumbnail();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className={`bg-gradient-to-br from-red-50 to-orange-50 relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!hasThumbnail && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-xs font-medium text-red-400 uppercase mt-1">PDF</span>
        </div>
      )}
    </div>
  );
}
