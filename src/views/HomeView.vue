<script setup lang="ts">
import type { Herb } from '@/types/Herb';
import { computed, onMounted, ref } from 'vue';

import Header from '@/components/Header.vue';
import HerbCard from '@/components/HerbCard.vue';
import HerbCardSkeleton from '@/components/HerbCardSkeleton.vue';
import SearchBar from '@/components/SearchBar.vue';
import herbsService from '@/services/herbs-service';

// State
const herbs = ref<Herb[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const searchQuery = ref<string>('');
const selectedCategory = ref<string>('');

const categories = computed<string[]>(() => {
  const categorySet = new Set<string>();
  herbs.value.forEach((herb) => {
    if (herb && herb.Category) {
      categorySet.add(herb.Category);
    }
  });
  return Array.from(categorySet);
});

const filteredHerbs = computed<Herb[]>(() => {
  if (!herbs.value)
    return [];

  return herbs.value.filter((herb) => {
    if (!herb)
      return false;

    const q = searchQuery.value.toLowerCase();
    const nameMatch = (herb.Name || '').toLowerCase().includes(q);
    const scientificNameMatch = (herb.ScientificName || '').toLowerCase().includes(q);
    const descriptionMatch = (herb.Description || '').toLowerCase().includes(q);

    const matchesSearch = !q || nameMatch || scientificNameMatch || descriptionMatch;
    const matchesCategory = !selectedCategory.value || herb.Category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

function handleSearch(query: string) {
  searchQuery.value = query;
}

function handleFilter(category: string) {
  selectedCategory.value = category;
}

async function fetchHerbs() {
  loading.value = true;
  error.value = null;
  try {
    const response = await herbsService.getAllHerbs();
    herbs.value = response.data;
  }
  catch (err) {
    console.error('Error fetching herbs:', err);
    error.value = 'ไม่สามารถดึงข้อมูลได้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต';
    herbs.value = [];
  }
  finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchHerbs();
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <SearchBar :categories="categories" @search="handleSearch" @filter="handleFilter" />

    <main class="container mx-auto px-4 py-6 grow">
      <!--  Error -->
      <div v-if="error" class="max-w-md mx-auto mt-10 p-8 text-center bg-red-50 border border-red-200 rounded-xl shadow-sm">
        <p class="text-red-600 font-medium text-lg mb-4 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ error }}
        </p>
        <button class="px-6 py-2 bg-primary hover:bg-dark text-white rounded-lg transition-colors shadow-sm cursor-pointer" @click="fetchHerbs">
          ลองใหม่อีกครั้ง
        </button>
      </div>

      <!-- Skeleton Grid -->
      <div v-else-if="loading" class="mt-4">
        <div class="flex items-center gap-3 mb-6 text-text-muted">
          <!-- Spinner -->
          <div class="w-5 h-5 border-2 border-slate-200 border-t-primary rounded-full animate-spin" />
          <p class="font-medium animate-pulse">
            กำลังดาวน์โหลดข้อมูลสมุนไพร...
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <HerbCardSkeleton v-for="n in 8" :key="n" />
        </div>
      </div>

      <template v-else>
        <div v-if="filteredHerbs.length" class="mb-6 text-text-muted font-medium">
          พบ {{ filteredHerbs.length }} รายการ
        </div>

        <div v-if="filteredHerbs.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
          <HerbCard v-for="herb in filteredHerbs" :key="herb.ID" :herb="herb" />
        </div>

        <div v-else class="text-center py-20 text-text-muted bg-white rounded-xl border border-dashed border-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="text-lg">
            ไม่พบสมุนไพรที่ตรงกับการค้นหา
          </p>
          <p class="text-sm text-slate-400 mt-1">
            ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น
          </p>
        </div>
      </template>
    </main>
  </div>
</template>
