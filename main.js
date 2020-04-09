 // l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde


$( document ).ready(function() {

  // richiamo la funzione globale per far comparire l'icona microfono e sparire quella di invio
  microfonoOn();

  // richiamo la funzione globale per far comparire l'icona invio e sparire quella di microfono
  tastoInviaOn();

  // creo l'evento alla pressione del tasto invio
  $("#inputRisposta").keypress(function(e) {
    // l'evento si innesca se viene premuto il tasto 13 della tastiera --> invio
    if (e.which == 13) {
      // richiamo la funzione globale per inviare le risposte
      rispostaInviata();
    } //fine ciclo if di controllo tasto premuto
  }); // fine evento keypress

  $(".mic-e-invia").click(function(){
    // richiamo la funzione globale per inviare le risposte
    rispostaInviata();
  });

  // creo l'evento al sollevamento dalla pressione dei tasti per scrivere
  $("#inputCerca").keyup(function(){
    // salvo input utente in campo del filtro stringa1
    var stringaRicerca = $("#inputCerca").val().toUpperCase();
    // seleziono tutti i blocchi di contatto e ciclo tra di loro
    $(".contatto").each(function() {
      //salvo in una var il valore del testo del nome nel contatto (stringa2)
      var stringaNome = $(this).find(".nomeContatto").text().toUpperCase();
      // imposto la condizione per far apparire e scomparire i contatti
      if (stringaNome.includes(stringaRicerca)) {
        $(this).show();
      } else {
        $(this).hide();
      } // fine condizione
    });// fine ciclo each
  }); // fine evento keyup

  // CREO L'EVENTO CHE FA PASSARE L'UTENTE DA UNA CHAT ALL'ALTRA
  $(".contatto").click(function(){
    $(".box-chat").removeClass("active");
    var indiceContatto = $(this).index();
    $(".box-chat").eq(indiceContatto).addClass("active");
  }); // fine evento click

  // CREO L'EVENTO CHE FA APPARIRE IL MENU OPZIONI DALLE FRECCINE NEI MESSAGGI
  $(".freccetta-info").click(function(){
    $(this).siblings(".box-opzioni-messaggio").toggle();
  }); // fine evento click

  $(".messaggio #cancella-messaggio").click(function(){
    $(this).parents(".messaggio").hide();
  }); //fine evento click

}); // fine document.ready







// -----------------------------FUNZIONI GLOBALI ---------------------------------------

// funzione per far comparire il tasto microfono e far sparire il tasto invia
function microfonoOn(){
  $("#inputRisposta").focus(function(){
    $(".fa-microphone").css("display","none");
    $("#footer .fa-telegram-plane").css("display","block");
  });
};



// funzione per far comparire il tasto invia e far sparire il tasto microfono
function tastoInviaOn(){
  $("#inputRisposta").blur(function(){
    $(".fa-microphone").css("display","block");
    $("#footer .fa-telegram-plane").css("display","none");
  });
};



// funzione per l'invio del messaggio da input utente
function rispostaInviata(){
  // prendo il valore di input della tastiera
  var testoRisposta = $("#inputRisposta").val();
  // ritrasformo la variabile nel div da inserire dopo gli altri messaggi
  if (testoRisposta != ""){
    // prendo l'orario della macchina tramite funzione globale
    time();
    // creo la variabile che contiene il blocco html da stampare
    var rispostaInviata =$(
    "<div class='messaggio inviato'>" +
      "<span class=\"testo-messaggio\"></span>"+
      "<span class=\"freccetta-info\"><i class=\"fas fa-chevron-down\"></i></span>"+
      "<span class=\"orario-messaggio\"></span>" +
    "</div>");
    // vado a modificare il contenuto del nuovo blocco html creato agendo sulle classi dei figli
    rispostaInviata.children(".testo-messaggio").text(testoRisposta);
    rispostaInviata.children(".orario-messaggio").text(time);
    // selezionando il contenitore della chat, "appendo" ad esso il nuovo div
    $(".box-chat.active").append(rispostaInviata);
    // a funzione terminata svuoto il box input
    $("#inputRisposta").val("");

    // impostando il timeout, rischiamo la funzione globale che mi stamnpa la risposta del pc dopo 1 secondo
    setTimeout(rispostaRicevuta, 1000);
  }
}



// funzione per il ricevimento della risposta
function rispostaRicevuta(){
  // creo la variabile che contiene il blocco html da stampare
  var messaggioRicevuto =$(
    "<div class='messaggio ricevuto'>" +
    "<span class=\"testo-messaggio\"></span>"+
    "<span class=\"freccetta-info\"><i class=\"fas fa-chevron-down\"></i></span>"+
    "<span class=\"orario-messaggio\"></span>" +
  "</div>");
  // richiamo la funzione globale per aquisire il tempo macchina
  time();
  // vado a modificare il contenuto del nuovo blocco html creato agendo sulle classi dei figli
  messaggioRicevuto.children(".testo-messaggio").text("ok");
  messaggioRicevuto.children(".orario-messaggio").text(time);
  $(".box-chat.active").append(messaggioRicevuto);
}



// funzione per l'ottenimento del tempo attuale
function time(){
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();
  return time;
}
