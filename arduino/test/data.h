// Data Vars Sensor
int ground_value = 0;
float humidity;
float tempC;
float tempF;

String Page = R"====(<!doctypehtml><html lang=en><meta charset=UTF-8><meta content="IE=edge"http-equiv=X-UA-Compatible><meta content="width=device-width,initial-scale=1"name=viewport><title>THSCM Server</title><style>*{margin:0;padding:0;box-sizing:border-box}body{color:#e9e9e9;background:rgba(51,51,51);display:grid;justify-items:center;align-content:center;height:100vh;gap:12px}.container{display:flex;width:100%;max-width:300px;flex-direction:column;justify-content:center;gap:12px}.input_group{display:flex;width:100%;max-width:400px;border-radius:12px;align-items:center;justify-content:center;position:relative;gap:6px;flex-direction:column}.input_group label{color:#fff;left:16px;font-weight:700}.input_group input{width:100%;border-radius:12px;padding:8px 16px;outline:0;border:none}.container button{width:100%;max-width:250px;padding:8px 16px;border-radius:12px;border:none;margin:0 auto;background:#6967ff;color:#fff;font-weight:700;transition:.3s all ease}.container button:hover{background:#370e96}.container button:disabled{opacity:.3}</style><h1>THSCM Web Server</h1><h3>Actualemente el thscm se conecta a la API: <span class=serverIp>192.168.0.20</span></h3><div class=container><div class=input_group><label for="">Cambiar IP</label> <input id=name_thscm name=name></div><button disabled id=sendBtn type=submit>Guardad</button></div><script>const serverIp = document.querySelector('.serverIp')
    const input = document.querySelector('#name_thscm')
    const button = document.querySelector('#sendBtn')
    var serverIpName

    input.addEventListener('keyup', () => {
      if (input.value !== "") {
        button.removeAttribute("disabled")
      }
    })

    input.addEventListener('paste', () => {
      if (input.value !== "") {
        button.removeAttribute("disabled")
      }
    })

    input.addEventListener('change', () => {
      if (input.value !== "") {
        button.removeAttribute("disabled")
      }
    })

    button.addEventListener('click', () => {
      serverIpName = input.value
      serverIp.innerHTML = serverIpName
      consultaGet("ip?valor=" + serverIpName)
      input.value = ""
    })

    function consultaGet(consulta) {
      const Http = new XMLHttpRequest()
      console.log("Consultando" + consulta)

      Http.open("GET", consulta)
      Http.send()

      Http.onreadystatechange = (e) => {
        console.log(Http.status)
        console.log(Http.reponseText)
      }
    }</script>)====";