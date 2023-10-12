import { MessageCircle } from 'lucide-react'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useAppSelector } from '../store'

export function Player() {
  const modules = useAppSelector(state => state.player.course.modules)

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6 px-3">

        <div className="flex items-center justify-between">
          <Header />

          <button
            className='flex items-center gap-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-500'
            aria-label='Deixar feedback'
          >
            <MessageCircle />
            Deixar feedback
          </button>
        </div>

        <main
          className='relative pr-80 flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow'
        >
          <div className='flex-1'>
            <Video />
          </div>

          <aside className='divide-y-2 divide-zinc-900  absolute top-0 right-0 bottom-0 w-80 border-l border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800'>
            {modules.map((mod, index) => (
              <Module
                key={mod.id}
                title={mod.title}
                amountOfLessons={mod.lessons.length}
                moduleIndex={index}
              />
            ))}
          </aside>
        </main>

      </div>
    </div>
  )
}
