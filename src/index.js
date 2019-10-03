import React from 'react'
import { render } from 'react-dom'
import ReactMarkdown from 'react-markdown'
import JsxParser from 'react-jsx-parser'
import PieChart from 'react-minimal-pie-chart'
import styled from 'styled-components'
import yaml from 'js-yaml'
import SynHi from './SynHi'

// this is just plain text
import text from './example.md'

// constrain pie, so it doesn't fill page
const PieWrapper = styled.div`
  width: 100px;
  height: 100px;
`

// these are the components you want to expose to your jsx-in-markdown:
const components = {
  PieChart: (props) => <PieWrapper><PieChart {...props} /></PieWrapper>
}

const renderers = {
  code: ({ language, value }) => {
    // render "jsx" type as self-contained JSX (with only above components exposed)
    if (language === 'jsx') {
      return <JsxParser jsx={value} components={components} />
    }

    // render "pie" type as YAML and hand it to a pie
    if (language === 'pie') {
      return <PieWrapper><PieChart data={yaml.safeLoad(value)} /></PieWrapper>
    }

    return <SynHi language={language}>{value}</SynHi>
  }
}

const App = () => <ReactMarkdown source={text} renderers={renderers} />

render(<App />, document.getElementById('root'))
