import {useState} from 'react'
import './App.css'
import {
    Fieldset,
    FieldsetLegend,
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

function App() {
    const [municipality, setMunicipality] = useState(municipalities[randomNumber(0, municipalities.length - 1)]);

    return (
        <>
            <div className={municipality.theme}>
                <header className={"sticky-bar"}>
                    <div>
                        <HeadingGroup>
                            <Heading2>NL Design System Demo</Heading2>
                            <Paragraph>Huidige
                                gemeente: <strong>{municipality.name}</strong>
                                <StatusBadge
                                    status={'stable' === (municipality.stability ?? 'unstable') ? 'safe' : 'warning'}>{municipality.stability ?? 'unstable'}</StatusBadge></Paragraph>
                        </HeadingGroup>
                    </div>
                    <div>
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
                    <Publications municipality={municipality}/>
                </div>
            </div>
        </>
    )
}

export default App
