import { useEffect, useState } from "react";
import { Quote } from "./Quote";
import { SubmitButton } from "./Button";
import { InputBox } from "./InputBox";
import { WarnHeading } from "./WarnHeading";
import { Heading } from "./Heading";
import { SignupInput } from "@shivamx88/comman";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShowErrorMessage } from "./ShowMessage";
import { apiUrl } from "../config";

export const Signup = ()=> {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: '',
        email: '',
        password: ''
    });
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
        if(!isSubmitting && postInputs.email && postInputs.password && postInputs.name){
            setIsSubmitting(true);
        }
    }

    useEffect(()=> {
        const sendRequest = async ()=> {
            try {  
                const res = await axios.post(`${apiUrl}/user/signup`, {
                    name: postInputs.name,
                    email: postInputs.email,
                    password: postInputs.password
                });
                if(res.data.success) {
                    console.log(res);
                    localStorage.setItem('token', `Bearer ${res.data.token}`);
                    navigate('/blog');
                }
                } catch (e) {
                    setIsSubmitting(false); 
                    if(axios.isAxiosError(e)){
                        setErrorMessage(e.response?.data.errors?.email?._errors || e.response?.data.errors?.password?._errors || e.response?.data?.message);
                        return;
                    }
                    else {
                        setErrorMessage("An error occured.")
                    }
                }

        }

        if(isSubmitting) {
            sendRequest(); 
        }
    }, [isSubmitting, postInputs, navigate])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-200">
            <ShowErrorMessage message={errorMessage} setErrorMessage={setErrorMessage}/>
            <div className="flex h-full bg-white justify-center p-2 items-center md:p-10 w-full">
                <div className="w-[70%] md:w-[85%] ">
                    <Heading title="Create an account" />
                    <WarnHeading refTitle="Login" reference="/signin" content="Already have an account."/>
                    <InputBox 
                            heading="Name"
                            id="name"
                            placeholder="Enter your name"
                            type="text"
                            value={postInputs.name || ''}
                            onChange={(e) => {
                                setPostInputs(c =>({
                                    ...c,
                                    name: e.target.value
                                }))
                            }}
                        />
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
                    <SubmitButton onClick={handleSubmit} isSubmitting={isSubmitting} title="Signup"/>
                </div>
            </div>
            <Quote 
                content="“Blogging is to writing what extreme sports are to athletics: more free-form, more accident-prone, less formal, more alive. It is, in many ways, writing out loud”" 
                author="Andrew Sullivan"
                reputation="British-American Political Commentator"
            />
        </div>
    )


}