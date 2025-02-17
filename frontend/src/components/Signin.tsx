import { Fragment } from "react/jsx-runtime"
import { InputBox } from "./InputBox"
import { useEffect, useState } from "react"
import { Heading } from "./Heading";
import { Quote } from "./Quote";
import { WarnHeading } from "./WarnHeading";
import { SubmitButton } from "./Button";
import { SigninInput } from "@shivamx88/comman";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShowErrorMessage } from "./ShowMessage";
import { apiUrl } from "../config";


export const Signin = ()=> { 
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const navigate = useNavigate();

    const visibilityChange = ()=> {
        if(passwordType === 'password'){
            setPasswordType('text');
        }
        else {
            setPasswordType('password');
        }
    }

    const handleSubmit = ()=> {
        if(!isSubmitting && postInputs.email && postInputs.password){
            // console.log('button clicked')
            setIsSubmitting(true);
        }
    }
    
    useEffect(()=> {
        const sendRequest = async ()=> {
            try {  
                // console.log(`api url: ${apiUrl}`)
                const res = await axios.post(`${apiUrl}/user/signin`, {
                    email: postInputs.email,
                    password: postInputs.password
                });
                if(res.data.success) {
                    localStorage.setItem('token', `Bearer ${res.data.token}`);
                    navigate('/blog');
                }
                } catch (e) {
                    console.log(e);
                    setIsSubmitting(false); 
                    if(axios.isAxiosError(e)){
                        setErrorMessage(e.response?.data.errors?.email?._errors || e.response?.data.errors?.password?._errors || e.response?.data?.message);
                        return;
                    }
                    setErrorMessage("An error occured");
            }

        }

        if(isSubmitting) {
            sendRequest();
        }
    }, [isSubmitting,navigate, postInputs])

    return (
        <Fragment>
            <div className="grid grid-cols-1  bg-slate-200 md:grid-cols-2 overflow-auto h-screen items-center">
                <ShowErrorMessage message={errorMessage} setErrorMessage={setErrorMessage}/>
                <div className="flex h-full bg-white justify-center p-2 items-center md:p-10 w-full">
                    <div className="w-[70%] md:w-[85%] ">
                    <Heading title="Login your account" />
                    <WarnHeading refTitle="Signup" reference="/signup" content="Register as a new user."/>
                    <InputBox 
                            heading="Email"
                            id="emailID"
                            placeholder="mail@example.com"
                            type="text"
                            value={postInputs.email}
                            onChange={ (e) => { 
                                setPostInputs(c => ({
                                    ...c,
                                    email: e.target.value
                                }));
                            }}
                    />
                    <InputBox 
                            heading="Password"
                            id="password"
                            placeholder="Password"
                            type={passwordType}
                            value={postInputs.password}
                            onChange={ (e) => {
                                setPostInputs(c=> ({
                                    ...c,
                                    password: e.target.value
                                }));
                            }}
                    />
                   <div className="flex m-2 items-center">
                        <input onChange={visibilityChange} type="checkbox" className="shrink-0 mt-0.5 hover:cursor-pointer border-gray-200 rounded text-blue-600 focus:ring-blue-500"/>
                        <label className="text-sm text-gray-500 ms-3">Show password</label>
                    </div>
                    <SubmitButton onClick={handleSubmit} isSubmitting={isSubmitting} title="Signin"/>
                    </div>
                </div>
                <Quote 
                        content="“Where the Internet is about availability of information, blogging is about making information creation available to anyone.”" 
                        author="George Siemens"
                        reputation="Expatriate Professor | Psychology"
                />
            </div>
        </Fragment>
    )
}