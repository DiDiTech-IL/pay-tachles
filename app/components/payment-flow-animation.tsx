"use client";

import { useState, useEffect } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { id: 1, title: "Create Payment", description: "Your server creates a payment session" },
  { id: 2, title: "User Pays", description: "Customer completes payment" },
  { id: 3, title: "Webhook", description: "Your server receives notification" },
  { id: 4, title: "Finalize", description: "Confirm and deliver" },
];

export default function PaymentFlowAnimation({
  autoPlay = true,
  speed = 2000,
}: {
  autoPlay?: boolean;
  speed?: number;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Simple horizontal flow */}
      <div className="relative flex items-center justify-between">
        {/* Connection line */}
        <div className="absolute top-6 left-8 right-8 h-0.5 bg-slate-800">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => { setActiveStep(i); setIsPlaying(false); }}
            className="relative z-10 flex flex-col items-center group"
          >
            {/* Circle */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
                transition-all duration-300 border-2
                ${i < activeStep
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : i === activeStep
                  ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/30"
                  : "bg-slate-900 border-slate-700 text-slate-500"
                }
              `}
            >
              {i < activeStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.id
              )}
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <div className={`text-xs font-semibold transition-colors ${i === activeStep ? "text-white" : "text-slate-500"}`}>
                {step.title}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5 max-w-20 hidden sm:block">
                {step.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Current step detail */}
      <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
        <div className="text-sm text-slate-400">
          <span className="text-indigo-400 font-semibold">Step {activeStep + 1}:</span>{" "}
          {steps[activeStep].description}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1.5 text-xs text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => setActiveStep(0)}
          className="px-3 py-1.5 text-xs text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
