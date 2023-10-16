import React,{useState} from 'react';
import './App.css';
import { toast,ToastContainer } from 'react-toastify'
import {numbers,upperCaseLetters,lowerCaseLetters,specialCharacters} from './charectors.js';
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message'

function App() {

   const [password,setPassword] = useState('')
   const [passwordLength,setPasswordLength]=useState(20)
   const [includeUppercase,setIncludeUppercase]=useState(false)
   const [includeLowercase,setIncludeLowercase]=useState(false)
   const [includeNumbers,setIncludeNumbers]=useState(false)
   const [includeSymbols,setIncludeSymbols]=useState(false)

   const handleGeneratePassword = (e) =>{
          
         if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
          notify('You must select atleat one option',true)
         }
         let charectorsList= ''

         if(includeLowercase){
               charectorsList = charectorsList + lowerCaseLetters
         }
         if(includeUppercase){
              charectorsList = charectorsList + upperCaseLetters
         }
         if(includeNumbers){
              charectorsList = charectorsList + numbers
         }
         if (includeSymbols) {
              charectorsList = charectorsList + specialCharacters
         }
         setPassword(createPassword(charectorsList))
   }
   const createPassword = (charectorsList) => {
        let password = ''
        const charectorsListLength= charectorsList.length

        for(let i=0; i< passwordLength;i++){
          const charectorIndex = Math.round(Math.random() * charectorsListLength)
          password = password + charectorsList.charAt(charectorIndex)
        }
        return password
   }

   const copyToClipboard = () =>{
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
   }

   const notify = (message,hasError= false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       })
    } else{
    toast(message, {
     position: "top-center",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
      });
     }
   }

   const handleCopyPassword = (e) => {
    if(password === ''){
      notify('Nothing to copy',true)
    }else{
     copyToClipboard()
     notify(COPY_SUCCESS)
   }
 }


  return <div className='App'>
    <div className="container">
      <div className="generator">
        <h2 className="generator_header">
           SKU Generator
           </h2>
           <div className="generator_password">
             <h3>{password}</h3>
             <button onClick={handleCopyPassword} className="copy_btn">
             <i className="far fa-clipboard"></i>
             </button>
          </div>


                 <div className="form-group">
                   <label htmlFor="password-strength">Password Length</label>
                     <input 
                      defaultValue={passwordLength}
                      onChange={(e) => setPasswordLength(e.target.value)}
                     type="number" id="password-strength" name="password-strength" max="20" min="10" />
                  </div>

                  <div className="form-group">
                   <label htmlFor="uppercase-latters">ProductName</label>
                     <input 
                       checked={includeUppercase}
                       onChange={(e) => setIncludeUppercase(e.target.checked)}
                     type="checkbox" id="uppercase-latters" name="uppercase-latters" />
                  </div>

                  <div className="form-group">
                   <label htmlFor="lowercase-latters">Brand</label>
                   <input
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      type="checkbox" id="lowercase-latters" name="lowercase-latters"/>
                  </div>

                  <div className="form-group">
                   <label htmlFor="include-numbers">ProductType</label>
                     <input
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      type="checkbox" id="include-numbers" name="include-numbers"/>
                  </div>

                   

                  <button onClick={handleGeneratePassword} className="generator-btn">Generator Button</button>
                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    />

              </div>
           </div>

        </div>




}

export default App;
