import {useState} from 'react'
import './App.css'
import {
    Alert,
    Fieldset,
    FieldsetLegend,
    FormField,
    FormLabel,
    Heading2,
    HeadingGroup,
    Paragraph,
    Select,
    SelectOption,
    StatusBadge
} from '@utrecht/component-library-react/dist/css-module'
import {municipalities} from './municipalities'
import {randomNumber} from "./utils"
import Publications from "./Publications";
import {Textbox} from "@utrecht/component-library-react";
import {useDebouncedCallback} from "use-debounce";

function App() {
    const [municipality, setMunicipality] = useState(municipalities[randomNumber(0, municipalities.length - 1)])
    const [query, setQuery] = useState('')

    const handleSearch = useDebouncedCallback(
        (event) => {
            setQuery(event.target.value)
        },
        500
    )

    return (
        <>
            <div className={municipality.theme}>
                <header className={"sticky-bar"}>
                    <div className={"sticky-bar-item"}>
                        <HeadingGroup>
                            <Heading2>NL Design System Demo</Heading2>
                            <Paragraph>Huidige
                                gemeente: <strong>{municipality.name}</strong>
                                <StatusBadge
                                    status={'stable' === (municipality.stability ?? 'unstable') ? 'safe' : 'warning'}>{municipality.stability ?? 'unstable'}</StatusBadge></Paragraph>
                        </HeadingGroup>
                    </div>
                    <div className={"sticky-bar-item"}>
                        <FormField>
                            <FormLabel htmlFor={"search-query"}>Zoeken:</FormLabel>
                            <Textbox id={"search-query"} onKeyUp={handleSearch} placeholder={"Zoekterm"}/>
                        </FormField>
                    </div>
                    <div className={"sticky-bar-item"}>
                        <Fieldset>
                            <FieldsetLegend>
                                <FormLabel htmlFor={"municipality-select"}>Selecteer gemeente:</FormLabel>
                            </FieldsetLegend>
                            <Select
                                id={"municipality-select"}
                                value={municipalities.indexOf(municipality)}
                                onChange={(e) => setMunicipality(() => municipalities[e.target.value])}>
                                {
                                    municipalities.map(
                                        (municipalityOption, index) =>
                                            <SelectOption
                                                value={index}>{municipalityOption.name} ({municipalityOption.stability})</SelectOption>
                                    )
                                }
                            </Select>
                        </Fieldset>
                    </div>
                </header>

                <div className={"content-wrapper"}>
                    <Publications municipality={municipality} searchQuery={query}/>
                </div>
            </div>
        </>
    )
}

export default App
