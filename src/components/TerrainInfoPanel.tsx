import { FiCheckSquare, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const TerrainInfoPanel = () => {
  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ scale: .4, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute top-7 -right-1/2 z-10 p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      {/* <FiCheckSquare className=" mt-0.5" /> */}
      <span>{'details'}</span>
      {/* <button className="ml-auto mt-0.5">
        <FiX />
      </button> */}
    </motion.div>
  );
};

export default TerrainInfoPanel;
