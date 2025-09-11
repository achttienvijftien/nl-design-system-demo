import axios from "axios";

let randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getPublicationsByMunicipality = async function (municipalityName) {
    const baseUri = 'https://repository.overheid.nl/sru'
    const query = 'c.product-area=="officielepublicaties" AND (w.gemeente=="' + municipalityName + '" OR dt.creator=="' + municipalityName + '") sortby dt.modified/sort.descending'
    const params = new URLSearchParams({
        query: query,
        maximumRecords: 10,
    })

    return await axios.get(baseUri + '?' + params.toString())
        .then(response => {
            return response.data.searchRetrieveResponse?.records ?? [];
        })
}

export {randomNumber, getPublicationsByMunicipality}
