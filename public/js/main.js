// const { generateImage } = require("../../controllers/openaiController");


function onSubmit(e){
    e.preventDefault();

    document.querySelector('#msg').textContent='';
    document.querySelector('#pic').src='';

    const prompt=document.querySelector('#imageDetails').value;
    const size=document.querySelector('#imageSize').value;

    if(prompt==='' || size===''){
        document.querySelector('#msg').textContent="Enter Details Correctly";
        return;
    }
    // console.log('success');
    // console.log(prompt,size);
    generateImage(prompt,size);
}

async function generateImage(prompt,size){
    try {
        showSpinner();
        const response=await fetch('/openai/generateimage',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                prompt,size
            }),
        });

        if(!response.ok){
            removeSpinner();
            throw new Error('That image cannot be generated');
        }

        const res= await response.json();
        const imageUrl=res.data;
        document.querySelector('#pic').src=imageUrl;  
        removeSpinner();

    } catch (error) {
        document.querySelector('#msg').textContent=error;
        removeSpinner();
    }
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}
function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('form').addEventListener('submit',onSubmit);