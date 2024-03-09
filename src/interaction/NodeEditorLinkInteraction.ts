import { onMounted, onUnmounted } from 'vue'
import { useNodeEditor } from '@/stores/nodeEditor'

export default function NodeEditorLinkInteraction() {
  const { initLinking, completeLinking, notLinking } = useNodeEditor()

  onMounted(() => {
    // Add event listeners
  })

  onUnmounted(() => {
    // Remove event listeners
  })

  return {}
}
