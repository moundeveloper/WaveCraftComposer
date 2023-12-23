// mouse.ts
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface MouseCoordinates {
  x: Ref<number>
  y: Ref<number>
}

// by convention, composable function names start with "use"
export function useMouse(): MouseCoordinates {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event: MouseEvent): void {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to set up and tear down side effects.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}
