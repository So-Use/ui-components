import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { classSet } from '../utils/utils';
import './table.scss';


/* eslint-disable react/prop-types, react/jsx-key */
function GlobalFilter({
    globalFilter, 
    setGlobalFilter,
    className
  }) {
  
    return (
      <div className={`table-filter-container ${className || ''}`}>
        <input
          value={globalFilter || ''}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          }}
          placeholder="Filtrer les résultats..."
          className="table-filter"
        />
      </div>
    )
  }
  


function TableWrapper({ rowClassName, columns, data, filterable }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      state,
      setGlobalFilter,
      getHooks,
    } = useTable({
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    )

    if (rowClassName) {
        getHooks().getRowProps.push((props, { row }) => {
            return {
                ...props,
                className: rowClassName(row.original)
            }
        })
    }
  
    // Render the UI for your table
    return (
        <div className="table-container">
        {filterable && <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                  return (
                    <th
                        {... (column.sortType ? column.getHeaderProps(column.getSortByToggleProps()) : column.getHeaderProps())}
                        className={classSet({"sortable": column.sortType})}
                        {... (column.isSorted ? (column.isSortedDesc ? {'data-sortdir': 'desc'} : {'data-sortdir': 'asc'}) : {})}
                        title={column.title || column.render('Header')}
                    >
                        {column.render('Header')}
                    </th>
                )}
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                 // possibilite de choper des trucs via cell.column
                  return <td className={cell.column.className || ""} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    )
  }

/* eslint-enable react/prop-types, react/jsx-key */
  
Table.propTypes = {
  /**
   * Table columns
   */
  columns: PropTypes.arrayOf(
      PropTypes.shape({
        /**
          * Column header
         */
        Header: PropTypes.string.isRequired,
        /**
         * Field accessor (or function to retrieve an object)
         */
        accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        /**
         * Type of sort
         */
        sortByType: PropTypes.oneOfType([PropTypes.oneOf(["alphanumeric", "basic", "date"]), PropTypes.func]),
        link: PropTypes.shape({
            label: PropTypes.string.isRequired,
            iconClass: PropTypes.string.isRequired,
            href: PropTypes.func.isRequired,
        }),
        /**
         * Column id (must be unique, default is accessor)
         */
        id: PropTypes.string,
        /**
         * Column title
         */
        title: PropTypes.string,
        })
  ).isRequired,
  /**
   * Data to displayed
   */
  data: PropTypes.array.isRequired,
  /**
   * Enable/disable filtering
   */
  filterable: PropTypes.bool.isRequired,
  /**
   * Class name for a row
   */
  rowClassName: PropTypes.func.isRequired
}

Table.defaultProps = {
    data: [],
    filterable: false,
    rowClassName: () => ""
}

/**
 * Table component (built from 'react-table')
 * 
 */
export function Table(props) {
    const transformedColumns = props.columns.map(col => {
        if (col.link) {
            return {
                ...col,
                sortType: col.sortByType,
                Cell: ({value}) => <a href={`${col.link.href(value)}`} title={`${value.title}`}><i className={col.link.iconClass}></i> {col.link.label}</a> // eslint-disable-line react/display-name, react/prop-types
            }
        } else if (col.truncated){
            return {
                ...col,
                sortType: col.sortByType,
                Cell: ({value}) => <div className="truncated-content">{value}</div> // eslint-disable-line react/display-name, react/prop-types
            }
        } else {
            return {
                ...col,
                sortType: col.sortByType,
            }
        }
    })

    const columns = React.useMemo(
        () => transformedColumns,
        []
    );
    const data = React.useMemo(
        () => props.data,
        []
    )

    return <TableWrapper rowClassName={props.rowClassName} columns={columns} data={data} filterable={props.filterable}/>
}
