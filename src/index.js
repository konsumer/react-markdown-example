import React, { createElement } from 'react'
import { render } from 'react-dom'
import ReactMarkdown from 'react-markdown'
import JsxParser from 'react-jsx-parser'

// this is just plain text
import text from './example.md'

// demo component
const MyChart = ({ size = 100, type = 'line' }) => <div>PIE GOES HERE, you asked for {type}: {size}</div>

// these are the components you want to expose to your markdown:
const components = {
  MyChart
}

const renderers = {
  code: ({ language, value }) => {
    if (language === 'jsx') {
      return <JsxParser jsx={value} components={components} />
    }
    const className = language && `language-${language}`
    const code = createElement('code', className ? { className } : null, value)
    return createElement('pre', {}, code)
  }
}

const App = () => <ReactMarkdown source={text} renderers={renderers} />

render(<App />, document.getElementById('root'))
