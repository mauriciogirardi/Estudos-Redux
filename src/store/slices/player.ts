import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

type Course = {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export type PlayerState = {
  course: Course | null
  currentLessonIndex: number
  currentModuleIndex: number
  isLoading: boolean
}

const initialState: PlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: true,
}

export const loadCourse = createAsyncThunk(
  'player/load',
  async () => {
    try {
      const { data } = await api.get('/courses/1')
      return data;
    } catch (error) {
      console.error(error)
    }
  }
)

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },

    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson = state?.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if(nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {

        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state?.course?.modules[nextModuleIndex]

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }

    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })
  }
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    const currentModule = state?.player?.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]
    return { currentLesson, currentModule }
  })
}
