import {useState} from 'react'
import './App.css'
import {
    ButtonGroup,
    Fieldset,
    FieldsetLegend,
    FormField,
    FormLabel,
    Heading2,
    HeadingGroup,
    Paragraph,
    SecondaryActionButton,
    Select,
    SelectOption,
    SpotlightSection,
    StatusBadge,
    Textbox
} from '@utrecht/component-library-react/dist/css-module'
import {municipalities} from './municipalities'
import {randomNumber} from "./utils"
import Publications from "./Publications";
import {useDebouncedCallback} from "use-debounce";
import {PrimaryActionButton} from "@utrecht/component-library-react";

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
                    <SpotlightSection type={"info"} className={"search-section"}>
                        <Fieldset>
                            <FieldsetLegend>
                                <FormLabel htmlFor={"search-query"}>Zoeken:</FormLabel>
                            </FieldsetLegend>
                            <FormField>
                                <Textbox id={"search-query"} onKeyUp={handleSearch} placeholder={"Zoekterm"}/>
                            </FormField>
                        </Fieldset>
                        <ButtonGroup direction={"row"}>
                            <PrimaryActionButton>
                                Zoek
                            </PrimaryActionButton>
                            <SecondaryActionButton onClick={() => setQuery('')}>
                                Zoek opnieuw
                            </SecondaryActionButton>
                        </ButtonGroup>
                    </SpotlightSection>
                    <Publications municipality={municipality} searchQuery={query}/>
                </div>
            </div>
        </>
    )
}

export default App
