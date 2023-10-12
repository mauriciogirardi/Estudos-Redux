import { Video, PlayCircle } from 'lucide-react'

type LessonProps = {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}

export function Lesson({ duration, title, onPlay, isCurrent = false }: LessonProps) {
  return (
    <button
      data-active={isCurrent}
      className='group flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100'
      onClick={onPlay}
      disabled={isCurrent}
    >
      {isCurrent
        ? <PlayCircle className='w-4 h-4 text-emerald-400' />
        : <Video className='w-4 h-4 text-zinc-500' />
      }
      <span>{title}</span>
      <span className='ml-auto font-mono text-xs text-zinc-500 group-data-[active=true]:text-emerald-400'>
        {duration}
      </span>
    </button>
  )
}
