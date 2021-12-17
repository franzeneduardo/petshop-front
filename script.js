//Variável referente as informações globais da aplicação
var globaldata = {}

//Açoes de abertura de popups
$('.modal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    //globaldata.editModal = button.data();
    globaldata.deleteModal = button.data()
    globaldata.addModal = {}
})

//Ações de carregamento da página
$(document).ready(function() {
  globaldata.info = false
  globaldata.erro = false
  rivets.bind($('#main'), {globaldata: globaldata})          

  listar()
});

//Utilitário para setar uma mensagem de informação
function info(descricao){
  globaldata.info = descricao
}

//Método usado para tratar erros 400/500 da resposta HTTP como erro.
async function handleErrors(response) {

  globaldata.erro = false
  globaldata.info = false

  if (!response.ok) {
    let body = await response.json()
    console.error('Erro:'+body)

    if(body.mensagem){
      globaldata.erro = body.mensagem

    }else if(body.message){
      globaldata.erro = 'Ocorreu um erro inesperado: '+body.message

    }else{
      globaldata.erro = 'Ocorreu um erro inesperado. Contate o administrador!'
    }

    setTimeout(function(){ globaldata.erro = null;  }, 5000);
    hideLoader()

    throw Error(globaldata.erro);
  }

  hideAllModals()

  try {
    return response;    
  } catch (error) {
    console.log('Erro ao ler Json: '+error)
  }
}

function hideAllModals () {
  $('.modal').modal('hide')
}

function showLoader () {
  document.getElementById("spinner").classList.add("show")
}

function hideLoader () {
  setTimeout(function(){ document.getElementById("spinner").classList.remove("show");  }, 50);
  //document.getElementById("spinner").classList.remove("show")
}
