/**
 * Global animation keyframes and utilities
 * Centralized animation definitions for consistent micro-interactions
 */

export const fadeInUp = {
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};

export const fadeIn = {
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
};

export const slideInFromLeft = {
  '@keyframes slideInFromLeft': {
    from: {
      opacity: 0,
      transform: 'translateX(-30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
};

export const scaleIn = {
  '@keyframes scaleIn': {
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
};

export const pulse = {
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.05)',
    },
  },
};

// Smooth transition presets
export const smoothTransition = {
  transition: 'all 0.3s ease-in-out',
};

export const cardHoverEffect = {
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: 6,
  },
};

export const buttonHoverEffect = {
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: 4,
  },
};
