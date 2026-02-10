import { motion } from 'framer-motion';

const STATUS_CONFIG = {
  idle: { color: 'bg-gray-400', label: 'Idle', pulse: false },
  syncing: { color: 'bg-yellow-400', label: 'Syncing...', pulse: true },
  synced: { color: 'bg-green-400', label: 'Synced', pulse: false },
  error: { color: 'bg-red-400', label: 'Sync error', pulse: false },
  offline: { color: 'bg-red-400', label: 'Offline', pulse: false },
};

export function SyncStatusIndicator({ status }) {
  if (!status || status === 'idle') return null;

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5"
      title={config.label}
    >
      <span className="relative flex h-2.5 w-2.5">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.color}`} />
      </span>
      <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400">
        {config.label}
      </span>
    </motion.div>
  );
}
