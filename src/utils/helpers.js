// Loader sets calculates offsets and items to view

export const paginationLoader = (data, currentPage, rowsPerPage) => {
  const itemOffset = currentPage * rowsPerPage
  const endOffset = itemOffset + rowsPerPage
  const itemsToView = data.slice(itemOffset, endOffset)
  return itemsToView
}
