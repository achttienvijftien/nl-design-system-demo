import '@nl-design-system-unstable/amsterdam-design-tokens/dist/index.css'
import '@utrecht/design-tokens/dist/index.css'
import '@nl-design-system-unstable/buren-design-tokens/dist/index.css'
import '@nl-design-system-unstable/leidschendam-voorburg-design-tokens/dist/index.css'
import '@nl-design-system-unstable/bodegraven-reeuwijk-design-tokens/dist/index.css'
import '@nl-design-system-unstable/haarlemmermeer-design-tokens/dist/index.css'

export let municipalities = [
    {
        name: 'Amsterdam',
        theme: 'amsterdam-theme',
        stability: 'unstable'
    },
    {
        name: 'Bodegraven-Reeuwijk',
        theme: 'bodegraven-theme',
        stability: 'unstable'
    },
    {
        name: 'Haarlemmermeer',
        theme: 'haarlemmermeer-theme',
        stability: 'unstable'
    },
    {
        name: 'Utrecht',
        theme: 'utrecht-theme',
        stability: 'stable'
    },
    {
        name: 'Buren',
        theme: 'buren-theme',
        stability: 'unstable'
    },
    {
        name: 'Leidschendam-Voorburg',
        theme: 'leidschendam-theme',
        stability: 'unstable'
    }
]
