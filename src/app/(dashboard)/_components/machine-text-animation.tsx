import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function MachineTextAnimation({ value }: { value: string }) {
  const [text, setText] = useState('')
  const fullText = value
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prevText => prevText + fullText[index])
        setIndex(prevIndex => prevIndex + 1)
      }, 40) // Adjust typing speed here

      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  return (
    <motion.div
      className="text-xl font-semibold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      <AnimatePresence>
        {index < fullText.length && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatType: 'reverse'
            }}
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
