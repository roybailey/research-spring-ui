import React from 'react'
import ReactWidgets from 'react-widgets'
import styles from 'react-widgets/dist/css/react-widgets.css'
import moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import numberLocalizer from 'react-widgets/lib/localizers/simple-number'

const DateTimePicker = ReactWidgets.DateTimePicker;
const SelectList = ReactWidgets.SelectList;
const NumberPicker = ReactWidgets.NumberPicker;
momentLocalizer(moment);
numberLocalizer();
console.log(styles);


export const DatePickerField = (props) => {
    const onFieldChange = (value) => {
        props.input.onChange(moment(value).format('YYYY-MM-DD'));
    };
    const value = (!props.input.value)? moment.toDate() : moment(props.input.value).toDate();
    return (
        <div className="field">
            <DateTimePicker
                format={"YYYY-MM-DD"}
                time={false}
                value={moment(value).toDate()}
                onChange={onFieldChange}
                />
            {props.meta && props.meta.touched && props.meta.error &&
            <span className="ui error message">{props.meta.error}</span>}
        </div>
    );
};


export const SelectListField = (props) => {
    const valueField = props.valueField || 'id';
    const textField = props.textField || 'name';
    const onFieldChange = (value) => {
        props.input.onChange(value[valueField]);
    };
    return (
        <div className="field">
            <SelectList
                valueField={valueField}
                textField={textField}
                data={props.data}
                value={props.input.value}
                onChange={onFieldChange}
                />
            {props.meta && props.meta.touched && props.meta.error &&
            <span className="ui error message">{props.meta.error}</span>}
        </div>
    );
};


export const NumberPickerField = (props) => {
    const onFieldChange = (value) => {
        props.input.onChange(value);
    };
    return (
        <div className="field">
            <NumberPicker
                value={props.input.value || props.defaultValue || 0}
                step={props.step}
                min={props.min}
                onChange={onFieldChange}
                />
            {props.meta && props.meta.touched && props.meta.error &&
            <span className="ui error message">{props.meta.error}</span>}
        </div>
    );
};

