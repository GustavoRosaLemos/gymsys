import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InitialScaleProps {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  delay?: number;
}

function InitialScale({ children, delay = 0.1 }: InitialScaleProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="d-flex"
    >
      {children}
    </motion.div>
  );
}
export default InitialScale;
