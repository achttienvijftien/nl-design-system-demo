import {useEffect, useState} from "react";
import {getPublicationsByMunicipality} from "./utils";
import {
    ButtonLink,
    DataBadge,
    DataList,
    DataListItem,
    DataListKey,
    DataListValue,
    Document,
    Heading2,
    Heading3,
    HeadingGroup,
    Icon,
    NumberBadge,
    Separator
} from "@utrecht/component-library-react/dist/css-module";

const Publications = (attributes) => {
    const {municipality, searchQuery} = attributes;
    const [publications, setPublications] = useState([])
    const [meta, setMeta] = useState({
        numberOfRecords: 0,
    })

    if (!municipality) {
        return null
    }

    useEffect(() => {
        getPublicationsByMunicipality(name, searchQuery).then(response => {
            const publications = Array.isArray(response.records.record) ? response.records.record : [response.records.record];

            setPublications(publications ?? [])
            setMeta({
                numberOfRecords: response.numberOfRecords ?? 0,
            })
        })
    }, [name = municipality.name, searchQuery]);

    return (municipality &&
        <div className={"publications"}>
            <HeadingGroup
                className={"results-header-group"}><Heading2>Zoekresultaten</Heading2><NumberBadge>{meta.numberOfRecords} resultaten</NumberBadge></HeadingGroup>
            {publications.length > 0
                ? <>
                    {
                        publications.map((publication) => (
                            <>
                                <div id={publication.recordData.gzd.originalData.meta.owmskern.identifier}
                                     className={"publication"}>
                                    <DataBadge
                                        className={"publication-label"}>{publication.recordData.gzd.originalData.meta.owmskern.type.$ ?? 'onbekend'}</DataBadge>
                                    <Heading3 className={"publication-title"}>
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
                                    <ButtonLink
                                        href={"https://zoek.officielebekendmakingen.nl/" + publication.recordData.gzd.originalData.meta.owmskern.identifier + ".pdf"}
                                        target={"_blank"}
                                        className={"publication-download"}>
                                        <Icon className={"publication-download-icon"}>
                                            <svg aria-hidden="true" focusable="false" role="img"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                                <path fill="none" d="M0 0h24v24H0z"/>
                                                <path d="M18 17v2H6v-2H3v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4h-3z"/>
                                                <path
                                                    d="M10.941 16.476a1.354 1.354 0 0 0 2.118 0l5.782-7.233a1.354 1.354 0 0 0-1.776-1.995L14 9.16V3.42c0-1.088-.94-1.411-1.999-1.411-1.061 0-2.001.323-2.001 1.41v5.742L6.936 7.248A1.354 1.354 0 1 0 5.16 9.244l5.781 7.232z"/>
                                            </svg>
                                        </Icon>
                                        Download PDF
                                    </ButtonLink>
                                </div>
                                { publications.indexOf(publication) < publications.length - 1 && <Separator className={"publication-separator"}/>}
                            </>
                        ))
                    }
                </>
                : <Heading3>Geen resultaten gevonden</Heading3>}
        </div>
    )
}

export default Publications;
