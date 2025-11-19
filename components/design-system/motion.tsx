// macOS Design System - Motion & Interaction Patterns
// Smooth, subtle animations and interactions

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

// Common transition definitions
export const transitions = {
  gentle: {
    type: "spring",
    damping: 25,
    stiffness: 300,
    duration: 0.2,
  },
  quick: {
    type: "tween",
    ease: "easeOut",
    duration: 0.15,
  },
  slow: {
    type: "tween",
    ease: "easeOut",
    duration: 0.3,
  },
};

// Fade in/out variants
export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitions.quick,
};

// Slide from top variants (for modals)
export const slideFromTop = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: transitions.gentle,
};

// Slide from bottom variants (for sheets)
export const slideFromBottom = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: transitions.gentle,
};

// Slide from left variants (for sidebars)
export const slideFromLeft = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: transitions.gentle,
};

// Slide from right variants (for popovers)
export const slideFromRight = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
  transition: transitions.gentle,
};

// Scale in/out variants (for buttons, icons)
export const scaleInOut = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: transitions.quick,
};

// Pop in/out variants (more pronounced scale)
export const popInOut = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { ...transitions.quick, type: "spring", stiffness: 500 },
};

// Motion wrapper components

// MotionDiv: Animated div component
interface MotionDivProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const MotionDiv: React.FC<MotionDivProps> = ({ children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitions.quick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// MotionButton: Animated button component
interface MotionButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
}

export const MotionButton: React.FC<MotionButtonProps> = ({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={transitions.quick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Modal component with slide-in animation
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal content */}
          <motion.div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg shadow-xl ${className}`}
            variants={slideFromTop}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitions.gentle}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Sheet component (slides up from bottom)
interface SheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'bottom' | 'top' | 'left' | 'right';
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({ 
  children, 
  isOpen, 
  onClose, 
  position = 'bottom', 
  className = '' 
}) => {
  // Determine variants based on position
  let variants;
  switch(position) {
    case 'top':
      variants = slideFromTop;
      break;
    case 'left':
      variants = slideFromLeft;
      break;
    case 'right':
      variants = slideFromRight;
      break;
    default: // bottom
      variants = slideFromBottom;
      break;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sheet content */}
          <motion.div
            className={`fixed ${position === 'bottom' ? 'bottom-0 left-0 right-0' : ''} ${
              position === 'top' ? 'top-0 left-0 right-0' : ''
            } ${position === 'left' ? 'top-0 bottom-0 left-0' : ''} ${
              position === 'right' ? 'top-0 bottom-0 right-0' : ''
            } z-50 ${className}`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitions.gentle}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Popover component with subtle entrance
interface PopoverProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({ 
  children, 
  isOpen, 
  onClose, 
  anchorEl, 
  className = '' 
}) => {
  // Calculate position based on anchor element
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  
  React.useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [anchorEl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - only if popover is closable by clicking outside */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Popover content */}
          <motion.div
            className={`fixed z-50 rounded-md shadow-lg ${className}`}
            style={{ top: position.top, left: position.left }}
            variants={slideFromRight}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitions.quick}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Tooltip component with subtle fade
interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  isVisible: boolean;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  isVisible, 
  className = '' 
}) => {
  return (
    <div className="relative inline-block">
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2 px-2 py-1 rounded text-xs text-white bg-gray-800 z-50 ${className}`}
            variants={fadeInOut}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}
          >
            {content}
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Animation presets for different components
export const animations = {
  transitions,
  fadeInOut,
  slideFromTop,
  slideFromBottom,
  slideFromLeft,
  slideFromRight,
  scaleInOut,
  popInOut,
};

// Export all motion components
export const MotionComponents = {
  MotionDiv,
  MotionButton,
  Modal,
  Sheet,
  Popover,
  Tooltip,
  animations,
};