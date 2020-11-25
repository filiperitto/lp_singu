// Example starter JavaScript for disabling form submissions if there are invalid fields
function formatar(mascara, documento){
  var i = documento.value.length;
  var saida = mascara.substring(0,1);
  var texto = mascara.substring(i)
  if (texto.substring(0,1) != saida){
    documento.value += texto.substring(0,1);
  }
}
calculaIdade = (idadeData) => {
  if(idadeData.length >= 1){
      let dataAtual       = new Date();
      let anoAtual        = dataAtual.getFullYear();
      let anoNascParts    = idadeData.split('-');
      let diaNasc         = anoNascParts[2];
      let mesNasc         = anoNascParts[1];
      let anoNasc         = anoNascParts[0];
      let idade           = anoAtual - anoNasc;
      let mesAtual        = dataAtual.getMonth() + 1; 
      //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
      if(mesAtual < mesNasc){
          idade--; 
      } else {
          //Se estiver no mes do nascimento, verificar o dia
          if(mesAtual == mesNasc){ 
              if(new Date().getDate() < diaNasc ){ 
                  //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
                  idade--; 
              }
          }
      }
      console.log("calculo idade: ", idade)
      return idade;
  }
}
function isValidCPF(cpf) {
  if (typeof cpf !== "string") return false
  cpf = cpf.replace(/[\s.-]*/igm, '')
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999" 
  ) {
    return false
  }
  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++) 
    soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(9, 10)) ) return false
  soma = 0
  for (var i = 1; i <= 10; i++) 
    soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(10, 11) ) ) return false
  return true
}
$(document).ready(function() {
  let startDate = new Date();
  let endDate = new Date();
  startDate.setDate(startDate.getDate());
  endDate.setDate(endDate.getDate());
  startDate.setFullYear(startDate.getFullYear() - 75);
  endDate.setFullYear(endDate.getFullYear());
  let inicialDate = startDate.toISOString().substr(0, 10).split('-').join('-');
  let finalDate = endDate.toISOString().substr(0, 10).split('-').join('-');
  $("input[type=date]").attr("min",inicialDate).attr("max",finalDate);
  
  $(document).ready(function(){
    if($(".foreign:checked").val() == 0 ){
      $("#birthplace").parent().parent().addClass("displayNone")
    }
    $(".foreign").click(function(){
      if($(this).val() == 0){
        $("#birthplace").parent().parent().addClass("displayNone")
      } else {
        $("#birthplace").parent().parent().removeClass("displayNone")
      }
    })
    if($(".pep_close_relationship:checked").val() == 0 ){
      $("#name_pep_close_relationship, #cpf_pep, #degree_relationship_pep").parent().parent().addClass("displayNone")
    }
    $(".pep_close_relationship").click(function(){
      if($(this).val() == 0){
        $("#name_pep_close_relationship, #cpf_pep, #degree_relationship_pep").parent().parent().addClass("displayNone")
      } else {
        $("#name_pep_close_relationship, #cpf_pep, #degree_relationship_pep").parent().parent().removeClass("displayNone")
      }
    })
    $("input,select").blur(function(){
      if(
        $(this).val() == "" &&
        $(this).attr("name") != "home_address_complement" &&
        $(this).attr("name") != "landline" &&
        $(this).attr("name") != "cellphone"
      ){
        $(this).addClass("is-invalid");
      }
    });
    $("input,select").focus(function(){
      if($(this).val() == ""){
        $(this).removeClass("is-invalid");
      }
    });
    $("input[name=birth]").keyup(function(){
      if($(this).val() !== ""){
        let idade = calculaIdade($(this).val());
        console.log(idade)
        if(idade < 18 || idade > 75){
          $(this).addClass("is-invalid");
          $(this).siblings('.invalid-feedback').html("A idade mínima é de 18 anos e a máxima de 75 anos.");
        } else {
          $(this).removeClass("is-invalid");
          $(this).siblings('.invalid-feedback').html("Você deve informar a data de nacimento");
        }
      }
    });

    $("input[name=cpf]").keyup(function(){
      if($(this).val() !== "" ){
        if($(this).val().length >= 14){
          if(!isValidCPF($(this).val())){
            $(this).addClass("is-invalid");
            $(this).siblings('.invalid-feedback').html("Você deve informar um C.P.F. válido.");
          } else {
            $(this).removeClass("is-invalid");
            $(this).siblings('.invalid-feedback').html("Você deve informar o C.P.F.");
          }
        }
      }
    });

    $("#zipcode").keyup(function(){
      //Nova variável "cep" somente com dígitos.
      var cep = $(this).val().replace(/\D/g, '');
      //Verifica se campo cep possui valor informado.
      if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
          $(".loadding-background").removeClass("displayNone");
          fetch ( `https://viacep.com.br/ws/${cep}/json/` )
          .then(response => {
            if (response.status != 200) {
                throw Error(response.status);
            } else {
                return response.json();
            }
          })
          .then(data => {
            if (data.erro) {
              console.log(data.erro)
              $(".loadding-background").addClass("displayNone")
            } else {
              //console.log(data)
              $("#home_address").val(data.logradouro).removeClass("is-invalid");
              $("#home_address_neighborhood").val(data.bairro).removeClass("is-invalid");
              $("#city").val(data.localidade).removeClass("is-invalid");
              $("#uf").val(data.uf).removeClass("is-invalid");
              $(".loadding-background").addClass("displayNone")
            }
          })
        }
      }
    })

    $("#botao").click(function(){
      var cont = 0;
      $("form input, form select").each(function(){
        if($(this).val() == ""){
          if(
            $(this).attr("name") == "name_pep_close_relationship" ||
            $(this).attr("name") == "cpf_pep"||
            $(this).attr("name") == "degree_relationship_pep"
          ){
            if($(".pep_close_relationship:checked").val() == 0 ){
              $(this).removeClass("is-invalid");
            } else {
              $(this).addClass("is-invalid");
              cont++;
            }
          } else if(
            !$(this).is("#home_address_complement") &&
            !$(this).is("#landline") &&
            !$(this).is("#cellphone")
          ) {
            $(this).addClass("is-invalid");
            cont++;
          }
        }
      });
      if(cont == 0){
        //alert("SUMINIT")
        $("form").submit();
        //mutate();
      } else {
        let el = document.getElementsByClassName('is-invalid');
        if(el.length){
          let elCoordenadas = el[0].scrollIntoView();
        }
      }
    });
  });
  // Adicionar Suplente
  $("#addFamiliar").on("click", function(){
    index = $(".itemFamiliar .row").length;
    $(".itemFamiliar").append(
      $(document.createElement('div')).prop({
        class: 'row'
      })
      .append(
        $(document.createElement('div')).prop({class: 'col-md-6 col-space-b'})
        .append(
          $(document.createElement('div')).prop({class: 'form-group'})
          .append($(document.createElement('label')).prop({class: 'form-label'}).html('NOME'))
          .append($(document.createElement('input')).prop({type: 'text',name: `beneficiary_name[${index}]`,class: 'form-control'}))
          .append($(document.createElement('small')).prop({class: 'invalid-feedback'}).html('Você deve informar o nome'))
        )
      )
      .append(
        $(document.createElement('div')).prop({class: 'col-md-6 col-space-b'})
        .append(
          $(document.createElement('div')).prop({class: 'form-group'})
          .append($(document.createElement('label')).prop({class: 'form-label'}).html('SEXO'))
          .append(
            $(document.createElement('div'))
            .append(
              $(document.createElement('div')).prop({class: 'form-check form-check-inline'})
              .append($(document.createElement('input')).prop({type: 'radio',name: `beneficiary_sex[${index}]`,class: 'form-check-input',value: 'M',checked: true}))
              .append($(document.createElement('label')).prop({class: 'form-check-label'}).html('M'))
            )
            .append(
              $(document.createElement('div')).prop({class: 'form-check form-check-inline'})
            )
          )
          .append(
            $(document.createElement('div'))
            .append(
              $(document.createElement('div')).prop({class: 'form-check form-check-inline'})
              .append($(document.createElement('input')).prop({type: 'radio',name: `beneficiary_sex[${index}]`,class: 'form-check-input',value: 'F',checked: false}))
              .append($(document.createElement('label')).prop({class: 'form-check-label'}).html('F'))
            )
            .append($(document.createElement('div')).prop({class: 'form-check form-check-inline'}))
          )
        )
      )
      .append(
        $(document.createElement('div')).prop({class: 'col-md-6 col-space-b'})
        .append(
          $(document.createElement('div')).prop({class: 'form-group'})
          .append($(document.createElement('label')).prop({class: 'form-label'}).html('DATA DE NACIMENTO'))
          .append($(document.createElement('input')).prop({type: 'date',name: `beneficiary_birth[${index}]`, class: 'form-control', min: inicialDate, max: finalDate}))
          .append($(document.createElement('small')).prop({class: 'invalid-feedback'}).html('Você deve informar a data de nacimento'))
        )
      )
      .append(
        $(document.createElement('div')).prop({class: 'col-md-6 col-space-b'})
        .append(
          $(document.createElement('div')).prop({class: 'form-group'})
          .append($(document.createElement('label')).prop({class: 'form-label'}).html('ESTADO CIVIL'))
          .append(
            $(document.createElement('select')).prop({name: `beneficiary_marital_status[${index}]`,class: 'custom-select d-block w-100'})
            .append($(document.createElement('option')).prop({value: ''}).html('Selecione ESTADO CIVIL'))
            .append($(document.createElement('option')).prop({value: 'solteiro'}).html('Solteiro(a)'))
            .append($(document.createElement('option')).prop({value: 'casado'}).html('Casado(a)'))
            .append($(document.createElement('option')).prop({value: 'divorciado'}).html('Divorciado(a)'))
            .append($(document.createElement('option')).prop({value: 'viuvo'}).html('Viúvo(a)'))
            .append($(document.createElement('option')).prop({value: 'separado'}).html('Separado(a)'))
          )
          .append($(document.createElement('small')).prop({class: 'invalid-feedback'}).html('Você deve selecionar o estado civil'))
        )
      )
      .append(
        $(document.createElement('div')).prop({class: 'col-md-6 col-space-b'})
        .append(
          $(document.createElement('div')).prop({class: 'form-group'})
          .append($(document.createElement('label')).prop({class: 'form-label'}).html('GRAU PARENTESCO'))
          .append(
            $(document.createElement('select')).prop({name: `beneficiary_parentage[${index}]`,class: 'custom-select d-block w-100'})
            .append($(document.createElement('option')).prop({value: ''}).html('Selecione GRAU PARENTESCO'))
            .append($(document.createElement('option')).prop({value: 'conjuge'}).html('Cônjuge'))
            .append($(document.createElement('option')).prop({value: 'filho(a)'}).html('Filho(a)'))
          )
          .append($(document.createElement('small')).prop({class: 'invalid-feedback'}).html('Você deve selecionar o grau de parentesco'))
        )
      )
    )
  })
  $("#removeFamiliar").on("click", function(){
    if($(".itemFamiliar .row").length > 1){
      $(".itemFamiliar .row:last").remove();
    }
  })
});