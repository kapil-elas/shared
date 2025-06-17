/**
 =========================================================
 * ELAS APP - SHARED
 =========================================================
 */

import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { SoftBox, SoftTypography, SoftInput, SoftButton, PageLayout, Footer } from "./../../../components";
import { validateEmail } from "@elas/shared/utils/helpers";
import { SNACKBAR_TIMEOUT } from '@elas/shared/utils/config';
import { logout } from "@elas/redux/session/action";


// import { updateSnackbarOptions, resetSnackbarOptions } from "store/snackbarSlice";
// import { resetAuthState } from "store/authSlice";

function Signin({ color, header, title, description, image, top, signIn, setSnackbar, resetSnackbar }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((state) => state.session);
    const [signinDetails, setSigninDetails] = useState({});
    const [initial, setInitial] = useState(false);

    useEffect(() => {
        dispatch(logout());
    }, []);

    // useEffect(() => {
    //     if (auth) {
    //         if (auth?.status_code === 200) {
    //             navigate('/home');
    //         } else if (Object.keys(auth).length) {
    //             dispatch(setSnackbar({
    //                 content: auth?.message || "Server not reachable",
    //                 open: true,
    //                 color: "error"
    //             }));

    //             setTimeout(() => {
    //                 dispatch(resetSnackbar());
    //             }, [SNACKBAR_TIMEOUT])
    //         }
    //     }
    // }, [auth, dispatch]);

    const submit = () => {
        if (!signinDetails?.email || !signinDetails?.password) {
        } else {
            // dispatch(resetAuthState())
            signIn(signinDetails)
        }
    }

    const handleInput = (e) => {
        setSigninDetails((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
        setInitial(true);
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
                    <SoftBox mt={top}>
                        <SoftBox pt={3} px={3}>
                            {!header ? (
                                <>
                                    <SoftBox mb={1}>
                                        <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
                                            {title}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftTypography variant="body2" fontWeight="regular" color="text">
                                        {description}
                                    </SoftTypography>
                                </>
                            ) : (
                                header
                            )}
                        </SoftBox>
                        {/* {status === 'failed' && <SoftAlert color="error" dismissable>{auth?.message}</SoftAlert>} */}
                        <SoftBox p={3}>
                            <SoftBox component="form" role="form">
                                <SoftBox mb={2} lineHeight={1.25}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Email
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput type="email" placeholder="Email" name="email" onChange={handleInput} required error={initial && !validateEmail(signinDetails?.email)} success={validateEmail(signinDetails?.email)} />
                                </SoftBox>
                                <SoftBox mb={2} lineHeight={1.25}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Password
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput type="password" placeholder="Password" name="password" onChange={handleInput} required error={initial && !signinDetails?.password} success={signinDetails?.password} />
                                </SoftBox>
                                <SoftBox mt={4} mb={1}>
                                    <SoftButton onClick={() => submit()} variant="gradient" color="info" fullWidth disabled={!signinDetails?.password || !validateEmail(signinDetails?.email)}>
                                        sign in
                                    </SoftButton>
                                </SoftBox>
                                <SoftBox mt={3} textAlign="center">
                                    <SoftTypography variant="button" color="text" fontWeight="regular">
                                        <SoftTypography
                                            component={Link}
                                            to="/reset-password"
                                            variant="button"
                                            color="info"
                                            fontWeight="medium"
                                            textGradient
                                        >
                                            Reset Password
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
            <Footer />
        </PageLayout>
    );
}

// Setting default values for the props of CoverLayout
Signin.defaultProps = {
    header: "",
    title: "",
    description: "",
    color: "info",
    top: 15,
    signIn: () => null,
};

// Typechecking props for the CoverLayout
Signin.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
    ]),
    header: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    top: PropTypes.number,
    signIn: PropTypes.func.isRequired,
    setSnackbar: PropTypes.func.isRequired,
    resetSnackbar: PropTypes.func.isRequired,
};

export default Signin;
