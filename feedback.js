let form = document.querySelector('form');
const API_URL = 'http://localhost:3001/feedback'
const userName = document.getElementById('name')
const email = document.getElementById('email')
const join = document.getElementById('join')
const travel = document.getElementById('travel')
const words = document.getElementById('words')
const most = document.getElementById('most')
const burden = document.getElementById('burden')
const career = document.getElementById('career')


const getFeedbackData = async (url) =>
{
    const response = await fetch(url)
    const result = await response.json()
    return result
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
   const processData = async () => {
    const a = await getFeedbackData(API_URL)
    const id = a.length + 1
    const feedback = {
        id: `${id}`,
        name: `${userName.value}`,
        email: `${email.value}`,
        burden: `${burden.value}`,
        career: `${career.value}`
    }
    postData(API_URL, feedback)
   }
    
//     fetch("https://script.google.com/macros/s/AKfycbzBE-Yzh9ISu2H0vWwBD_jHoSXXbjsTVQDzq4YBq7cCgc8Su_EsXa7wy_LoNWeyElRu/exec", {
//         method: "POST",
//         body: data
//     }).then(res => res.text).then(data => {form.reset(); alert('Data Submitted Successfully')}
//    );
    processData()
})



const postData = async(url, feedback) =>
{
    try
    {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(feedback)
        })
        console.log(result)
    }
    catch(err)
    {
        console.log(err)
    }
}
