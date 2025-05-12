import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useSelectedUsersStore } from '@/stores/selectedUsersStore'
import { useUserStore } from '@/stores/userStores'

export interface SelectableItem {
  id: number
}

export function useSelection(item: SelectableItem) {
  const selectedEmployersStore = useSelectedUsersStore()
  const usersStore = useUserStore()
  const isSelected: Ref<boolean> = ref(false)

  // Проверяет, есть ли элемент в списке выбранных
  const isItemSelected = () => {
    return selectedEmployersStore.selectedItems.some(selected => selected.id === item.id)
  }

  // Добавляет элемент в список выбранных
  const addToSelection = () => {
    if (!isItemSelected()) {
      const u = usersStore.getUserById(item.id)
      if (u) {
        selectedEmployersStore.selectedItems.push(u)
      }
    }
  }

  // Удаляет элемент из списка выбранных
  const removeFromSelection = () => {
    selectedEmployersStore.selectedItems = selectedEmployersStore.selectedItems.filter(
      selected => selected.id !== item.id
    )
  }

  // Переключает состояние выбора
  const toggleSelection = (value: boolean) => {
    if (value) {
      addToSelection()
    } else {
      removeFromSelection()
    }
  }

  // Синхронизируем значение isSelected с состоянием стора при его изменении
  watch(
    () => selectedEmployersStore.selectedItems,
    () => {
      isSelected.value = isItemSelected()
    },
    { deep: true, immediate: true }
  )

  // Следим за внешним изменением isSelected и обновляем стор
  watch(isSelected, toggleSelection)

  return {
    isSelected,
    toggleSelection,
    addToSelection,
    removeFromSelection
  }
}
