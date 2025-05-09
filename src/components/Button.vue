<template>
  <button class="ui-button" :class="[props.appearance]" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface UiButton {
  appearance?: 'primary' | 'secondary' | 'link' | 'attention';
}

const props = withDefaults(defineProps<UiButton>(), {
  appearance: undefined,
});

defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped>
.ui-button {
  cursor: pointer;
}

.primary {
  background-color: var(--vt-c-primary);
  color: var(--vt-c-white);
  border: none;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 0;
  border-radius: 16px;
}

.secondary,
.attention {

  border: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.link {
  color: var(--color-link-text);
  border: none;
  font-size: 14px;
  font-weight: 400;
  padding: 8px 0;
  border-radius: 16px;
}

.attention {
  background-color: #FF746C;
  color: var(--vt-c-white);
}

.secondary {
  background-color: #ffffff90;
  color: var(--vt-c-black);
}
</style>
