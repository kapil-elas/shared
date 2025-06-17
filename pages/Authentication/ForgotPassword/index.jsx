/**
 =========================================================
 * ELAS APP - SHARED
 =========================================================
 */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { SoftBox, SoftButton, SoftInput, SoftTypography, PageLayout } from "@elas/shared/components";
import { validateEmail } from "@elas/shared/utils/helpers";
// import { updateSnackbarOptions } from "store/snackbarSlice";
// import { resetAuthState } from "store/authSlice";

const ForgotPassword = ({ image, resetPassword, setSnackbar }) => {
    const dispatch = useDispatch();
    const { reset = {} } = useSelector((state) => state.session);
    const [email, setEmail] = useState();

    // useEffect(() => {
    //     if (reset?.status_code === 202 || typeof reset === "string") {
    //         dispatch(setSnackbar({
    //             content: reset?.message || "Server not reachable",
    //             open: true,
    //             color: "success"
    //         }));
    //     }
    // }, [reset])

    const handleInput = (e) => {
        setEmail(e.target.value);
    }
    const submit = () => {
        resetPassword({email})
    }

    return (
        <PageLayout background="white">
            <Grid
                container
                justifyContent="center"
                sx={{
                    minHeight: "75vh",
                    margin: 0,
                }}
            >
                <Grid item xs={11} sm={8} md={5} xl={3}>
                    <SoftBox mt={20}>
                        <SoftBox pt={3} px={3}>
                            <SoftBox mb={1}>
                                <SoftTypography variant="h3" fontWeight="bold" color={'info'} textGradient>
                                    {'Reset Password'}
                                </SoftTypography>
                            </SoftBox>
                        </SoftBox>
                        <SoftBox p={3}>
                            <SoftBox component="form" role="form">
                                <SoftBox mb={2} lineHeight={1.25}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Email
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput type="email" placeholder="Email" name="email" onChange={handleInput} error={!validateEmail(email)} success={validateEmail(email)} />
                                </SoftBox>
                                <SoftBox mt={4} mb={1}>
                                    <SoftButton onClick={() => submit()} variant="gradient" color="info" fullWidth disabled={!validateEmail(email)}>
                                        submit
                                    </SoftButton>
                                </SoftBox>
                                <SoftBox mt={3} textAlign="center">
                                    <SoftTypography variant="button" color="text" fontWeight="regular">
                                        Back to {" "}
                                        <SoftTypography
                                            component={Link}
                                            to="/signin"
                                            variant="button"
                                            color="info"
                                            fontWeight="medium"
                                            textGradient
                                        >
                                            Sign in
                                        </SoftTypography>
                                    </SoftTypography>
                                </SoftBox>
                            </SoftBox>

                        </SoftBox>
                    </SoftBox>
                </Grid>
                <Grid item xs={12} md={5}>
                    <SoftBox
                        height="100%"
                        display={{ xs: "none", md: "block" }}
                        position="relative"
                        right={{ md: "-12rem", xl: "-16rem" }}
                        mr={-16}
                        sx={{
                            transform: "skewX(-10deg)",
                            overflow: "hidden",
                            borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
                        }}
                    >
                        <SoftBox
                            ml={-8}
                            height="100%"
                            sx={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                transform: "skewX(10deg)",
                            }}
                        />
                    </SoftBox>
                </Grid>
            </Grid>
        </PageLayout>
    )
}

// Typechecking props for the CoverLayout
ForgotPassword.propTypes = {
    image: PropTypes.string.isRequired,
    resetPassword: PropTypes.func.isRequired,
};

export default ForgotPassword;