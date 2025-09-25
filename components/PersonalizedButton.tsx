"use client";
import { motion } from "framer-motion"
import clsx from "clsx";

interface PersonalizedButtonProps {
  submitText: string;
  loading: boolean;
  onClick: () => void;
}

export default function PersonalizedButton({ submitText, loading, onClick }: PersonalizedButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={clsx(
        "relative px-6 py-3 rounded-full font-semibold overflow-hidden text-white z-10",
        "group animate-border-glow",
        loading && "cursor-not-allowed opacity-60"
      )}
      initial={{ scale: 1 }}
      animate={!loading ? { scale: [1, 1.08, 1] } : {scale: [1] }}
      transition={{ repeat: Infinity, duration: 2.5 }}
      whileHover={
        !loading
          ? { scale: 1.1, boxShadow: "0px 0px 20px rgba(94, 94, 94, 0.6)" }
          : { boxShadow: "0px 0px 20px rgba(94, 94, 94, 0.6)" }
      }
      whileTap={{ scale: 0.9 }}
      disabled={loading}
    >
      🤖 {submitText}
      {/* 光暈效果 */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-shimmer"></span>
    </motion.button>
  );
}
