import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO'
}

export interface Log {
  id: string
  title?: string
  message: string
  status: Status
}

export const useTerminal = defineStore('terminal', () => {
  const logs = ref<Log[]>([])

  // Actions
  const addLog = (log: Log) => {
    logs.value.push(log)
  }

  return {
    logs,
    addLog
  }
})
