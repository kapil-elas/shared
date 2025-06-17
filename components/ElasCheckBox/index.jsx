import React from 'react';
import { SoftBox } from "@elas/shared/components";
import { Checkbox } from "@mui/material";
const ElasCheckBox = (value, onCheckboxChange) => {
    const [isChecked, setIsChecked] = React.useState(false);
    const handleChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onCheckboxChange(value, checked);
    };
    return (
        <SoftBox>
            <Checkbox checked={isChecked} onChange={handleChange} />
        </SoftBox>
    );
}

export default ElasCheckBox;