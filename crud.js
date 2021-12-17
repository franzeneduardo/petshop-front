function listar(){

    let filtro = globaldata.filtroNome ? '?nome='+globaldata?.filtroNome : '';
    //filtro += globaldata.filtroCpf ? '&cpf='+globaldata?.filtroCpf : '';

    showLoader()

    fetch(BASE_URL+BASE_PATH+filtro)
    .then(handleErrors)
    .then(data => data.json())
    .then(data => {
        globaldata.lista = data
        console.log("GET: ");
        console.table(JSON.stringify(data))
        hideLoader()
    })
}

function buscarPorId(event){
    let link = $(event.currentTarget)
    let id = link.data('id')

    showLoader()

    fetch(BASE_URL+BASE_PATH+'/'+id, { 'method': 'GET'})
    .then(handleErrors)
    .then(data => data.json())
    .then(data => {
        globaldata.editModal = data
        $("#editModal").modal('toggle');
        hideLoader()
    })
}

function adicionar(){
    let body = JSON.stringify(globaldata.addModal)
    console.log("POST:")
    console.log(body)

    showLoader()

    fetch(BASE_URL+BASE_PATH, 
        { method: 'POST', 'body': body, headers: {'Content-Type': 'application/json'}})
    .then(handleErrors)
    .then(data => {
        hideLoader()
        listar()
        info('Salvo com sucesso!')
    })
}

function atualizar(){
    let body = JSON.stringify(globaldata.editModal)
    console.log("PUT:")
    console.table(body)

    showLoader()

    fetch(BASE_URL+BASE_PATH+'/'+globaldata.editModal.id, 
        { 'method': 'PUT', 'body': body, 'headers': {'Content-Type': 'application/json'}})
    .then(handleErrors)
    .then(data => {
        hideLoader()
        listar()
        info('Atualizado com sucesso!')
    })
}

function apagar(){
    let id = globaldata.deleteModal.id
    console.log("DELETE:")
    console.table(id)

    showLoader()

    fetch(BASE_URL+BASE_PATH+'/'+id,
        { method: 'DELETE', headers: {'Content-Type': 'application/json'}})
    .then(handleErrors)
    .then(data => {
        hideLoader()
        listar()
        info('Excluído com sucesso!')
    } )

}	
