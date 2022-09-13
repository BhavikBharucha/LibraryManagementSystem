import React, { useState,useEffect } from 'react';
import { mockComponent } from 'react-dom/test-utils';
//import { Link,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import validator from 'validator';
const {VerifyToken} = require("../AuthGuard");

const RegisterLibrarianStudent = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contactno, setContactno] = useState('');
    const [dob, setDob] = useState('');
    const [alternate_contact_name, setAltcontactname] = useState('');
    const [alternate_contact_contactno, setAltcontactno] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [total_issued_books, setTotalissuedbooks] = useState(0);
    const [error, setError] = useState(false);
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [contactnoError, setContactnoError] = useState('');
    const [altnameError, setAltNameError] = useState('');
    const [altcontactnoError, setAltContactnoError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    
    useEffect(()=>{
        VerifyToken();
    },[]);

    const testdisable=()=>{
        
        return new Date().toISOString().split("T")[0];
    }

    const collectdata = async () => {
        //setTotalissuedbooks(total_issued_books,"0");

        console.log(
            firstname,
            lastname,
            address,
            email,
            contactno,
            dob,
            alternate_contact_name,
            alternate_contact_contactno,
            username,
            password,
            role,
            total_issued_books
        );

        // useEffect(()=>{
        //     const auth = localStorage.getItem('user');
        //     if(auth){
        //         navigate('/');
        //     }
        // });

        if (
            !firstname ||
            !lastname ||
            !address ||
            !email ||
            !contactno ||
            !dob ||
            !alternate_contact_name ||
            !alternate_contact_contactno ||
            !username ||
            !password
        ) {
            setError(true);
            return false;
        }

        //Email validation :- @ and . is must.
        if (!validator.isEmail(email)) {
            setEmailError('Please Enter valid email!');
            return;
        }

        let result = await fetch('http://localhost:5000/member/register', {
            method: 'post',
            body: JSON.stringify({
                firstname,
                lastname,
                address,
                email,
                contactno,
                dob,
                alternate_contact_name,
                alternate_contact_contactno,
                username,
                password,
                role,
                total_issued_books
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();

        console.log(result);

        if (result) {
            swal({
                title: 'Registration',
                text: 'Registration Successfully!',
                icon: 'success'
            });
        }

        localStorage.setItem('user', JSON.stringify(result.result)); //Used to store data in local storage.(It will remain until you remove menually.)
        // localStorage.setItem("token",JSON.stringify(result.auth));
    };

    //Validate Firstname
    const validateFirstName = (e) => {
        var pattern = new RegExp(/[A-Za-z]+/);
        if (!pattern.test(firstname)) {
            setFirstnameError('Please Enter Valid Fitstname!');
            return;
        } else {
            setFirstnameError('');
        }
    };

    //Validate Lastname
    const validateLastName = (e) => {
        var pattern = new RegExp(/[A-Za-z]+/);
        if (!pattern.test(lastname)) {
            setLastnameError('Please Enter Valid Lastname!');
            return;
        } else {
            setLastnameError('');
        }
    };

    //Validate Address
    const validateAddress = (e) => {
        if (address.length > 100) {
            setAddressError('Only 100 characters are allowed!');
            return;
        } else {
            setAddressError('');
        }
    };

    //Validate Contactno
    const validateContactno = (e) => {
        var pattern = new RegExp(/^[789]\d{9}$/);
        if (!pattern.test(contactno)) {
            setContactnoError('Only 10 numbers are allowed!');
            return;
        } else {
            setContactnoError('');
        }
    };

    //Validate Alternate contact name
    const validateAltContactname = (e) => {
        var pattern = new RegExp(/[A-Za-z]+/);
        if (!pattern.test(alternate_contact_name)) {
            setAltNameError('Please Enter Valid Alternate Contact Name!');
            return;
        } else {
            setAltNameError('');
        }
    };

    //Validate Alternate contact number
    const validateAltContactno = (e) => {
        var pattern = new RegExp(/^[789]\d{9}$/);
        if (!pattern.test(alternate_contact_contactno)) {
            setAltContactnoError('Only 10 numbers are allowed!');
            return;
        } else {
            setAltContactnoError('');
        }
    };

    //Validate Password
    const validatePassword = (e) => {
        var pattern = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        );
        if (!pattern.test(password)) {
            setPasswordError(
                'Only 8 characters are allowed, include 1 number,1 uppercase and lowercase letter and 1 special character!'
            );
            return;
        } else {
            setPasswordError('');
        }
    };

    return (
        <div className='registerLibrarianStudent'>
            <div className='row'>
                <div className='col-md-3'></div>

                <div className=' col-md-12' style={{paddingLeft:'129px'}}>
                    <div className='registerLibrarianStudent-form'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Registration</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <input
                                            type='text'
                                            placeholder='Enter Firstname'
                                            className='txtfname'
                                            title='Enter Firstname'
                                            value={firstname}
                                            onChange={(e) => {
                                                setFirstname(e.target.value);
                                                validateFirstName();
                                            }}
                                            id='txtfname'
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {firstnameError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !firstname && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>

                                    <div className='col-md-6'>
                                        <input
                                            type='text'
                                            placeholder='Enter Lastname'
                                            className='txtlname'
                                            title='Enter Lastname'
                                            value={lastname}
                                            onChange={(e) => {
                                                setLastname(e.target.value);
                                                validateLastName();
                                            }}
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {lastnameError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !lastname && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-5 textareaAddress' >
                                        <textarea
                                            type='textarea'
                                            cols={83}
                                            rows={4}
                                            placeholder='Enter Address'
                                            className='txtaddress'
                                            value={address}
                                            onChange={(e) => {
                                                setAddress(e.target.value);
                                                validateAddress();
                                            }}
                                            title='Enter Address'
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {addressError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !address && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-4'>
                                        <input
                                            type='email'
                                            placeholder='Enter Email'
                                            className='txtemail'
                                            title='Enter Email'
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {emailError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !email && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>

                                    <div className='col-md-4'>
                                        <input
                                            type='number'
                                            placeholder='Enter Contactno'
                                            className='txtcontactno'
                                            title='Enter Contactno'
                                            maxLength={10}
                                            value={contactno}
                                            onChange={(e) => {
                                                setContactno(e.target.value);
                                                validateContactno();
                                            }}
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {contactnoError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !contactno && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>

                                    <div className='col-md-4'>
                                        {/* dateid.max=new
                                        Date().toISOString().split("T")[0]; */}

                                        <input
                                            id='dateid'
                                            type='date'
                                            className='txtdob'
                                            value={dob}
                                            onChange={(e) =>
                                                setDob(e.target.value)
                                            }
                                            required
                                            max={testdisable()}
                                        />
                                        {error && !dob && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <input
                                            type='text'
                                            placeholder='Enter Alternate Contact Name'
                                            className='txtalternatename'
                                            value={alternate_contact_name}
                                            onChange={(e) => {
                                                setAltcontactname(
                                                    e.target.value
                                                );
                                                validateAltContactname();
                                            }}
                                            title='Enter Alternate Contact Name'
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {altnameError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !alternate_contact_name && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>

                                    <div className='col-md-6'>
                                        <input
                                            type='number'
                                            placeholder='Enter Alternate Contactno'
                                            className='txtalternatecontactno'
                                            value={alternate_contact_contactno}
                                            onChange={(e) => {
                                                setAltcontactno(e.target.value);
                                                validateAltContactno();
                                            }}
                                            title='Enter Alternate Contactno'
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {altcontactnoError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !alternate_contact_contactno && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <input
                                            type='text'
                                            placeholder='Enter Username'
                                            className='txtusername'
                                            title='Enter Username'
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            required
                                        />

                                        {error && !username && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>

                                    <div className='col-md-6'>
                                        <input
                                            type='password'
                                            placeholder='Enter Password'
                                            className='txtpwd'
                                            title='Enter Password'
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                validatePassword();
                                            }}
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {passwordError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !password && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-12'>
                                        <select
                                            className='ddlrole'
                                            value={role}
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                        >
                                            <option value={'librarian'}>
                                                librarian
                                            </option>
                                            <option value={'student'}>
                                                student
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <center>
                                        <button
                                            type='button'
                                            className='btn btn-primary'
                                            onClick={collectdata}
                                        >
                                            Add
                                        </button>
                                    </center>
                                </div>

                                {/* <div>
                            <p>If you have an account? <Link to="/login">Login Here....</Link></p>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-1'></div>
            </div>
        </div>
    );
};

export default RegisterLibrarianStudent;
