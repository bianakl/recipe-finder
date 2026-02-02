import { motion } from 'framer-motion';

export function SkeletonCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800/50 overflow-hidden"
    >
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-4">
        <div className="h-6 skeleton w-3/4" />
        <div className="flex gap-2">
          <div className="h-7 skeleton w-20 rounded-full" />
          <div className="h-7 skeleton w-16 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}
