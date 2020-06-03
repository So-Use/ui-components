import React from 'react';
import { Table } from './table.js';


export default { 
    title: "🛠 Components/Table/SimpleTable",
    component: Table
}

const data = [
    {
      firstname: "Amanda",
      lastname: "Buckland",
      age: 14
    },
    {
      firstname: "Dylan",
      lastname: "Roberts",
      age: 32
    },
    {
      firstname: "Abigail",
      lastname: "Forsyth",
      age: 28
    },
    {
      firstname: "Luke",
      lastname: "Burgess",
      age: 74
    },
    {
      firstname: "Sophie",
      lastname: "Payne",
      age: 61
    },
    {
      firstname: "Una",
      lastname: "McLean",
      age: 32
    },
    {
      firstname: "Julia",
      lastname: "Vaughan",
      age: 45
    },
    {
      firstname: "Dorothy",
      lastname: "Gray",
      age: 19
    },
    {
      firstname: "Owen",
      lastname: "Hardacre",
      age: 24
    },
    {
      firstname: "Alexandra",
      lastname: "Oliver",
      age: 38
    }
  ]



export const simpleTable = () => <Table
                                    columns={[
                                        {
                                            Header: 'Firstname',
                                            accessor: "firstname",
                                            sortByType: 'alphanumeric'
                                        },
                                        {
                                            Header: 'Lastname',
                                            accessor: 'lastname',
                                            sortByType: 'alphanumeric'
                                        },
                                        {
                                            Header: 'Age',
                                            accessor: 'age',
                                            sortByType: 'basic'
                                        }
                                    ]}
                                    data={data}
                                />


/* eslint-disable react/display-name, react/prop-types */

export const withColumnAsLink = () => <Table
                                columns={[
                                    {
                                        Header: 'Firstname',
                                        accessor: "firstname",
                                        sortByType: 'alphanumeric'
                                    },
                                    {
                                        Header: 'Lastname',
                                        accessor: 'lastname',
                                        sortByType: 'alphanumeric'
                                    },
                                    {
                                        Header: 'Age',
                                        accessor: 'age',
                                        sortByType: 'basic'
                                    },
                                    {
                                        Header: 'Actions',
                                        accessor: (item) => {return {firstname: item.firstname, lastname: item.lastname}},
                                        Cell: ({value}) => <a href="#">Voir la fiche de {value.firstname} {value.lastname}</a>
                                    }
                                ]}
                                data={data}
                                />

withColumnAsLink.story = {
    parameters: { 
        docs: {
        storyDescription: "Avec une colonne qui contient un lien.",
        },
    },
};

export const displayDependsOfValue = () => <Table
                                columns={[
                                    {
                                        Header: 'Firstname',
                                        accessor: "firstname",
                                        sortByType: 'alphanumeric'
                                    },
                                    {
                                        Header: 'Lastname',
                                        accessor: 'lastname',
                                        sortByType: 'alphanumeric'
                                    },
                                    {
                                        Header: 'Age',
                                        accessor: 'age',
                                        sortByType: 'basic'
                                    },
                                    {
                                        Header: 'Majeur',
                                        accessor: 'age',
                                        Cell: ({value}) => value < 18 ? "NON" : "OUI",
                                        id: 'major'
                                    }
                                ]}
                                data={data}
                                />

displayDependsOfValue.story = {
    parameters: { 
        docs: {
        storyDescription: "Different display according to value.",
        },
    },
};