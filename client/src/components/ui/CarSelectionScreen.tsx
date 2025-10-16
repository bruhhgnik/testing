import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model as Car2Model } from '../../models/Car2';
// @ts-ignore - JSX models without type definitions
import { Model as Car3Model } from '../../models/Car3';
// @ts-ignore - JSX models without type definitions
import { Model as Car4Model } from '../../models/Car4';
// @ts-ignore - JSX models without type definitions
import { Model as Car5Model } from '../../models/Car5';
// @ts-ignore - JSX models without type definitions
import { Model as Car6Model } from '../../models/Car6';
import useAppStore from '../../zustand/store';

const abstractBackgrounds = [
  {
    gradient: 'radial-gradient(circle at 20% 30%, rgba(255, 100, 150, 0.6) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(100, 200, 255, 0.6) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(150, 100, 255, 0.4) 0%, transparent 70%), linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    filter: 'blur(50px)',
  },
  {
    gradient: 'radial-gradient(circle at 70% 20%, rgba(255, 150, 100, 0.7) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(100, 255, 200, 0.6) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(200, 100, 255, 0.5) 0%, transparent 70%), linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 100%)',
    filter: 'blur(50px)',
  },
  {
    gradient: 'radial-gradient(circle at 40% 40%, rgba(100, 255, 255, 0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 100, 200, 0.6) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 200, 100, 0.5) 0%, transparent 70%), linear-gradient(135deg, #1e1a2e 0%, #2e1a3e 100%)',
    filter: 'blur(50px)',
  },
  {
    gradient: 'radial-gradient(circle at 60% 70%, rgba(200, 100, 255, 0.7) 0%, transparent 50%), radial-gradient(circle at 20% 30%, rgba(100, 255, 150, 0.6) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 150, 100, 0.5) 0%, transparent 70%), linear-gradient(135deg, #1a1e2e 0%, #1e2a3e 100%)',
    filter: 'blur(50px)',
  },
  {
    gradient: 'radial-gradient(circle at 30% 60%, rgba(255, 200, 100, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 40%, rgba(100, 150, 255, 0.7) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(255, 100, 150, 0.5) 0%, transparent 70%), linear-gradient(135deg, #2e1a1e 0%, #1e1a3e 100%)',
    filter: 'blur(50px)',
  },
];

const carData = [
  { id: 'car2', name: 'McLaren W1', Model: Car2Model, stats: { topSpeed: 245, acceleration: 2.8, handling: 7.3, fuel: 5.1, nitro: 4.9 } },
  { id: 'car3', name: 'Thunder Sport', Model: Car3Model, stats: { topSpeed: 230, acceleration: 3.2, handling: 6.8, fuel: 5.5, nitro: 4.5 } },
  { id: 'car4', name: 'Speed Demon', Model: Car4Model, stats: { topSpeed: 240, acceleration: 2.9, handling: 7.0, fuel: 5.2, nitro: 4.8 } },
  { id: 'car5', name: 'Turbo Master', Model: Car5Model, stats: { topSpeed: 235, acceleration: 3.0, handling: 6.9, fuel: 5.3, nitro: 4.6 } },
  { id: 'car6', name: 'Nitro Racer', Model: Car6Model, stats: { topSpeed: 238, acceleration: 3.1, handling: 7.1, fuel: 5.0, nitro: 5.0 } },
];

const StatBar = ({ label, value, max = 10, color = '#00d9ff' }: { label: string; value: number; max?: number; color?: string }) => {
  const percentage = (value / max) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
      <div style={{ color: '#fff', fontSize: '14px', fontFamily: 'monospace', minWidth: '120px', textAlign: 'right', marginRight: '10px' }}>
        {label}
      </div>
      <div style={{ flex: 1, background: '#1a1a1a', height: '20px', position: 'relative', border: '1px solid #333' }}>
        <div style={{ width: `${percentage}%`, background: color, height: '100%', transition: 'width 0.3s' }} />
      </div>
      <div style={{ color: '#fff', fontSize: '14px', fontFamily: 'monospace', minWidth: '50px', marginLeft: '10px' }}>
        {value}
      </div>
    </div>
  );
};

export const CarSelectionScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const { setSelectedCar, setCarSelectionComplete } = useAppStore();

  const currentCar = carData[selectedIndex];
  const CurrentCarModel = currentCar.Model;

  // Cycle through abstract backgrounds every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % abstractBackgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + carData.length) % carData.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % carData.length);
  };

  const handleSelect = () => {
    setSelectedCar(currentCar.id);
    setCarSelectionComplete(true);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Animated abstract backgrounds */}
      {abstractBackgrounds.map((bg, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: bg.gradient,
            filter: bg.filter,
            opacity: index === backgroundIndex ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
        zIndex: 1,
      }} />

      {/* Content container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: '40px',
        background: 'linear-gradient(90deg, transparent 0%, #333 20%, #555 50%, #333 80%, transparent 100%)',
        padding: '15px 80px',
        clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: '32px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          margin: 0,
        }}>
          SELECT CAR
        </h1>
      </div>

      {/* Main Content Container */}
      <div style={{ display: 'flex', width: '100%', maxWidth: '1400px', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px' }}>

        {/* Left Side - Car Info */}
        <div style={{ flex: 1, color: '#fff', fontFamily: 'monospace' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase', fontStyle: 'italic' }}>
            {currentCar.name}
          </h2>
          <p style={{ fontSize: '16px', color: '#888', margin: '0 0 20px 0', fontStyle: 'italic' }}>
            I'VE JUST BEEN IN THIS PLACE BEFORE
          </p>
          <div style={{ fontSize: '20px', marginBottom: '30px', color: '#00d9ff' }}>
            {selectedIndex + 1} / {carData.length}
          </div>
        </div>

        {/* Center - 3D Car Preview */}
        <div style={{
          width: '600px',
          height: '400px',
          position: 'relative',
        }}>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            style={{
              position: 'absolute',
              left: '-80px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid #fff',
              color: '#fff',
              fontSize: '40px',
              width: '60px',
              height: '60px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'monospace',
            }}
          >
            ‹
          </button>

          <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <fog attach="fog" args={['#2a2030', 10, 30]} />

            {/* Warm orange/yellow spotlight from left rear - pointing at car */}
            <spotLight
              position={[-8, 10, -8]}
              target-position={[0, 0, 0]}
              intensity={4}
              angle={0.5}
              penumbra={0.8}
              color="#ff8800"
              castShadow
            />
            <spotLight
              position={[-6, 8, -6]}
              target-position={[0, 0, 0]}
              intensity={3}
              angle={0.4}
              penumbra={0.9}
              color="#ffaa22"
            />

            {/* Cool blue spotlights from right rear - pointing at car */}
            <spotLight
              position={[8, 10, -8]}
              target-position={[0, 0, 0]}
              intensity={3.5}
              angle={0.5}
              penumbra={0.8}
              color="#0088ff"
            />
            <spotLight
              position={[6, 9, -6]}
              target-position={[0, 0, 0]}
              intensity={2.5}
              angle={0.4}
              penumbra={0.9}
              color="#00aaff"
            />

            {/* Center back spotlight - pointing at car */}
            <spotLight
              position={[0, 12, -10]}
              target-position={[0, 0, 0]}
              intensity={2}
              angle={0.5}
              penumbra={0.7}
              color="#ffffff"
            />

            {/* Background fill lights to illuminate the scene */}
            <pointLight position={[0, 8, -12]} intensity={4} color="#ff7733" distance={30} decay={1} />
            <pointLight position={[-8, 6, -10]} intensity={3.5} color="#ff9944" distance={25} decay={1} />
            <pointLight position={[8, 6, -10]} intensity={3.5} color="#4499ff" distance={25} decay={1} />
            <pointLight position={[-10, 8, -12]} intensity={3} color="#ff8844" distance={28} decay={1} />
            <pointLight position={[10, 8, -12]} intensity={3} color="#2288ff" distance={28} decay={1} />

            {/* Additional atmospheric lights for depth */}
            <pointLight position={[0, 10, -15]} intensity={2.5} color="#ffaa66" distance={35} decay={1.2} />
            <pointLight position={[-12, 5, -8]} intensity={2} color="#ff6633" distance={20} decay={1.2} />
            <pointLight position={[12, 5, -8]} intensity={2} color="#3388ff" distance={20} decay={1.2} />

            {/* Floor/ground lights */}
            <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#ffffff" distance={12} decay={2} />
            <pointLight position={[-3, 0.5, -3]} intensity={1.2} color="#ff6633" distance={10} decay={2} />
            <pointLight position={[3, 0.5, -3]} intensity={1.2} color="#3388ff" distance={10} decay={2} />
            <pointLight position={[0, 0.2, -5]} intensity={1} color="#ff9944" distance={12} decay={2} />

            <CurrentCarModel scale={currentCar.id === 'car2' ? 0.085 : 0.825} position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              autoRotate
              autoRotateSpeed={2}
              zoomSpeed={0.5}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Canvas>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '-80px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid #fff',
              color: '#fff',
              fontSize: '40px',
              width: '60px',
              height: '60px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'monospace',
            }}
          >
            ›
          </button>

          {/* Circular platform indicator */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '10px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            borderRadius: '50%',
          }} />
        </div>

        {/* Right Side - Stats */}
        <div style={{ flex: 1, paddingLeft: '50px' }}>
          <h3 style={{ color: '#fff', fontSize: '20px', fontFamily: 'monospace', marginBottom: '20px', textTransform: 'uppercase' }}>
            TOP SPEED
          </h3>
          <StatBar label="TOP SPEED" value={currentCar.stats.topSpeed} max={250} color="#00d9ff" />
          <StatBar label="ACCELERATION" value={currentCar.stats.acceleration} max={5} color="#00d9ff" />
          <StatBar label="HANDLING" value={currentCar.stats.handling} max={10} color="#00d9ff" />
          <StatBar label="FUEL" value={currentCar.stats.fuel} max={10} color="#ff0000" />
          <StatBar label="NITRO" value={currentCar.stats.nitro} max={10} color="#00d9ff" />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        display: 'flex',
        gap: '20px',
      }}>
        <button
          style={{
            background: '#d32f2f',
            border: '2px solid #fff',
            borderRadius: '30px',
            padding: '12px 40px',
            color: '#fff',
            fontSize: '18px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '24px' }}>⊗</span> BACK
        </button>

        <button
          style={{
            background: '#ffa000',
            border: '2px solid #fff',
            borderRadius: '30px',
            padding: '12px 40px',
            color: '#fff',
            fontSize: '18px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '24px' }}>👁</span> INSPECT
        </button>

        <button
          onClick={handleSelect}
          style={{
            background: '#4caf50',
            border: '2px solid #fff',
            borderRadius: '30px',
            padding: '12px 40px',
            color: '#fff',
            fontSize: '18px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '24px' }}>✓</span> SELECT
        </button>
      </div>
      </div>
    </div>
  );
};
