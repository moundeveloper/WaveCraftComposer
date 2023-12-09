import type { InterfaceComponent } from '@/types/InterfaceComponent'
import type { Position } from '@/types/Position'

export interface TemporaryLinkData {
  sourceInterface: InterfaceComponent | undefined
  startPostion: Position
}
