import { useState } from 'react';

const defaultValue = {
    color: "success",
    content: "",
    open: false
}

function useSnackbar() {
    const [snackbarOptions, setSnackbarOptions] = useState(defaultValue);

    const updateSnackbarOptions = (options) => {
        setSnackbarOptions((prevValue) => {
            return {
                ...prevValue,
                ...options
            }
        })
    }

    return {
        snackbarOptions,
        updateSnackbarOptions
    };
}

export default useSnackbar;
