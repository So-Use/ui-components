import React from 'react';
import { PaginatedTable } from './paginatedTable.js';


export default { 
    title: "🛠 Components/Table/PaginatedTable",
    component: PaginatedTable
}


const resultsFromResponse = (response) => {
    const data = response.data;
    return Object.keys(data).map(countryCode => {
        return {
            countryCode,
            ...data[countryCode]
        }
    })
}

const totalFromResponse = (response) => {
    return response.total;
}

/* eslint-disable no-unused-vars */

export const completePaginatedTable = () => <PaginatedTable
                                    columns={[
                                        {
                                            Header: 'Country code',
                                            accessor: "countryCode"
                                        },
                                        {
                                            Header: 'Country',
                                            accessor: 'country'
                                        },
                                        {
                                            Header: 'Region',
                                            accessor: 'region'
                                        }
                                    ]}
                                    searchUrl={(query, limit, offset, sort) => `https://api.first.org/data/v1/countries?q=${query}&limit=${limit}&offset=${offset}`}
                                    resultsFromResponse={resultsFromResponse}
                                    totalFromResponse={totalFromResponse}
                                    filterable={true}
                                    pageSize={10}
                                />


// https://api.first.org/global-irt/v1/teams?limit=20&envelope=true&sort=-host&q=acc&fields=official-team-name,constituency,constituency-description,host
export const sortablePaginatedTable = () => <PaginatedTable
                                    columns={[
                                        {
                                            Header: 'Name',
                                            accessor: "official-team-name",
                                            sortable: true
                                        },
                                        {
                                            Header: 'Host',
                                            accessor: 'host',
                                            sortable: true
                                        },
                                        {
                                            Header: 'Constituency',
                                            accessor: 'constituency',
                                            sortable: true
                                        }
                                    ]}
                                    searchUrl={(query, limit, offset, sort) => {
                                        const sortChunks = sort.split('|')
                                        let start = '';
                                        if (sortChunks[1] === 'DESC') {
                                            start = '-'
                                        }
                                        const sortParameter = `${start}${sortChunks[0]}`
                                        return `https://api.first.org/global-irt/v1/teams?q=${query}&limit=${limit}&offset=${offset}&envelope=true&sort=${sortParameter}&fields=official-team-name,constituency,constituency-description,host`
                                    }
                                    }
                                    resultsFromResponse={resultsFromResponse}
                                    totalFromResponse={totalFromResponse}
                                    filterable={true}
                                    pageSize={10}
                                />

sortablePaginatedTable.story = {
    parameters: { 
        docs: {
        storyDescription: "With sortable columns",
        },
    },
};