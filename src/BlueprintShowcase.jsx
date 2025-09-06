import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Play, Pause, Download, FileText, Zap, Settings, Users, Database, Target, AlertTriangle, Thermometer } from "lucide-react";

export default function BlueprintShowcase() {
  const controls = useAnimation();
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  const progressRef = useRef(null);

  const BLUEPRINT_SRC = "/images/blueprint.png";

  const animationSteps = ["Guidance & Alignment", "Magnetic Field Activation", "Kinetic Energy Conversion", "Emergency Ring Jettison"];

  const systemStats = [
    { label: "Energy Captured", value: energyLevel.toFixed(1), unit: "×10¹¹ J" },
    { label: "Ring Status", value: "4/4", unit: "Active" },
    { label: "Crew Aboard", value: "10", unit: "Personnel" },
    { label: "Field Strength", value: "15.2", unit: "Tesla" },
  ];

  // Enhanced animation sequence based on actual technical process
  async function playSequence() {
    setPlaying(true);
    setCurrentStep(0);
    setEnergyLevel(0);

    // Step 1: Guidance beacon activation and approach
    await controls.start({
      guidanceBeacon: 1,
      approachGlow: 1,
      transition: { duration: 1.8, ease: "easeOut" },
    });
    setCurrentStep(1);

    // Step 2: Superconducting coil field activation
    await controls.start({
      magneticField: 1,
      coilGlow: 1,
      fieldLines: 1,
      transition: { duration: 2.0, ease: "easeInOut" },
    });
    setCurrentStep(2);

    // Step 3: Energy conversion and transfer
    const energyCapture = setInterval(() => {
      setEnergyLevel((prev) => Math.min(prev + 0.15, 9.1));
    }, 100);

    await controls.start({
      energyFlow: 1,
      storageCharge: 1,
      eddyCurrents: 1,
      transition: { duration: 3.0, ease: "easeOut" },
    });

    clearInterval(energyCapture);
    setCurrentStep(3);

    // Step 4: Emergency ring decoupling demonstration
    await controls.start({
      ringJettison: 1,
      emergencyProtocol: 1,
      attitudeCorrection: 1,
      transition: { duration: 2.5, ease: "easeInOut" },
    });

    // Return to idle monitoring state
    await controls.start({
      idleMonitoring: [0, 1, 0],
      transition: { duration: 4, repeat: Infinity },
    });
    setPlaying(false);
    setCurrentStep(0);
  }

  function togglePlay() {
    if (playing) {
      controls.stop();
      setPlaying(false);
      setCurrentStep(0);
      setEnergyLevel(0);
    } else {
      playSequence();
    }
  }

  // Auto-start sequence
  useEffect(() => {
    const timer = setTimeout(() => playSequence(), 2000);
    return () => clearTimeout(timer);
  }, []);

  const TechnicalArrow = ({ x1, y1, x2, y2, delay = 0, label = "" }) => {
    const length = Math.hypot(x2 - x1, y2 - y1);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return (
      <motion.g>
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(0,255,200,0.9)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={`${length * 0.1} ${length * 0.05}`}
          filter="url(#glow)"
          initial={{ strokeDashoffset: length }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, delay, ease: "easeOut" }}
        />
        <motion.polygon
          points={`${x2},${y2} ${x2 - 15},${y2 - 8} ${x2 - 15},${y2 + 8}`}
          fill="rgba(0,255,200,0.9)"
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 1.5, duration: 0.4 }}
        />
        {label && (
          <motion.text
            x={midX}
            y={midY - 15}
            fill="rgba(0,255,200,0.9)"
            fontSize="11"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1.8 }}>
            {label}
          </motion.text>
        )}
      </motion.g>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 opacity-15">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0,255,200,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(100,150,255,0.1) 0%, transparent 50%),
              linear-gradient(rgba(0,255,200,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,200,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 100% 100%, 60px 60px, 60px 60px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0px 0px", "60px 60px"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-8xl mx-auto p-6">
        {/* Premium header design */}
        <motion.header
          className="flex items-center justify-between mb-8 py-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <div className="flex items-center gap-6">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Orbital Energy Station
              </h1>
              <p className="text-slate-400 text-lg">Modular Kinetic Energy Capture & Storage Platform</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs px-3 py-1 bg-green-500/20 text-green-300 rounded-full">● OPERATIONAL</span>
                <span className="text-xs text-slate-500">Hub-X Configuration | 4-Ring Array</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <motion.button
              onClick={togglePlay}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-2xl transition-all duration-300 border border-cyan-400/20"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,200,0.3)" }}
              whileTap={{ scale: 0.95 }}>
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {playing ? "Pause" : "Initialize"} Sequence
            </motion.button>
          </div>
        </motion.header>

        {/* Real-time system status */}
        <motion.div
          className="mb-8 grid grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          {systemStats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-cyan-300">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.unit}</div>
              <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Animation phase indicator */}
        {playing && (
          <motion.div
            className="mb-8 bg-gradient-to-r from-slate-800/60 to-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-cyan-300 font-semibold text-lg">{animationSteps[currentStep]}</span>
              </div>
              <div className="text-sm text-slate-400">
                Phase {currentStep + 1} of {animationSteps.length}
              </div>
            </div>
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        <main className="grid grid-cols-12 gap-8">
          {/* Technical blueprint visualization */}
          <motion.section
            className="col-span-8 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}>
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/40 shadow-2xl">
              <div className="relative w-full h-[800px] rounded-2xl overflow-hidden border-2 border-slate-600/30 shadow-inner bg-slate-900/20">
                <img src={BLUEPRINT_SRC} alt="Orbital Energy Station Technical Blueprint" className="w-full h-full object-cover opacity-70" />

                {/* Advanced SVG technical overlay */}
                <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" className="absolute left-0 top-0 w-full h-full pointer-events-none">
                  <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="intense-glow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(0,255,200,0.1)" />
                      <stop offset="50%" stopColor="rgba(0,255,200,0.8)" />
                      <stop offset="100%" stopColor="rgba(100,150,255,0.1)" />
                    </linearGradient>
                    <radialGradient id="magneticField" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(100,150,255,0.6)" />
                      <stop offset="70%" stopColor="rgba(0,255,200,0.3)" />
                      <stop offset="100%" stopColor="rgba(0,255,200,0.05)" />
                    </radialGradient>
                  </defs>

                  {/* Central Hub X (18m diameter) */}
                  <motion.g>
                    <motion.circle
                      cx={600}
                      cy={400}
                      r={36}
                      fill="rgba(50,50,100,0.3)"
                      stroke="rgba(150,200,255,0.9)"
                      strokeWidth={3}
                      filter="url(#glow)"
                      animate={{
                        strokeWidth: [2, 4, 2],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <text x="600" y="405" textAnchor="middle" fill="rgba(150,200,255,0.9)" fontSize="10" fontWeight="bold">
                      HUB-X
                    </text>
                  </motion.g>

                  {/* Four 40m radial booms in X configuration */}
                  {Array.from({ length: 4 }, (_, idx) => {
                    const angles = [45, 135, 225, 315];
                    const angle = (angles[idx] * Math.PI) / 180;
                    const boomLength = 160; // 40m scaled
                    const endX = 600 + Math.cos(angle) * boomLength;
                    const endY = 400 + Math.sin(angle) * boomLength;

                    return (
                      <motion.g key={idx}>
                        {/* Boom structure */}
                        <motion.line
                          x1={600}
                          y1={400}
                          x2={endX}
                          y2={endY}
                          stroke="rgba(120,160,200,0.8)"
                          strokeWidth={6}
                          strokeLinecap="round"
                          filter="url(#glow)"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                        />

                        {/* Ring pair positions (20m spacing) */}
                        {[0.7, 1.0].map((distance, ringIdx) => {
                          const ringX = 600 + Math.cos(angle) * boomLength * distance;
                          const ringY = 400 + Math.sin(angle) * boomLength * distance;

                          return (
                            <g key={ringIdx}>
                              {/* 30m OD ring with 10m aperture */}
                              <motion.circle
                                cx={ringX}
                                cy={ringY}
                                r={60} // 30m diameter scaled
                                fill="none"
                                stroke="rgba(100,200,255,0.9)"
                                strokeWidth={4}
                                filter="url(#glow)"
                                animate={{
                                  strokeWidth: [3, 6, 3],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: idx * 0.3 + ringIdx * 0.2,
                                }}
                              />

                              {/* Inner 10m aperture */}
                              <motion.circle
                                cx={ringX}
                                cy={ringY}
                                r={20} // 10m aperture scaled
                                fill="rgba(0,50,100,0.2)"
                                stroke="rgba(0,255,200,0.6)"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                filter="url(#glow)"
                                animate={{
                                  strokeDashoffset: [0, -20],
                                  opacity: [0.4, 0.8, 0.4],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: ringIdx * 0.5,
                                }}
                              />

                              {/* Superconducting coil visualization */}
                              <motion.circle
                                cx={ringX}
                                cy={ringY}
                                r={45}
                                fill="url(#magneticField)"
                                stroke="none"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                  scale: [0, 1.2, 1, 1.1, 1],
                                  opacity: [0, 0.6, 0.4, 0.6, 0.4],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  delay: idx * 0.4 + ringIdx * 0.2,
                                }}
                              />

                              {/* Quick-release mechanism indicator */}
                              <motion.rect
                                x={ringX - 8}
                                y={ringY - 8}
                                width={16}
                                height={16}
                                fill="rgba(255,100,100,0.8)"
                                stroke="rgba(255,150,150,0.9)"
                                strokeWidth={1}
                                rx={2}
                                filter="url(#glow)"
                                animate={{
                                  scale: [0.8, 1.2, 0.8],
                                  rotate: [0, 90, 180, 270, 360],
                                }}
                                transition={{
                                  duration: 6,
                                  repeat: Infinity,
                                  delay: ringIdx * 0.3,
                                }}
                              />
                            </g>
                          );
                        })}
                      </motion.g>
                    );
                  })}

                  {/* 100m approach corridors */}
                  {Array.from({ length: 4 }, (_, idx) => {
                    const angles = [45, 135, 225, 315];
                    const angle = (angles[idx] * Math.PI) / 180;
                    const startX = 600 + Math.cos(angle) * 300;
                    const startY = 400 + Math.sin(angle) * 300;
                    const endX = 600 + Math.cos(angle) * 112;
                    const endY = 400 + Math.sin(angle) * 112;

                    return (
                      <motion.g key={idx}>
                        {/* Approach corridor */}
                        <motion.line
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke="rgba(0,255,200,0.3)"
                          strokeWidth={20}
                          strokeLinecap="round"
                          filter="url(#glow)"
                          animate={{
                            opacity: [0.2, 0.5, 0.2],
                            strokeWidth: [15, 25, 15],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: idx * 0.6,
                          }}
                        />

                        {/* Guidance beacon */}
                        <motion.circle
                          cx={startX}
                          cy={startY}
                          r={8}
                          fill="rgba(255,200,0,0.9)"
                          filter="url(#intense-glow)"
                          animate={{
                            scale: [0.5, 1.5, 0.5],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.3,
                          }}
                        />
                      </motion.g>
                    );
                  })}

                  {/* Enhanced energy flow visualization */}
                  <motion.path
                    d="M 440 240 Q 600 320 760 240"
                    fill="none"
                    stroke="url(#energyGradient)"
                    strokeWidth={6}
                    strokeLinecap="round"
                    filter="url(#intense-glow)"
                    animate={{
                      strokeDasharray: ["0 100", "50 50", "100 0"],
                      strokeWidth: [4, 8, 4],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <motion.path
                    d="M 440 560 Q 600 480 760 560"
                    fill="none"
                    stroke="url(#energyGradient)"
                    strokeWidth={6}
                    strokeLinecap="round"
                    filter="url(#intense-glow)"
                    animate={{
                      strokeDasharray: ["0 100", "50 50", "100 0"],
                      strokeWidth: [4, 8, 4],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />

                  {/* Energy storage visualization */}
                  <motion.g>
                    <motion.rect
                      x={950}
                      y={300}
                      width={180}
                      height={200}
                      rx={15}
                      fill="rgba(0,100,200,0.1)"
                      stroke="rgba(0,255,200,0.8)"
                      strokeWidth={3}
                      filter="url(#glow)"
                      animate={{
                        strokeWidth: [2, 4, 2],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />

                    {/* Energy level indicator */}
                    <motion.rect
                      x={960}
                      y={480}
                      width={160}
                      height={10}
                      fill="rgba(0,255,200,0.8)"
                      filter="url(#glow)"
                      animate={{
                        height: [10, Math.max(10, energyLevel * 15), 10],
                        y: [480, Math.max(480, 490 - energyLevel * 15), 480],
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    <text x="1040" y="260" textAnchor="middle" fill="rgba(0,255,200,0.9)" fontSize="12" fontWeight="bold">
                      ENERGY STORAGE
                    </text>
                    <text x="1040" y="275" textAnchor="middle" fill="rgba(150,200,255,0.7)" fontSize="10">
                      Supercapacitor Bank
                    </text>
                  </motion.g>

                  {/* Cooling radiators (20m length) */}
                  <motion.g>
                    {Array.from({ length: 6 }, (_, i) => (
                      <motion.rect
                        key={i}
                        x={580 + i * 8}
                        y={480}
                        width={4}
                        height={80} // 20m scaled
                        fill="rgba(255,100,100,0.6)"
                        stroke="rgba(255,150,150,0.8)"
                        strokeWidth={1}
                        filter="url(#glow)"
                        animate={{
                          height: [60, 100, 60],
                          opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                    <text x="600" y="580" textAnchor="middle" fill="rgba(255,150,150,0.9)" fontSize="11">
                      Cooling Radiators
                    </text>
                  </motion.g>

                  {/* Solar arrays on opposing booms */}
                  <motion.g>
                    {/* Solar array 1 */}
                    <motion.rect
                      x={420}
                      y={200}
                      width={100}
                      height={40}
                      fill="rgba(100,100,200,0.3)"
                      stroke="rgba(150,150,255,0.8)"
                      strokeWidth={2}
                      filter="url(#glow)"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    {/* Solar array 2 */}
                    <motion.rect
                      x={680}
                      y={560}
                      width={100}
                      height={40}
                      fill="rgba(100,100,200,0.3)"
                      stroke="rgba(150,150,255,0.8)"
                      strokeWidth={2}
                      filter="url(#glow)"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    />
                  </motion.g>

                  {/* Technical arrows with specifications */}
                  <TechnicalArrow x1={760} y1={240} x2={950} y2={350} delay={1} label="Energy Transfer" />
                  <TechnicalArrow x1={760} y1={560} x2={950} y2={450} delay={1.3} label="Backup Route" />
                  <TechnicalArrow x1={300} y1={380} x2={440} y2={240} delay={0.7} label="Approach Vector" />

                  {/* Magnetic field lines visualization */}
                  {Array.from({ length: 8 }, (_, i) => {
                    const radius = 80 + i * 15;
                    return (
                      <motion.circle
                        key={i}
                        cx={600}
                        cy={400}
                        r={radius}
                        fill="none"
                        stroke="rgba(100,150,255,0.2)"
                        strokeWidth={1}
                        strokeDasharray="8 12"
                        animate={{
                          strokeDashoffset: [0, -40],
                          opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    );
                  })}

                  {/* Emergency jettison visualization */}
                  <motion.ellipse
                    cx={760}
                    cy={240}
                    rx={60}
                    ry={20}
                    fill="none"
                    stroke="rgba(255,100,50,0.9)"
                    strokeWidth={3}
                    filter="url(#intense-glow)"
                    initial={{ x: 0, opacity: 0.8 }}
                    animate={{
                      x: [0, -80, -200, -400],
                      y: [0, -20, -60, -120],
                      opacity: [0.8, 0.6, 0.3, 0],
                      rotate: [0, -30, -90, -180],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatDelay: 8,
                    }}
                  />

                  {/* Technical annotations */}
                  {[
                    { x: 1040, y: 520, text: "Supercapacitor Bank", subtext: "Peak: 1×10¹¹ J" },
                    { x: 150, y: 80, text: "Guidance Corridor", subtext: "100m approach" },
                    { x: 600, y: 590, text: "Thermal Radiators", subtext: "20m cooling rods" },
                    { x: 150, y: 700, text: "Emergency Protocols", subtext: "Ring Jettison" },
                  ].map((annotation, idx) => (
                    <g key={idx}>
                      <motion.rect
                        x={annotation.x - 15}
                        y={annotation.y - 25}
                        width={130}
                        height={35}
                        rx={8}
                        fill="rgba(0,0,0,0.8)"
                        stroke="rgba(0,255,200,0.4)"
                        strokeWidth={1}
                        filter="url(#glow)"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.3 + 2 }}
                      />
                      <motion.text
                        x={annotation.x}
                        y={annotation.y - 8}
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.3 + 2.2 }}>
                        {annotation.text}
                      </motion.text>
                      <motion.text
                        x={annotation.x}
                        y={annotation.y + 5}
                        fill="rgba(0,255,200,0.8)"
                        fontSize="9"
                        textAnchor="middle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.3 + 2.4 }}>
                        {annotation.subtext}
                      </motion.text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Enhanced control legend */}
              <motion.div
                className="absolute left-8 bottom-8 bg-slate-900/90 backdrop-blur-2xl p-6 rounded-2xl border border-cyan-500/40 shadow-2xl min-w-72"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}>
                <h4 className="font-bold mb-4 text-cyan-300 text-lg">System Legend</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                    <span>Energy Flow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                    <span>Magnetic Field</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                    <span>Guidance Beacon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />
                    <span>Quick Release</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                    <span>Solar Arrays</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50" />
                    <span>Thermal Control</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Enhanced information panels */}
          <motion.aside
            className="col-span-4 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}>
            {/* System Architecture */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <Settings className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-cyan-300">Hub-X Architecture</h2>
              </div>
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <h4 className="font-semibold text-blue-300 mb-2">Central Hub</h4>
                  <p className="text-slate-300 leading-relaxed">18m diameter structural core housing command, life support, and power conditioning systems.</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <h4 className="font-semibold text-purple-300 mb-2">Ring Modules</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Four independent 30m diameter superconducting deceleration rings with magnetic quick-release coupling.
                  </p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <h4 className="font-semibold text-green-300 mb-2">Energy Capture</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Eddy current induction converts kinetic energy to electrical storage via phased magnetic fields.
                  </p>
                </div>
              </div>
            </div>

            {/* Crew & Operations */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="font-bold text-blue-300 text-lg">Crew Operations</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-300">Command Staff:</span>
                  <span className="font-semibold text-blue-300">1 Commander</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-300">Ring Operators:</span>
                  <span className="font-semibold text-blue-300">4 Specialists</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-300">Engineering:</span>
                  <span className="font-semibold text-blue-300">2 Mechanics</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-300">Science Team:</span>
                  <span className="font-semibold text-blue-300">3 Researchers</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <Database className="w-6 h-6 text-purple-400" />
                <h3 className="font-bold text-purple-300 text-lg">Performance Specs</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Ring Diameter", value: "30m", detail: "10m aperture" },
                  { label: "Boom Length", value: "40m", detail: "20m ring spacing" },
                  { label: "Peak Capacity", value: "9.1×10¹¹", detail: "Joules" },
                  { label: "Magnetic Field", value: "15+ Tesla", detail: "Superconducting" },
                  { label: "Ring Mass", value: "20-50t", detail: "Per module" },
                  { label: "Hub Mass", value: "100-300t", detail: "Central core" },
                ].map((spec, idx) => (
                  <motion.div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg border border-slate-700/20"
                    whileHover={{ backgroundColor: "rgba(100,120,150,0.1)" }}>
                    <div>
                      <div className="text-slate-300 font-medium">{spec.label}</div>
                      <div className="text-xs text-slate-500">{spec.detail}</div>
                    </div>
                    <div className="font-mono text-purple-300 font-semibold">{spec.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Safety & Export */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h3 className="font-bold text-amber-300 text-lg">Safety Protocols</h3>
              </div>
              <div className="space-y-3 text-sm mb-5">
                <div className="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                  <p className="text-amber-200 leading-relaxed">
                    <strong>Sacrificial Design:</strong> Each ring can be jettisoned independently via magnetic quick-release in &lt;2 seconds upon impact
                    detection.
                  </p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-200 leading-relaxed">
                    <strong>Collision Mitigation:</strong> Ablative panels and detection nets provide first-line defense with automatic attitude correction.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Tools
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    className="px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-sm font-medium transition-all border border-slate-600/50 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,255,200,0.2)" }}
                    whileTap={{ scale: 0.98 }}>
                    <FileText className="w-4 h-4" />
                    SVG
                  </motion.button>
                  <motion.button
                    className="px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-sm font-medium transition-all border border-slate-600/50 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,255,200,0.2)" }}
                    whileTap={{ scale: 0.98 }}>
                    <Database className="w-4 h-4" />
                    JSON
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.aside>
        </main>

        {/* Technical white paper section */}
        <motion.section
          id="specs"
          className="mt-16 bg-gradient-to-r from-slate-800/60 via-slate-900/40 to-slate-800/60 backdrop-blur-xl p-10 rounded-3xl border border-slate-700/50 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Technical White Paper Summary
              </h2>
              <p className="text-slate-400 text-lg">Advanced Orbital Kinetic Energy Capture System</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  System Overview
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The Orbital Energy Station employs a Hub-X configuration with four radial booms extending 40m from an 18m diameter central hub. Eight
                  superconducting deceleration rings arranged in parallel pairs provide contactless magnetic braking for incoming spacecraft.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Each ring features a 30m outer diameter with a 10m transit aperture, utilizing segmented superconducting coils to create time-varying magnetic
                  fields for optimal kinetic energy conversion.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Energy Conversion Process
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Incoming stages deploy conductive capture collars that interact with phased magnetic fields to induce eddy currents. The system converts up to
                  9.1×10¹¹ joules of kinetic energy into electrical storage through supercapacitor banks and flywheel buffers.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Safety & Redundancy
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Each ring module incorporates sacrificial design principles with electromagnetic quick-release mechanisms. Upon impact detection, rings can be
                  jettisoned within 2 seconds to protect the central hub and crew.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Collision detection networks and ablative shielding provide multi-layer protection, while automated attitude correction systems maintain
                  station stability.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Next Development Phase</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Detailed CAD modeling of segmented coil assemblies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Thermal analysis of superconductor cooling systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Control algorithms for multi-ring magnetic field phasing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span>International safety protocols and debris mitigation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical performance metrics */}
          <div className="mt-10 p-6 bg-slate-900/50 rounded-2xl border border-slate-700/30">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Performance Analysis</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">30,000kg</div>
                <div className="text-slate-400">Max Stage Mass</div>
                <div className="text-xs text-slate-500 mt-1">@ 7.8 km/s approach</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">1×10¹¹J</div>
                <div className="text-slate-400">Peak Energy Pulse</div>
                <div className="text-xs text-slate-500 mt-1">Supercapacitor rated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">&lt;2 sec</div>
                <div className="text-slate-400">Emergency Response</div>
                <div className="text-xs text-slate-500 mt-1">Ring jettison time</div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
