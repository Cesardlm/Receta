function loadImage(url) {
   return new Promise(resolve => {
       const xhr = new XMLHttpRequest();
       xhr.open('GET', url, true);
       xhr.responseType = "blob";
       xhr.onload = function (e) {
           const reader = new FileReader();
           reader.onload = function(event) {
               const res = event.target.result;
               resolve(res);
           }
           const file = this.response;
           reader.readAsDataURL(file);
       }
       xhr.send();
   });
}

window.addEventListener('load', async () => {

   const form = document.querySelector('#form');
   form.addEventListener('submit', (e) => {
       e.preventDefault();

       let nombres = document.getElementById('nombre').value;
       let expedientes = document.getElementById('expediente').value;
       let fecha = document.getElementById('fecha').value;
       let cantidad = document.getElementById('cantidad').value;
       let medicamento = document.getElementById('medicamento').value;
       let cantidad2 = document.getElementById('cantidad2').value;
       let medicamento2 = document.getElementById('medicamento2').value;
       let cantidad3 = document.getElementById('cantidad3').value;
       let medicamento3 = document.getElementById('medicamento3').value;
       let diagnostico = document.getElementById('diagnostico').value;

       generatePDF(nombres, expedientes, fecha, cantidad, medicamento, medicamento2, cantidad2, cantidad3, medicamento3, diagnostico)
   
    })
});

async function generatePDF(nombres, expedientes, fecha, cantidad, medicamento, medicamento2, cantidad2, cantidad3, medicamento3, diagnostico) {
   const image = await loadImage("formulario.jpg");

   const pdf = new jsPDF('p', 'pt', 'letter');

    const meds = pdf.splitTextToSize(medicamento, 700, {})
    const meds2 = pdf.splitTextToSize(medicamento2, 700, {})
    const meds3 = pdf.splitTextToSize(medicamento3, 700, {})

   pdf.addImage(image, 'PNG', 0, 0, 612, 792);

   pdf.setFontSize(10);
   pdf.text(nombres, 149, 103);
   pdf.text(expedientes, 131, 123);
   pdf.text(diagnostico, 108, 313);
   pdf.text(fecha, 477, 123);
   pdf.text(cantidad, 80, 155);
   pdf.text(meds, 135, 155);
   pdf.text(cantidad2, 80, 205);
   pdf.text(meds2, 135, 205);
   pdf.text(cantidad3, 80, 255);
   pdf.text(meds3, 135, 255);

   pdf.save("example.pdf");

}

function agregarPanel() {
    var panel2 = document.getElementById("panel2");
    var panel3 = document.getElementById("panel3");
     if (panel2.style.display == "none"){
        panel2.style.display = 'block';
     } else {
        panel3.style.display = 'block';
     }
}