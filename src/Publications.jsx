import {useEffect, useState} from "react";
import {getPublicationsByMunicipality} from "./utils";
import {
    DataBadge,
    DataList,
    DataListItem,
    DataListKey,
    DataListValue,
    Document,
    Heading3,
    Separator
} from "@utrecht/component-library-react/dist/css-module";

const Publications = (attributes) => {
    const {municipality} = attributes;
    const [publications, setPublications] = useState([])

    if (!municipality) {
        return null
    }

    useEffect(() => {
        getPublicationsByMunicipality(name).then(publications => {
            console.log(publications.record)
            setPublications(publications.record)
        })
    }, [name = municipality.name]);

    return (municipality && publications.length > 0 && publications.map((publication) => (
            <>
                <div id={publication.recordData.gzd.originalData.meta.owmskern.identifier} className={"publication"}>
                    <DataBadge>{publication.recordData.gzd.originalData.meta.owmskern.type.$}</DataBadge>
                    <Heading3>
                        {publication.recordData.gzd.originalData.meta.owmskern.title}
                    </Heading3>
                    <Document className={"publication-meta"}>
                        <DataList>
                            <DataListItem>
                                <DataListKey>Datum publicatie</DataListKey>
                                <DataListValue>{publication.recordData.gzd.originalData.meta.owmsmantel.date}</DataListValue>
                            </DataListItem>
                            <DataListItem>
                                <DataListKey>Jaargang en nummer</DataListKey>
                                <DataListValue>{publication.recordData.gzd.originalData.meta.tpmeta.publicatienaam}, {publication.recordData.gzd.originalData.meta.tpmeta.publicatienummer}</DataListValue>
                            </DataListItem>
                        </DataList>
                    </Document>
                    <Separator/>
                </div>
            </>
        ))
    )
}

export default Publications;
