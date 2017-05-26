import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import { View } from 'react-native';

class EmployeeCreate extends Component {

	onButtonPress() {
		//this takes out the name, phone, shift out of the redux props
		const { name, phone, shift } = this.props;

		this.props.employeeCreate({ name, phone, shift: shift || "Monday" });
	}

	render() {
		//this is the employee being passed from the props, undefined if just clicked "Add"
		console.log(this.props.employee)

		return (
			<Card>
			<View>
				<EmployeeForm { ...this.props }/>
			</View>
			
			<View>
				<CardSection style={{position: 'absolute'}}>
					<Button onPress={this.onButtonPress.bind(this)}>
						Create
					</Button>
				</CardSection>
			</View>
			</Card>

		);
	}
}


const mapStateToProps = (state) => {
	const { name, phone, shift } = state.employeeForm;

	return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);




