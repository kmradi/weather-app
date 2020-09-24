const submit = document.getElementById('submit')
const input = document.getElementById('address')
const form = document.getElementById('form')
const result = document.getElementById('result')

form.addEventListener('submit',(e) =>{
    result.innerText = 'Loading...'
    e.preventDefault()
    let url = 'http://localhost:3000/weather?address='+input.value
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error)
            return result.innerText = data.error
        console.log(data.forecast)
        console.log(data.location)
        result.innerText = "\nWeather forecast:\n\n"+data.forecast + " \n\nlocation : "+data.location
        })
    })
})

