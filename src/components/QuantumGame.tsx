import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Qubit {
  id: number;
  state: '0' | '1' | 'superposition';
  measured: boolean;
}

export default function QuantumGame({ onClose }: { onClose: () => void }) {
  const [qubits, setQubits] = useState<Qubit[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    initializeLevel();
  }, [level]);

  const initializeLevel = () => {
    const newQubits = Array.from({ length: level + 2 }, (_, i) => ({
      id: i,
      state: Math.random() > 0.5 ? 'superposition' : (Math.random() > 0.5 ? '0' : '1'),
      measured: false,
    }));
    setQubits(newQubits);
    setGameOver(false);
  };

  const measureQubit = (id: number) => {
    if (gameOver) return;

    setQubits(prev => prev.map(qubit => {
      if (qubit.id === id && !qubit.measured) {
        const measured = qubit.state === 'superposition' 
          ? (Math.random() > 0.5 ? '0' : '1')
          : qubit.state;
        return { ...qubit, state: measured, measured: true };
      }
      return qubit;
    }));

    const allMeasured = qubits.every(q => q.measured || q.id === id);
    if (allMeasured) {
      const superpositionCount = qubits.filter(q => 
        q.state === 'superposition' || 
        (q.measured && ['0', '1'].includes(q.state))
      ).length;
      setScore(prev => prev + superpositionCount);
      
      if (superpositionCount > 0) {
        setLevel(prev => prev + 1);
      } else {
        setGameOver(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div className="bg-gray-900 p-8 rounded-xl max-w-lg w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Quantum Superposition Game</h2>
        
        <div className="text-center mb-6">
          <p className="text-gray-300 mb-2">Level: {level}</p>
          <p className="text-gray-300">Score: {score}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {qubits.map((qubit) => (
            <motion.button
              key={qubit.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => measureQubit(qubit.id)}
              className={`
                h-20 rounded-lg flex items-center justify-center font-mono text-2xl
                ${qubit.measured 
                  ? 'bg-indigo-600 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-400 cursor-pointer'}
                transition-colors
              `}
              disabled={qubit.measured}
            >
              {qubit.state === 'superposition' && !qubit.measured ? '|ψ⟩' : qubit.state}
            </motion.button>
          ))}
        </div>

        {gameOver && (
          <div className="text-center">
            <p className="text-xl mb-4">Game Over! Final Score: {score}</p>
            <button
              onClick={() => {
                setScore(0);
                setLevel(1);
                initializeLevel();
              }}
              className="bg-indigo-500 hover:bg-indigo-400 px-6 py-2 rounded-lg"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-400">
          <p className="mb-2">How to play:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click on qubits to measure their quantum state</li>
            <li>|ψ⟩ represents a qubit in superposition</li>
            <li>Measuring collapses the superposition to either 0 or 1</li>
            <li>Score points by measuring superposition states</li>
            <li>Advance levels by finding superpositions</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}