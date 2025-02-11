<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useTemplateRef } from 'vue'
import { useStickyBox } from './use-sticky-box'

export interface StickyBoxConfig {
  offsetTop?: number
  offsetBottom?: number
  bottom?: boolean
}

const props = defineProps<StickyBoxConfig & {
  class?: HTMLAttributes['class']
  style?: HTMLAttributes['style']
}>()

const dom = useTemplateRef('dom')

useStickyBox(dom, { bottom: props.bottom, offsetTop: props.offsetTop, offsetBottom: props.offsetBottom })
</script>

<template>
  <div ref="dom" :class="props.class" :style="props.style">
    <slot />
  </div>
</template>
