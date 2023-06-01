import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "dashboard"
declare module "/Users/zakirch/Desktop/working-vast-vision/vast_vision_host/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}