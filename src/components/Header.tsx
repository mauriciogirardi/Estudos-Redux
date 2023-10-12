import { useAppSelector } from "../store"

export function Header() {
  const lesson = useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    const currentModule = state.player.course.modules[currentModuleIndex]
    const currentLesson = currentModule.lessons[currentLessonIndex]
    return { currentLesson, currentModule }
  })

  return (
    <div className="flex flex-col gap-1">
      <h1 className=" text-2xl font-bold">{lesson.currentLesson.title}</h1>
      <span className="text-sm text-zinc-400">{`Módulo "${lesson.currentModule.title}"`}</span>
    </div>
  )
}
