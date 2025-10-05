import axios from "axios";

let randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getPublicationsByMunicipality = async function (municipalityName, searchQuery, currentPage, recordsPerPage) {
    const baseUri = 'https://repository.overheid.nl/sru'
    let query = 'c.product-area=="officielepublicaties" AND (w.gemeente=="' + municipalityName + '" OR dt.creator=="' + municipalityName + '")'

    if (searchQuery) {
        const queryParts = searchQuery.split(' ').map(part => 'cql.textAndIndexes="' + part + '"')
        query += ' AND (' + queryParts.join(' AND ') + ')'
    }

    query += ' sortby dt.modified/sort.descending'

    const params = new URLSearchParams({
        query: query,
        maximumRecords: recordsPerPage,
        startRecord: currentPage * recordsPerPage,
    })

    return await axios.get(baseUri + '?' + params.toString())
        .then(response => {
            return response.data?.searchRetrieveResponse ?? [];
        })
}

export {randomNumber, getPublicationsByMunicipality}
