import { createEvent, createStore, restore, sample, Store } from 'effector'

const DEFAULT_ITEMS_PER_PAGE = 10
const DEFAULT_ACTIVE_PAGE = 1
const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100]

export const createPagination = ($count: Store<number>) => {
  const activePageSet = createEvent<number>('set active page')
  const changePage = createEvent<'next' | 'previous'>('change page')
  const setItemsPerPage = createEvent<number>('set items per page')

  const $activePage = restore(activePageSet, DEFAULT_ACTIVE_PAGE)
  const $itemsPerPage = createStore(DEFAULT_ITEMS_PER_PAGE)

  const $totalPages = sample({
    source: [$itemsPerPage, $count] as const,
    fn: ([itemsPerPage, count]) => (count > 0 ? Math.ceil(count / itemsPerPage) : 1),
  })

  sample({
    clock: changePage,
    source: { activePage: $activePage, totalPages: $totalPages },
    fn: ({ activePage, totalPages }, direction) => {
      const newPage = direction === 'next' ? activePage + 1 : activePage - 1
      return newPage > 0 && newPage <= totalPages ? newPage : activePage
    },
    target: $activePage,
  })

  sample({
    clock: setItemsPerPage,
    filter: (newItemsPerPage) => ITEMS_PER_PAGE_OPTIONS.includes(newItemsPerPage),
    target: $itemsPerPage,
  })

  sample({
    clock: setItemsPerPage,
    fn: () => DEFAULT_ACTIVE_PAGE,
    target: $activePage,
  })

  return {
    $activePage,
    $itemsPerPage,
    $totalPages,
    changePage,
    activePageSet,
    setItemsPerPage,
    itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS.map(String),
  }
}
