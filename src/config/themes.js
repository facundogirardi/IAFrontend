import cyan from '@material-ui/core/colors/cyan'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'

const themes = [
  {
    id: 'default',
    color: blue[500],
    source: {
      palette: {
        primary: blue,
        secondary: blue,
        error: blue,
      },
    },
  },
  {
    id: 'Cyan',
    color: cyan[500],
    source: {
      palette: {
        primary: cyan,
        secondary: cyan,
        error: cyan,
      },
    },
  },
  {
    id: 'Verde',
    color: green[500],
    source: {
      palette: {
        primary: green,
        secondary: red,
        error: red,
      },
    },
  },
]

export default themes
