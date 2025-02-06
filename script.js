document.addEventListener('DOMContentLoaded', () => {
    const tarefasInput = document.getElementById('tarefasInput');
    const BtnAdicionar = document.getElementById('BtnAdicionar');
    const listaTarefas = document.getElementById('listaTarefas');

    let contadorClass = 1; // Contador para gerar classes únicas
    
    // Carregar tarefas do localStorage ao carregar a página
    CarregaTarefa();

    BtnAdicionar.addEventListener('click', () => {
        const imputText = tarefasInput.value.trim();
        if (imputText !== '') {
            adicionarTarefa(imputText);
            tarefasInput.value = '';
            salvarTarefas();
        }
    });

    tarefasInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const imputText = tarefasInput.value.trim();
            if (imputText !== '') {
                adicionarTarefa(imputText);
                tarefasInput.value = '';
                salvarTarefas();
            }
        }
    });

    function adicionarTarefa(imputText) {
        const li = document.createElement('li');
        const LiClass = `li-${String(contadorClass).padStart(2, '0')}`; // Classe única no padrão "li-01", "li-02", etc.
        li.className = LiClass;
        contadorClass++; // Incrementa o contador para a próxima tarefa

        const taskSpan = document.createElement('span');
        taskSpan.textContent = imputText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Deletar';
        deleteBtn.className = 'deletarBtn';
        deleteBtn.addEventListener('click', () => {
            listaTarefas.removeChild(li);
            salvarTarefas();
        });

        // Marcar tarefa como feita ao clicar nela
        li.addEventListener('click', () => {
            li.classList.toggle('feito');
            salvarTarefas();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        listaTarefas.appendChild(li);
    }

    function salvarTarefas() {
        const tarefas = [];
        const items = listaTarefas.getElementsByTagName('li');
        for (let item of items) {
            tarefas.push({
                text: item.firstChild.textContent,
                className: item.className,
                feito: item.classList.contains('feito') // Salva o estado "completo"
            });
        }
        localStorage.setItem('TarefasJSON', JSON.stringify(tarefas));
    }

    function CarregaTarefa() {
        const tarefas = JSON.parse(localStorage.getItem('TarefasJSON')) || [];
        tarefas.forEach(tarefa => {
            adicionarTarefa(tarefa.text);
            const li = listaTarefas.lastChild;
            li.className = tarefa.className; // Atribui a classe única
            if (tarefa.feito) {
                li.classList.add('feito'); // Restaura o estado "completo"
            }
        });
    }
});