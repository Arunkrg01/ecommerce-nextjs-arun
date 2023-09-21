import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import authPhoto from '../../public/images/auth4.jpg';
import Image from 'next/image';
import logo from '../../public/images/logo3.png'
import { Button } from 'react-bootstrap';
import { login, signUp } from '@/services/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function Auth(props) {
    const [auth, setAuth] = useState('login')
    const router = useRouter();


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNo: null
    })

    const handleLogin = () => {
        const data = {
            email: formData.email,
            password: formData.password
        }
        login(data).then((res)=>{
            console.log(res)
           if(res.token){
            localStorage.setItem('jwtToken',res.token)
            localStorage.setItem('userinfo',JSON.stringify(res.user))
            Cookies.set('jwtToken', res.token, { expires: 7 }); // Expires in 7 days
            Cookies.set('userinfo', JSON.stringify(res.user), { expires: 7 });
            setFormData({
                email:"",
                password:""
            })
            router.push('/');
           }
        }).catch((err) => { console.log(err) })
    }
    const handleSignUp = () => {
        const data = {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            mobile: parseInt(formData.mobileNo)
        }
        signUp(data).then((res) => {
            console.log(res)
            if(res.token){
                localStorage.setItem('jwtToken',res.token)
                localStorage.setItem('userinfo',JSON.stringify(res.user))
                Cookies.set('jwtToken', res.token, { expires: 7 }); // Expires in 7 days

                // Set user info in cookie as well, if needed
                Cookies.set('userinfo', JSON.stringify(res.user), { expires: 7 });
                setFormData({
                    fullName:"",
                    email:"",
                    password:"",
                    confirmPassword:"",
                    mobileNo:""
                })
                router.push('/');
            }
        }).catch((err) => { console.log(err) })
    }
    const handleAuthSwap = () => {
        if (auth === "login") {
            setAuth("signup")
        } else if (auth === "signup") {
            setAuth("login")
        }
    }
    return (
        <Box>
            <Grid container spacing={0}>
                <Grid xs={12} md={6} lg={6}>
                    <Image src={authPhoto} alt="photo" style={{ width: "100%", height: "100%" }} />
                </Grid>
                <Grid xs={12} md={6} lg={6} sx={{ backgroundColor: "#f2efe1" }}>
                    {
                        auth === "login" ?
                            <Box sx={{ justifyContent: "center", alignItems: "center", textAlign: "center", paddingTop: "4rem" }}>
                                <Image src={logo} alt="logo" style={{ width: "30%", height: "20%" }} />
                                <Typography sx={{ marginTop: "2rem", marginBottom: "2rem" }}>Login into your account</Typography>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    sx={{ width: "50%", marginBottom: "1rem" }}
                                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                                    value={formData.email}
                                    placeholder='arun@test.com'
                                />
                                <br></br>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Password"
                                    sx={{ width: "50%", marginBottom: "1rem" }}
                                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                                    value={formData.password}
                                    placeholder='123456'
                                />
                                <br></br>
                                <Button variant="info" style={{ backgroundColor: '#1daaa3', color: 'white' }} className="w-50" onClick={handleLogin}>
                                    LOGIN
                                </Button>
                                <Typography sx={{ marginTop: "1rem", marginBottom: "1rem" }}>Forget Password?</Typography>
                                <Typography onClick={handleAuthSwap} sx={{ cursor: "pointer" }}>Don't have an account? Sign Up Now</Typography>
                                <Typography sx={{ paddingTop: "3rem", color: "grey" }}>Terms of use.Privacy Policy</Typography>
                            </Box> :
                            <Box sx={{ justifyContent: "center", alignItems: "center", textAlign: "center", paddingTop: "1rem" }}>
                                <Image src={logo} alt="logo" style={{ width: "30%", height: "20%" }} />
                                <Typography sx={{ marginTop: "2rem", marginBottom: "2rem" }}>Create an new Account</Typography>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Full Name"
                                    sx={{ width: "50%", marginBottom: "1rem" }}
                                    onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }) }}
                                    value={formData.fullName}
                                />
                                <br></br>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    sx={{ width: "50%", marginBottom: "1rem" }}
                                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                                    value={formData.email}
                                />
                                <br></br>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Password"
                                    sx={{ width: "50%", marginBottom: "1rem" }}
                                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                                    value={formData.password}
                                />
                                <br></br>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Confirm Password"
                                    sx={{ width: "50%", marginBottom: "1rem" }}
                                    onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }) }}
                                    value={formData.confirmPassword}
                                />
                                <br></br>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Mobile No"
                                    sx={{ width: "50%", marginBottom: "1rem" }}
                                    onChange={(e) => { setFormData({ ...formData, mobileNo: e.target.value }) }}
                                    value={formData.mobileNo}
                                />
                                <br></br>
                                <Button variant="info" style={{ backgroundColor: '#1daaa3', color: 'white' }} className="w-50" onClick={handleSignUp}>
                                    Create Account
                                </Button>
                                <Typography sx={{ marginTop: "1rem", marginBottom: "1rem" }}>Forget Password?</Typography>
                                <Typography onClick={handleAuthSwap} sx={{ cursor: "pointer" }}>Already have an account? Login</Typography>
                                <Typography sx={{ paddingTop: "3rem", color: "grey" }}>Terms of use.Privacy Policy</Typography>
                            </Box>
                    }
                </Grid>
            </Grid>
            <ToastContainer/>
        </Box>
    );
}

export default Auth;
