import { motion } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <FaPalette className="text-4xl text-indigo-600" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Token Generator
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Create beautiful, accessible color palettes using AI-powered natural language descriptions.
        Perfect for designers and developers building with the M-Design System.
      </p>
    </motion.header>
  );
}