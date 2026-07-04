<script setup lang="ts">
import type { Herb } from '@/types/Herb';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  herb: Herb;
}>();

const imgRef = ref<HTMLImageElement>();

function truncateText(text: string | undefined, maxLength: number): string {
  if (!text)
    return '';
  if (text.length <= maxLength)
    return text;
  return `${text.substring(0, maxLength)}...`;
}

function loadImage(url: string | undefined | null): void {
  if (imgRef.value) {
    imgRef.value.src = '/placeholder-herb.svg';
  }
  if (!url)
    return;

  const img = new Image();
  img.onload = () => {
    if (imgRef.value) {
      imgRef.value.src = url;
    }
  };
  img.src = url;
}

onMounted(() => loadImage(props.herb.ImageUrl));
watch(() => props.herb.ImageUrl, loadImage);
</script>

<template>
  <div class="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
    <!-- Herb Image -->
    <div class="h-48 overflow-hidden relative bg-slate-100">
      <img
        ref="imgRef"
        :alt="herb.Name"
        loading="lazy"
        class="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
      >
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <!-- Herb Info -->
    <div class="p-5 grow flex flex-col gap-4">
      <div>
        <h3 class="text-xl font-bold text-primary mb-2 line-clamp-1 group-hover:text-dark transition-colors">
          {{ herb.Name }}
        </h3>

        <div class="text-sm text-text-main mb-2 leading-relaxed">
          <strong class="font-semibold text-dark">สรรพคุณ:</strong>
          {{ truncateText(herb.Description, 80) }}
        </div>
        <div class="text-sm text-text-main leading-relaxed">
          <strong class="font-semibold text-dark">วิธีใช้:</strong> {{ herb.Usage }}
        </div>
      </div>

      <!-- Technical Details -->
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-slate-100 mt-auto">
        <div class="flex flex-col">
          <span class="text-xs text-slate-400">อัตราจ่ายชดเชย</span>
          <span class="text-sm font-semibold text-dark">{{ herb.NHSO_Price || 'N/A' }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-400">รอบการเบิก</span>
          <span class="text-sm font-semibold text-dark">{{ herb.Per_Course || 'N/A' }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-400">รหัส ICD10</span>
          <span class="text-sm font-semibold text-dark">{{ herb.ICD10 || 'N/A' }}</span>
        </div>
      </div>

      <!-- Category Tag -->
      <div class="mt-2">
        <span class="inline-block bg-light text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {{ herb.Category }}
        </span>
      </div>
    </div>
  </div>
</template>
