
const tarefaI = document.getElementById('tarefaI');
const BtnAdicionar = document.getElementById('Btn-adicionar');
const listaTarefas = document.getElementById('listaTarefas');


function ListaDtarefa() {
    const Tarefatxt = tarefaI.value.trim(); 
    if (Tarefatxt === '') return; 

    // Cria lista 
    const lista = document.createElement('li'); 
    lista.textContent = Tarefatxt; 

    const deletarBtn = document.createElement('button');
    deletarBtn.textContent = 'Delete';
    deletarBtn.className = 'deletar-btn';
    deletarBtn.onclick = function() {
        listaTarefas.removeChild(lista); 
    };

    lista.appendChild(deletarBtn); 
    lista.onclick = function() {
        lista.classList.toggle('feito'); // marca como completo
    };

    listaTarefas.appendChild(lista); 
    tarefaI.value = ''; 
}


BtnAdicionar.addEventListener('click', ListaDtarefa);
tarefaI.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        ListaDtarefa(); 
    }
});