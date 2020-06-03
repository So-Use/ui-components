import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import { classSet } from '../utils/utils';
import './table.scss';


/* eslint-disable react/prop-types, no-unused-vars, react/jsx-key */
function Pagination({gotoPage, canPreviousPage, canNextPage, nextPage, previousPage, pageIndex, pageOptions, setPageSize, pageSize, pageCount}) {
    return (
      <div className="pagination">
        <button className="pagination-first-page" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <i className="fas fa-angle-double-left"></i>
        </button>
        <button className="pagination-previous-page" onClick={() => previousPage()} disabled={!canPreviousPage}>
        <i className="fas fa-angle-left"></i>
        </button>
        <div className="pagination-page-container">
            <strong>Page{' '}</strong>
            <input
                className="pagination-page"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
                }}
            />
            <strong>
            {' '} of {pageOptions.length} 
          </strong>
        </div>
        <button className="pagination-next-page" onClick={() => nextPage()} disabled={!canNextPage}>
          <i className="fas fa-angle-right"></i>
        </button>
        <button className="pagination-last-page" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <i className="fas fa-angle-double-right"></i>
        </button>
        
        <select
          className="select-per-page"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    )
}

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
  


function TableWrapper({ rowClassName, columns, data, filterable, fetchData, loading, pageCount: controlledPageCount, initialPageSize }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
      getHooks
    } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: initialPageSize}, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
    )
    const [ globalFilter, setGlobalFilter ] = React.useState("");
    const [ ascendingSort, setAscendingSort ] = React.useState(true);
    const [ sortOn, setSortOn ] = React.useState("");

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ globalFilter, pageIndex, pageSize, sortOn, ascendingSort })
        
    }, [fetchData, globalFilter, pageIndex, pageSize, sortOn, ascendingSort])
  

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
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => {
                  return (
                    <th
                    {... (column.sortable ? column.getHeaderProps({onClick: () => {setSortOn(column.id);setAscendingSort(!ascendingSort)}}) : column.getHeaderProps())}
                        className={classSet({"sortable": column.sortable})}
                        {... (column.sortable ? (ascendingSort ? {'data-sortdir': 'asc'} : {'data-sortdir': 'desc'}) : {})}
                        title={column.render('Header')}
                    >
                        {column.render('Header')}
                    </th>
                )}
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
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
      
        <Pagination 
            gotoPage={gotoPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            nextPage={nextPage}
            previousPage={previousPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            setPageSize={setPageSize}
            pageSize={pageSize}
            pageCount={pageCount}
        />
      
      </div>
    )
  }

/* eslint-enable react/prop-types, no-unused-vars, react/jsx-key */

PaginatedTable.propTypes = {
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
         * Column title
         */
        title: PropTypes.string,
        /**
         * Column id (must be unique, default is accessor)
         */
        id: PropTypes.string,
        /**
         * Field accessor (or function to retrieve an object)
         */
        accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        /**
         * Enable/disable column sort
         */
        sortable: PropTypes.bool,
        link: PropTypes.shape({
            label: PropTypes.string.isRequired,
            iconClass: PropTypes.string.isRequired,
            href: PropTypes.func.isRequired,
        }),
      })
    ).isRequired,
    /**
     * Enable/disable filter on table
     */
    filterable: PropTypes.bool.isRequired,
    /**
     * URL to call when user search something
     */
    searchUrl: PropTypes.func.isRequired,
    /**
     * Function to parse response to retrieve items to display
     */
    resultsFromResponse: PropTypes.func.isRequired,
    /**
     * Function to parse response to retrieve total results
     */
    totalFromResponse: PropTypes.func.isRequired,
    /**
     * Number of items per page
     */
    pageSize: PropTypes.number.isRequired,
    /**
     * Class name for a row (take item in parameter)
     */
    rowClassName: PropTypes.func.isRequired
}

PaginatedTable.defaultProps = {
    filterable: false,
    resultsFromResponse: (response) => response.results,
    totalFromResponse: (response) => response.total,
    pageSize: 20,
    rowClassName: () => ""
}

/**
 * 
 * Table which can be paginated. A search url must be provided (see `searchUrl` props)
 * Built from 'react-table' component
 */
export function PaginatedTable(props) {
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
    

    // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ globalFilter, pageSize, pageIndex, sortOn, ascendingSort }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)
    const sortParameter = `${sortOn}|${ascendingSort ? 'ASC' : 'DESC'}`;
    fetch(props.searchUrl((globalFilter || ""), pageSize, pageIndex * pageSize, sortParameter).replace(/\&amp;/g, "&")) // eslint-disable-line no-irregular-whitespace, no-useless-escape
        .then(r => r.json())
        .then(response => {
            // Only update the data if this is the latest fetch
            if (fetchId === fetchIdRef.current) {
                
                setData(props.resultsFromResponse(response))
                const pageCount = Math.ceil(props.totalFromResponse(response) / pageSize)
                setPageCount(pageCount)
                setLoading(false)
            }
        })


    
  }, [])

    return <TableWrapper rowClassName={props.rowClassName} initialPageSize={props.pageSize} fetchData={fetchData} pageCount={pageCount} loading={loading} columns={columns} data={data} filterable={props.filterable}/>
}
