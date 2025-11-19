import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
    const spinnerVariants = {
        animate: {
            rotate: 360,
        },
        transition: {
            duration: 1,
            ease: 'linear',
            repeat: Infinity,
        },
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
            <motion.div
                className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full"
                variants={spinnerVariants}
                animate="animate"
                transition={{
                    duration: 1,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            ></motion.div>
        </div>
    );
};

export default LoadingSpinner;