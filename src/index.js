import arrify from 'arrify'
import React from 'react'
import _ from 'lodash'

class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: _.fill(Array(this.__$$getRowCount()), false),
		}
		this.fireEvent = false
	}

	componentDidUpdate() {
		if (this.fireEvent) {
			this.__$$triggerSelectionChange()
			this.fireEvent = false
		}
	}

	//
	// return [ th, th ... ] (including the select-all checkbox)
	//
	__$$getHeaderColumns() {
		const thead = _.chain(arrify(this.props.children))
			.filter(c => c.type == 'thead')
			.last()
			.value() || <thead></thead>

		const theadRow = _.chain(arrify(thead.props.children))
			.filter(c => c.type == 'tr')
			.last()
			.value() || <tr></tr>

		const headerColumns = _.chain(arrify(theadRow.props.children))
			.filter(c => c.type == 'th' || c.type == 'td')
			.value()
			.slice() // copy

		headerColumns.splice(0, 0, <th key="selectable-table-checkbox" style={{ textAlign: 'left' }}>
			<input ref="headerCheckbox" type="checkbox" checked={_.some(this.state.selected)} onClick={this.__$$onSelectAll.bind(this)} />
		</th>)
		return headerColumns
	}

	//
	// return [ tr, tr, ... ]
	//
	__$$getRawTbodyTrs() {
		const tbody = _.chain(arrify(this.props.children))
				.filter(c => c.type == 'tbody')
				.last()
				.value() || <tbody></tbody>

		return _.chain(arrify(tbody.props.children))
			.filter(c => c.type == 'tr')
			.value()
	}

	//
	// Get the rows including the row selection checkbox
	//
	__$$getRows() {
		const trs = this.__$$getRawTbodyTrs().slice() // copy

		return trs.map((tr, i) => {
			const columns = arrify(tr.props.children).slice() // copy
			columns.splice(0, 0, <td key="selectable-table-checkbox" style={{ textAlign: 'left' }}>
				<input type="checkbox" checked={this.state.selected[i]} onClick={this.__$$onRowSelected.bind(this, i)} />
			</td>)
			return columns
		})
	}

	//
	// Get the number of rows in the tbody
	//
	__$$getRowCount() {
		return this.__$$getRawTbodyTrs().length
	}

	__$$checkboxShouldBeIndeterminate(selected) {
		return !_.every(selected) && _.some(selected)
	}

	//
	// Call props.onChange, and set the indeterminate value of the select-all checkbox
	//
	__$$triggerSelectionChange() {
		const selected = this.state.selected
		this.refs.headerCheckbox.indeterminate = this.__$$checkboxShouldBeIndeterminate(selected)

		const fn = this.props.onChange || (() => { })
		fn(this, this.getSelectedIndices(selected))
	}

	__$$onSelectAll(e) {
		const selected = _.fill(Array(this.__$$getRowCount()), e.target.checked)
		this.fireEvent = true
		this.setState({ selected })
	}

	__$$onRowSelected(i, e) {
		const selected = this.state.selected.slice()
		selected[i] = e.target.checked
		this.fireEvent = true
		this.setState({ selected })
	}

	//
	// Returns rows that are selected (if isSelected = true)
	// or unselected (if isSelected = false)
	//
	__$$getSelectedIndices(selected, isSelected) {
		selected = selected || this.state.selected
		return _.chain(selected)
			.map((rowSelected, i) => rowSelected == Boolean(isSelected) ? i : false)
			.filter(x => x !== false)
			.value()
	}

	//
	// Return the selected indices
	//
	getSelectedIndices(selected) {
		return this.__$$getSelectedIndices(selected, true)
	}

	//
	// Return the unselected indices
	//
	getUnselectedIndices(selected) {
		return this.__$$getSelectedIndices(selected, false)
	}

	setSelectedIndicies(indicies) {
		indicies = arrify(indicies)
		const selected = _.fill(Array(this.__$$getRowCount()), false)
		indicies.forEach(index => {
			selected[index] = true
		})
		this.fireEvent = true
		this.setState({ selected })
	}

	render() {
		return <table style={this.props.style} className={this.props.className}>
			<thead>
				<tr>
					{this.__$$getHeaderColumns()}
				</tr>
			</thead>
			<tbody>
				{this.__$$getRows().map((row, i) => <tr key={i}>{row}</tr>)}
			</tbody>
		</table>
	}
}

export default Table
export { Table }
