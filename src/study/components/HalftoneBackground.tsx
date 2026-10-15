import React from 'react';

export const HalftoneBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#021711]">
      {/* Deep gradient background mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#021711] via-[#04241b] to-[#01120d]" />

      {/* Tactical Halftone dot matrix pattern grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dark-halftone-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#10B981" opacity="0.6" />
            <circle cx="14" cy="14" r="0.8" fill="#EAB308" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dark-halftone-grid)" />
      </svg>

      {/* Monochromatic halftone dot-matrix illustration of reaching hands with tactical glow */}
      <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-25 filter invert(1) contrast(150%) pointer-events-none select-none">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full object-contain max-w-[1500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dark-dot-shading-dense" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="2.8" fill="#10B981" />
            </pattern>
            <pattern id="dark-dot-shading-medium" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="2.2" fill="#10B981" />
            </pattern>
            <pattern id="dark-dot-shading-light" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.6" fill="#10B981" />
            </pattern>
          </defs>

          {/* Left Reaching Hand (Stippled Contour & Halftone Shading) */}
          <g transform="translate(40, 20) scale(0.95)" stroke="#10B981" strokeWidth="2">
            {/* Wrist & Forearm */}
            <path
              d="M0 520 C120 500 240 470 340 430 C380 415 420 390 460 370 C480 360 510 330 550 310"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />
            <path
              d="M0 620 C150 600 280 570 380 510 C430 480 470 450 510 420 C540 395 560 375 580 355"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />

            {/* Index Finger Reaching Forward */}
            <path
              d="M550 310 C570 300 600 285 625 275 C640 270 655 268 665 270 C672 272 675 278 670 285 C660 295 640 310 610 325 C580 340 550 355 525 365"
              fill="url(#dark-dot-shading-dense)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Middle Finger */}
            <path
              d="M540 345 C565 335 595 325 615 320 C625 318 632 322 630 328 C625 338 605 350 580 365 C555 380 535 390 515 400"
              fill="url(#dark-dot-shading-medium)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Ring Finger */}
            <path
              d="M520 385 C545 375 570 368 585 365 C592 365 596 370 592 376 C585 385 568 395 548 408 C530 420 510 430 495 440"
              fill="url(#dark-dot-shading-medium)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Little Finger */}
            <path
              d="M495 430 C515 422 535 418 548 416 C554 416 556 420 552 426 C545 435 530 445 512 458 C495 470 480 480 465 490"
              fill="url(#dark-dot-shading-light)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Thumb */}
            <path
              d="M430 400 C450 370 475 340 500 315 C515 300 525 292 535 295 C542 298 540 308 530 322 C515 345 495 375 470 405"
              fill="url(#dark-dot-shading-dense)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Palm */}
            <path
              d="M460 370 C480 400 500 430 510 460 C480 480 450 490 420 485 C390 470 410 420 460 370 Z"
              fill="url(#dark-dot-shading-medium)"
              stroke="none"
              opacity="0.85"
            />
          </g>

          {/* Right Reaching Hand (Descending) */}
          <g transform="translate(480, 80) scale(0.95)" stroke="#10B981" strokeWidth="2">
            {/* Forearm & Wrist */}
            <path
              d="M720 180 C600 200 500 230 420 270 C380 290 340 320 310 345 C280 370 250 400 210 430"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />
            <path
              d="M720 80 C580 110 460 145 370 200 C320 230 280 265 245 300 C220 330 195 360 170 390"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />

            {/* Index Finger */}
            <path
              d="M210 430 C190 440 160 452 135 460 C120 464 108 460 102 452 C98 444 105 435 120 422 C145 400 180 375 220 350 C245 335 270 320 295 310"
              fill="url(#dark-dot-shading-dense)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Thumb */}
            <path
              d="M280 320 C255 340 230 365 205 390 C195 402 188 410 180 405 C175 400 178 390 190 375 C210 350 240 320 270 295"
              fill="url(#dark-dot-shading-dense)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Middle Finger */}
            <path
              d="M225 395 C200 408 175 420 155 425 C145 428 140 422 142 415 C148 405 168 390 195 372 C220 355 245 342 270 330"
              fill="url(#dark-dot-shading-medium)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Ring Finger */}
            <path
              d="M245 365 C222 376 200 385 185 388 C178 388 174 382 178 376 C186 366 205 352 228 338 C250 325 272 312 290 300"
              fill="url(#dark-dot-shading-medium)"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Palm */}
            <path
              d="M295 310 C270 340 245 370 230 400 C260 415 290 410 320 395 C350 375 340 330 295 310 Z"
              fill="url(#dark-dot-shading-medium)"
              stroke="none"
              opacity="0.85"
            />
          </g>

          {/* Tactical Center Spark */}
          <circle cx="600" cy="385" r="5" fill="#EAB308" className="animate-ping opacity-80" />
          <circle cx="600" cy="385" r="3.5" fill="#10B981" />
        </svg>
      </div>

      {/* Atmospheric dark glowing vignetting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};