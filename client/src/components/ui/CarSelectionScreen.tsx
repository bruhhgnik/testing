import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model as Car2Model } from '../../models/Car2';
import { Model as Car3Model } from '../../models/Car3';
import { Model as Car4Model } from '../../models/Car4';
import { Model as Car5Model } from '../../models/Car5';
import { Model as Car6Model } from '../../models/Car6';
import useAppStore from '../../zustand/store';

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
  const { setSelectedCar, setCarSelectionComplete } = useAppStore();

  const currentCar = carData[selectedIndex];
  const CurrentCarModel = currentCar.Model;

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
      background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
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
            <ambientLight intensity={0.3} />

            {/* Main stage lights from top - dramatic lighting */}
            <pointLight position={[0, 8, 0]} intensity={2} color="#ffffff" distance={15} decay={2} />
            <pointLight position={[3, 10, 3]} intensity={1.5} color="#00d9ff" distance={12} decay={2} />
            <pointLight position={[-3, 10, -3]} intensity={1.5} color="#ff00ff" distance={12} decay={2} />
            <pointLight position={[4, 7, -2]} intensity={1.2} color="#ffaa00" distance={10} decay={2} />
            <pointLight position={[-4, 7, 2]} intensity={1.2} color="#00ffaa" distance={10} decay={2} />

            {/* Rim lights for dramatic effect */}
            <spotLight position={[0, 12, 0]} intensity={2} angle={0.4} penumbra={0.5} color="#ffffff" />
            <spotLight position={[5, 8, 5]} intensity={1.5} angle={0.3} penumbra={0.8} color="#00d9ff" />
            <spotLight position={[-5, 8, -5]} intensity={1.5} angle={0.3} penumbra={0.8} color="#ff6600" />

            {/* Fill lights */}
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
            <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#4488ff" />

            <CurrentCarModel scale={currentCar.id === 'car2' ? 0.085 : 0.825} position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.5}
              autoRotate
              autoRotateSpeed={2}
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
  );
};
