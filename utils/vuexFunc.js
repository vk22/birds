function getLotMainType(lot) {
  let mainType
  if (lot.type.toUpperCase().includes('ОФИС')) {
    mainType = 'offices'
  } else if (lot.type.toUpperCase().includes('СКЛАД')) {
    mainType = 'warehouses'
  } else if (lot.type.toUpperCase().includes('ПСН')) {
    mainType = 'psn'
  } else if (lot.type.toUpperCase().includes('СТОЛОВАЯ') || page.type.toUpperCase().includes('МАГАЗИН')) {
    mainType = 'retail'
  }
  return mainType
}
function getBreadcrumbs (lot, category) {
  const crumbs = []
  /// Главная
  crumbs.push({
    title: 'Главная',
    path: '/'
  })
  /// Category
  crumbs.push({
    title: category.title,
    path: category.url
  })
  /// Lot
  crumbs.push({
    title: lot.type,
    path: null
  })

  return crumbs
}
function formatDateRu(date) {
  const monthsArr = [
    "января", "февраля", "марта", "апреля", "мая", "июня", 
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ]
  date = new Date(date)
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const MM = monthsArr[date.getMonth()]
  const yyyy = date.getFullYear()
  return (dd + ' ' + MM + ' ' + yyyy + ' г.')
};

function formatDateRuWitoutYear(date) {
  const monthsArr = [
    "января", "февраля", "марта", "апреля", "мая", "июня", 
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ]
  date = new Date(date)
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const MM = monthsArr[date.getMonth()]
  const yyyy = date.getFullYear()
  return (dd + ' ' + MM)
};

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
export default { getBreadcrumbs, getLotMainType, formatDateRu, formatDateRuWitoutYear, numberWithSpaces }
