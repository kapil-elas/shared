/**
 =========================================================
 * ELAS APP - SHARED
 =========================================================
 */
import React from "react";
// import { useDispatch, useNavigate } from "react-redux";
import { useState } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { SoftBox, SoftButton, SoftInput, SoftTypography, PageLayout } from "@elas/shared/components";

const ChangePassword = ({ token, image, changePassword, logout }) => {
    const [password, setPassword] = useState({});
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleInput = (e) => {
        setPassword((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    }
    const submit = () => {
        const updatedPassObj = { ...password };
        delete updatedPassObj?.newPasswd;
        changePassword({ ...updatedPassObj, token });
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
                                    {'Change Password'}
                                </SoftTypography>
                            </SoftBox>
                        </SoftBox>
                        <SoftBox p={3}>
                            <SoftBox component="form" role="form">
                                {!token && <SoftBox mb={2} lineHeight={1.25}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Current Password
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput type="password" placeholder="Current Password" name="oldPasswd" onChange={handleInput} />
                                    <SoftTypography variant="button" color="text" fontWeight="regular">
                                        <SoftTypography
                                            component={Link}
                                            to="/reset-password"
                                            variant="button"
                                            color="info"
                                            fontWeight="medium"
                                            textGradient
                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        >
                                            Forgot your Password?
                                        </SoftTypography>
                                    </SoftTypography>
                                </SoftBox>
                                }
                                <SoftBox mb={2} lineHeight={1.25}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            New Password
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput type="password" placeholder="New Password" name="newPasswd" onChange={handleInput} />
                                </SoftBox>
                                <SoftBox mb={2} lineHeight={1.25}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Confirm New Password
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput type="password" placeholder="Confirm New Password" name="password" onChange={handleInput} error={!!password?.cnewpassword && (password?.newpassword !== password?.cnewpassword)} success={password?.cnewpassword && password?.newpassword === password?.cnewpassword} />
                                </SoftBox>
                                <SoftBox mt={4} mb={1}>
                                    <SoftButton onClick={() => submit()} variant="gradient" color="info" fullWidth disabled={password?.newpassword !== password?.cnewpassword}>
                                        Submit
                                    </SoftButton>
                                </SoftBox>
                                {(token || localStorage.getItem('password-expired')) && <SoftBox mt={3} textAlign="center">
                                    <SoftTypography variant="button" color="text" fontWeight="regular">
                                        Back to
                                        <SoftTypography
                                            component={Link}
                                            to="/signin"
                                            variant="button"
                                            color="info"
                                            fontWeight="medium"
                                            textGradient
                                            ml={0.5}
                                            // onClick={() => dispatch(logout(navigate))}    
                                        >
                                            Sign in
                                        </SoftTypography>
                                    </SoftTypography>
                                </SoftBox>}
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

ChangePassword.defaultProps = {
    changePassword: () => null,
};


// Typechecking props for the CoverLayout
ChangePassword.propTypes = {
    token: PropTypes.string,
    image: PropTypes.string.isRequired,
    changePassword: PropTypes.func.isRequired,
    logout: PropTypes.func,
};

export default ChangePassword;