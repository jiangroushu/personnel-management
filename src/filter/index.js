import filters from './filters'

const importFilters = Vue => {
    Vue.filter('dayFormat', filters.dayFormat)
}

export default importFilters
