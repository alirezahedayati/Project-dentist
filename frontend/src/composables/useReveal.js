import { onBeforeUnmount, onMounted, watch } from 'vue'

/**
 * Adds the `ds-in` class to every `.ds-reveal` element inside `rootRef`
 * when it scrolls into view. Uses a single IntersectionObserver and
 * disconnects it on unmount for performance.
 */
export function useReveal(rootRef) {
    let observer = null

    const observe = () => {
        const root = rootRef?.value
        if (!root || typeof IntersectionObserver === 'undefined') return

        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('ds-in')
                        observer.unobserve(entry.target)
                    }
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        )

        root.querySelectorAll('.ds-reveal:not(.ds-in)').forEach((el) => observer.observe(el))
    }

    onMounted(observe)
    watch(rootRef, observe)
    onBeforeUnmount(() => observer?.disconnect())
}
