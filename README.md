# react-selectable-table
> A React component that allows for its rows to be selected/deselected

# Installation

```sh
npm i --save-dev react-selectable-table
```

# Use

```js
import React from 'react'
import ReactDOM from 'react-dom'
import SelectableTable from '../../src/index'
import _ from 'lodash'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { selectedIndicies: [ ] }
	}

	onSelectionChange() {
		this.setState({ selectedIndicies: this.refs.table.getSelectedIndices() })
	}

	render() {
		return <div>
			<SelectableTable onChange={this.onSelectionChange.bind(this)} ref="table">
				<thead>
					<tr>
						<th>Column 1</th>
						<th>Column 2</th>
						<th>Column 3</th>
					</tr>
				</thead>
				<tbody>
					{_.range(0, 10).map(i => <tr key={i}>
						<td>Row {i}, Column 1</td>
						<td>Row {i}, Column 2</td>
						<td>Row {i}, Column 2</td>
					</tr>)}
				</tbody>
			</SelectableTable>

			<p>Selected Indicies: {this.state.selectedIndicies.join(', ')}</p>

			<p>Select:
				<button type="button" onClick={() => this.refs.table.setSelectedIndicies(_.range(0, 10))}>All</button><span> / </span>
				<button type="button" onClick={() => this.refs.table.setSelectedIndicies()}>None</button>
			</p>
		</div>
	}
}

window.addEventListener('load', function () {
	ReactDOM.render(<App />, document.getElementById('react'))
})

```

# License

ISC License (ISC) Copyright (c) 2016, Jonathan Apodaca jrapodaca@gmail.com

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
