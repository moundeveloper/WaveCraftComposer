import { ref, type Ref } from 'vue'

export function useNotificationMessage(): {
  newNotificationMessage: () => {
    notificationMessage: Ref<null | {
      showNotification: (type: string, title: string, message: string) => void
    }>
    showErrorMessage: () => void
    showWarningMessage: () => void
    showSuccessMessage: () => void
    showInfoMessage: () => void
  }
} {
  const newNotificationMessage = () => {
    const notificationMessage = ref<null | {
      showNotification: (type: string, title: string, message: string) => void
    }>(null)

    const showErrorMessage = () => {
      if (notificationMessage.value === null) return
      notificationMessage.value.showNotification('error', 'Error', 'An error occurred!')
    }

    const showWarningMessage = () => {
      if (notificationMessage.value === null) return
      notificationMessage.value.showNotification('warning', 'Warning', 'This is a warning!')
    }

    const showSuccessMessage = () => {
      if (notificationMessage.value === null) return
      notificationMessage.value.showNotification(
        'success',
        'Success',
        'Operation completed successfuly'
      )
    }

    const showInfoMessage = () => {
      if (notificationMessage.value === null) return
      notificationMessage.value.showNotification('info', 'Info', 'Something has happened')
    }

    return {
      notificationMessage,
      showErrorMessage,
      showWarningMessage,
      showSuccessMessage,
      showInfoMessage
    }
  }

  return { newNotificationMessage }
}
