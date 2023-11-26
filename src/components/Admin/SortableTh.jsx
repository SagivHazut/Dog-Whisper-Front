import React from 'react'

export const SortableTh = ({ field, title, sortOrder, onSort }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 cursor-pointer"
      onClick={() => onSort(field)}
    >
      {title}
      {sortOrder.field === field && (
        <span>
          {field === 'admin'
            ? sortOrder.ascending
              ? ' ▲'
              : ' ▼'
            : sortOrder.ascending
            ? ' ▲'
            : ' ▼'}
        </span>
      )}
    </th>
  )
}
