import { computed, ref, watch } from 'vue'

/**
 * Generic client-side search + sort + pagination helper for admin tables.
 * `searchFields` lists the keys used for free-text filtering.
 */
export function usePaginatedTable(itemsGetter, { searchFields = [], perPage = 8, sortDescKey = null } = {}) {
    const query = ref('')
    const page = ref(1)

    const filtered = computed(() => {
        const items = itemsGetter() || []
        const q = query.value.trim().toLowerCase()
        if (!q) return items
        return items.filter((item) =>
            searchFields.some((field) => String(item[field] ?? '').toLowerCase().includes(q))
        )
    })

    const sorted = computed(() => {
        const items = [...filtered.value]
        if (sortDescKey) {
            items.sort((a, b) => new Date(b[sortDescKey] ?? 0) - new Date(a[sortDescKey] ?? 0))
        }
        return items
    })

    const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / perPage)))

    const paged = computed(() => {
        const start = (page.value - 1) * perPage
        return sorted.value.slice(start, start + perPage)
    })

    const rangeInfo = computed(() => {
        const total = sorted.value.length
        if (!total) return 'هیچ موردی یافت نشد'
        const start = (page.value - 1) * perPage + 1
        const end = Math.min(page.value * perPage, total)
        return `نمایش ${start}–${end} از ${total}`
    })

    watch(query, () => { page.value = 1 })
    watch(totalPages, (n) => { if (page.value > n) page.value = n })

    return { query, page, filtered: sorted, paged, totalPages, rangeInfo }
}
