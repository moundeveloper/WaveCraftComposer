import type { TemporaryLinkData } from '../components/Links/types'
import { Position } from '../types/Position'
import { reactive, ref } from 'vue'

// Set up shared state across components
const isTemporaryLinkActive = ref<boolean>(false)

const temporaryLinkData = reactive<TemporaryLinkData>({
  sourceInterface: undefined,
  startPostion: new Position(0, 0)
})

export default function useTemporaryLink() {
  const activateTemporaryLink = (): void => {
    isTemporaryLinkActive.value = true
  }

  const deactivateTemporaryLink = (): void => {
    isTemporaryLinkActive.value = false
  }

  const resetTemporaryLinkData = () => {
    temporaryLinkData.sourceInterface = undefined
    temporaryLinkData.startPostion = new Position(0, 0)
  }

  return {
    isTemporaryLinkActive,
    temporaryLinkData,
    activateTemporaryLink,
    deactivateTemporaryLink,
    resetTemporaryLinkData
  }
}
