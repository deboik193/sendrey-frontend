import React from "react";
import { motion } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";

export default function Message({ m }) {
  const isMe = m.from === "me";
  const isSystem = m.from === "system";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`w-full flex ${isMe ? "justify-end" : isSystem ? "justify-center" : "justify-start"} mb-2`}
    >
      <div className={`max-w-[80%] md:max-w-[55%] ${isSystem ? "text-center" : ""}`}>
        <div
          className={`shadow-sm backdrop-blur-sm rounded-2xl px-4 py-3 text-sm font-normal 
          ${isMe
              ? "bg-primary border-primary text-white"
              : isSystem
                ? "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                : "bg-gray-1001 dark:bg-black-100 dark:border-black-100 border-gray-1001 dark:text-gray-1002 text-black-200"}`}
        >
          <div>{m.text}</div>
          {!isSystem && (
            <div className={`mt-1 flex items-center gap-1 text-[10px] ${isMe ? "text-gray-100" : "text-primary"}`}>
              {isMe && (
                <span className="flex items-center">
                  {m.status === "read" ? <CheckCheck className="w-3 h-3" /> : m.status === "delivered" ? <Check className="w-3 h-3" /> : null}
                </span>
              )}
            </div>
          )}
        </div>
        {!isSystem && <span className="text-gray-800 text-xs font-medium">{m.time}</span>}
      </div>
    </motion.div>
  );
}
