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
						<td>Row {i}, Column 3</td>
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
