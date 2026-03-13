import './style.css';

//const app =  document.querySelector('#app');
//app.innerHTML = '<h1> Cuichi </h1>';

const msg = 'hola que hace!';
const salud = `Salud!
Espero que te mejores :)
`;

const key = import.meta.env.VITE_IA_TOKEN || '<tu_token>';
// obtener en https://openrouter.ai/

const msg2 = `te queria decir que: ${msg}`;

let btn = document.querySelector('#btn');

async function consultIA() {

    const input = document.querySelector('.prompt');
    const promptUser = input.value;

    btn.textContent = 'Cargando peticion...';
    btn.disabled = true;

    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "openrouter/free",
            "messages": [
                {
                    "role": "user",
                    "content": promptUser
                }
            ],
            "reasoning": { "enabled": true }
        })
    });

    const data = await response.json();

    console.log(data);

    const msg = data.choices[0].message.content;

    const p = document.querySelector('.respuesta');

    const md = marked.parse(msg);
    p.innerHTML = md;
    btn.disabled = false;
    btn.textContent = 'Preguntar a la IA'

}

btn.addEventListener('click', async function () {

    await consultIA()

})


